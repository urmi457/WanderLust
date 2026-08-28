import mongoose from "mongoose";

// Team members shown on the About page (chairman, CEO, etc.) — separate
// from tour Guides, which are shown on Home/About in their own section.
const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
