import express from "express";
import Booking from "../models/Booking.js";
import Package from "../models/Package.js";
import { requireAuth, requireAdmin } from "../middleware/firebaseAuth.js";

const router = express.Router();

// Logged-in user: create a booking
router.post("/", requireAuth, async (req, res) => {
  try {
    const { packageId, name, email, phone, date, guests, notes } = req.body;

    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    const booking = await Booking.create({
      package: pkg._id,
      packageTitle: pkg.title,
      userUid: req.user.uid,
      name: name || req.dbUser.name,
      email: email || req.dbUser.email,
      phone,
      date,
      guests: guests || 1,
      notes,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Logged-in user: view their own bookings
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userUid: req.user.uid })
      .populate("package", "title image location price")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logged-in user: cancel their own booking
router.delete("/mine/:id", requireAuth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userUid: req.user.uid });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.status = "cancelled";
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: view all bookings
router.get("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("package", "title image location price")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update a booking's status
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: delete a booking
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
