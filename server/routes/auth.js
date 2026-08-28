import express from "express";
import { requireAuth } from "../middleware/firebaseAuth.js";

const router = express.Router();

// Called by the client right after Firebase login/signup. Creates or
// refreshes the matching Mongo user record (handled inside requireAuth)
// and returns the profile + role back to the client.
router.post("/sync", requireAuth, async (req, res) => {
  res.json({ user: req.dbUser });
});

// Returns the current logged-in user's profile + role.
router.get("/me", requireAuth, async (req, res) => {
  res.json({ user: req.dbUser });
});

export default router;
