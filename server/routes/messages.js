import express from "express";
import Message from "../models/Message.js";
import { requireAuth, requireAdmin } from "../middleware/firebaseAuth.js";

const router = express.Router();

// Public: send a contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }
    const doc = await Message.create({ name, email, phone, message });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: list all messages
router.get("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const items = await Message.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: mark as read / unread
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const item = await Message.findByIdAndUpdate(
      req.params.id,
      { read: req.body.read },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: delete a message
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const item = await Message.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
