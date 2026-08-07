import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import packageRoutes from "./routes/packages.js";
import bookingRoutes from "./routes/bookings.js";
import blogRoutes from "./routes/blogs.js";
import guideRoutes from "./routes/guides.js";
import serviceRoutes from "./routes/services.js";
import testimonialRoutes from "./routes/testimonials.js";
import messageRoutes from "./routes/messages.js";
import authRoutes from "./routes/auth.js";
import teamRoutes from "./routes/team.js";
import settingsRoutes from "./routes/settings.js";
import uploadRoutes from "./routes/upload.js";

// Models are imported here purely so we can list their collection
// (table) names on startup — see logCollections() below.
import User from "./models/User.js";
import Package from "./models/Package.js";
import Booking from "./models/Booking.js";
import Blog from "./models/Blog.js";
import Guide from "./models/Guide.js";
import Service from "./models/Service.js";
import Testimonial from "./models/Testimonial.js";
import Message from "./models/Message.js";
import Team from "./models/Team.js";
import SiteSettings from "./models/SiteSettings.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);

// Fallback 404 for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;

// The database name comes from the path segment in MONGO_URI
// (".../cluster0.onxzedt.mongodb.net/wanderlust?...") — falls back to
// MONGO_DB_NAME from .env, then "wanderlust" if neither is set.
const models = {
  User,
  Package,
  Booking,
  Blog,
  Guide,
  Service,
  Testimonial,
  Message,
  Team,
  SiteSettings,
};

function logCollections() {
  const dbName = mongoose.connection.name;
  console.log(`\n📂 Database: "${dbName}"`);
  console.log("📋 Collections (tables):");
  Object.entries(models).forEach(([modelName, Model]) => {
    console.log(`   • ${Model.collection.collectionName}  (Mongoose model: ${modelName})`);
  });
  console.log("");
}

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME || undefined, // only used if MONGO_URI has no /dbname path
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    logCollections();
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    if (
      err.message.includes("whitelist") ||
      err.message.includes("Could not connect to any servers")
    ) {
      console.error(
        "\n👉 This almost always means your current IP address isn't allowed to reach the Atlas cluster.\n" +
          "   Fix: Atlas dashboard → Network Access → Add IP Address → 'Add Current IP Address'\n" +
          "   (or 'Allow Access From Anywhere' while developing locally), wait until it shows Active, then restart.\n" +
          "   Docs: https://www.mongodb.com/docs/atlas/security-whitelist/\n"
      );
    }
    process.exit(1);
  });
