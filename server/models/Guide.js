import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideSchema);
