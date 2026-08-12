import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    days: { type: Number, required: true },
    image: { type: String, required: true },
    short: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Auto-generate a URL-friendly slug from the title when one isn't provided.
packageSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug =
      this.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Math.random().toString(36).slice(2, 7);
  }
  next();
});

export default mongoose.model("Package", packageSchema);
