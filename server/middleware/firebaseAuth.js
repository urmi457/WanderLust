import jwt from "jsonwebtoken";
import User from "../models/User.js";

const CERT_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

let certCache = { certs: null, expiresAt: 0 };

// Fetches (and caches) Google's public certs used to sign Firebase ID tokens.
async function getCerts() {
  if (certCache.certs && Date.now() < certCache.expiresAt) {
    return certCache.certs;
  }
  const res = await fetch(CERT_URL);
  if (!res.ok) throw new Error("Failed to fetch Firebase certs");
  const certs = await res.json();
  // Google tells us how long these certs are valid via cache-control header;
  // default to 1 hour if it's missing.
  const cacheControl = res.headers.get("cache-control") || "";
  const match = cacheControl.match(/max-age=(\d+)/);
  const maxAge = match ? parseInt(match[1], 10) : 3600;
  certCache = { certs, expiresAt: Date.now() + maxAge * 1000 };
  return certs;
}

// Verifies a Firebase Auth ID token without needing a service-account key.
// See: https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_a_third-party_jwt_library
export async function verifyFirebaseToken(idToken) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const decodedHeader = jwt.decode(idToken, { complete: true });
  if (!decodedHeader) throw new Error("Invalid token");

  const certs = await getCerts();
  const cert = certs[decodedHeader.header.kid];
  if (!cert) throw new Error("Unknown token key id");

  const payload = jwt.verify(idToken, cert, {
    algorithms: ["RS256"],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  });

  if (payload.sub === undefined || payload.sub === "") {
    throw new Error("Invalid token subject");
  }

  return payload; // contains uid (sub), email, name, picture, etc.
}

// Requires a valid Firebase ID token. Attaches req.user = { uid, email, ... }
// and req.dbUser = the matching Mongo user document (created on first sight).
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const payload = await verifyFirebaseToken(token);
    req.user = {
      uid: payload.sub,
      email: payload.email,
      name: payload.name || payload.email,
      picture: payload.picture,
    };

    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const isAdminEmail = adminEmails.includes((payload.email || "").toLowerCase());

    let dbUser = await User.findOne({ uid: payload.sub });
    if (!dbUser) {
      dbUser = await User.create({
        uid: payload.sub,
        email: payload.email,
        name: payload.name || payload.email,
        picture: payload.picture,
        role: isAdminEmail ? "admin" : "user",
      });
    } else if (isAdminEmail && dbUser.role !== "admin") {
      dbUser.role = "admin";
      await dbUser.save();
    }

    req.dbUser = dbUser;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Like requireAuth, but never rejects the request; just leaves req.user unset.
export async function optionalAuth(req, res, next) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return next();
  return requireAuth(req, res, next);
}

export function requireAdmin(req, res, next) {
  if (!req.dbUser || req.dbUser.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}
