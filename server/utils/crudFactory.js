import express from "express";
import { requireAuth, requireAdmin } from "../middleware/firebaseAuth.js";

// Builds a standard "list / read / create / update / delete" router for a
// simple Mongoose model. Reads are public, writes require an admin.
export default function crudFactory(Model) {
  const router = express.Router();

  // Public: list all
  router.get("/", async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Public: get one
  router.get("/:id", async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (err) {
      res.status(400).json({ message: "Invalid id" });
    }
  });

  // Admin: create
  router.post("/", requireAuth, requireAdmin, async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Admin: update
  router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Admin: delete
  router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted", id: req.params.id });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  return router;
}
