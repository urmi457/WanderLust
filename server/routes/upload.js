import express from "express";
import multer from "multer";
import { requireAuth, requireAdmin } from "../middleware/firebaseAuth.js";

const router = express.Router();

// Files are held in memory only long enough to forward them to imgbb —
// nothing is written to disk, and only the resulting URL is ever stored
// in MongoDB.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

// Admin: upload an image. Field name must be "image".
// Forwards the file to imgbb (https://api.imgbb.com/) and returns the
// hosted URL, which the client then saves as a normal string field
// (e.g. package.image) on whichever document it's editing.
router.post("/", requireAuth, requireAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided (field name must be 'image')" });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "IMGBB_API_KEY is not set on the server" });
    }

    const form = new FormData();
    form.append(
      "image",
      new Blob([req.file.buffer], { type: req.file.mimetype }),
      req.file.originalname
    );

    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: form,
    });
    const data = await imgbbRes.json();

    if (!imgbbRes.ok || !data.success) {
      return res.status(502).json({
        message: data?.error?.message || "Image upload to imgbb failed",
      });
    }

    res.status(201).json({
      url: data.data.url,
      displayUrl: data.data.display_url,
      thumbUrl: data.data.thumb?.url || data.data.url,
      deleteUrl: data.data.delete_url,
    });
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({ message: err.message || "Image upload failed" });
  }
});

// Multer errors (e.g. file too large, wrong type) land here instead of
// the generic error handler, so we can give a clearer message.
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

export default router;
