import express from "express";
import Package from "../models/Package.js";
import { requireAuth, requireAdmin } from "../middleware/firebaseAuth.js";

const router = express.Router();

// Public: list all packages
router.get("/", async (req, res) => {
  try {
    const items = await Package.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public: get one package by its Mongo id OR its slug (e.g. "sajek-valley")
router.get("/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let item = null;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      item = await Package.findById(idOrSlug);
    }
    if (!item) {
      item = await Package.findOne({ slug: idOrSlug });
    }
    if (!item) return res.status(404).json({ message: "Package not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: create
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const item = await Package.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: update
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const item = await Package.findByIdAndUpdate(req.params.id, req.body, {
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
    const item = await Package.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
