import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    package: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    packageTitle: { type: String, required: true },
    userUid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    date: { type: Date, required: true },
    guests: { type: Number, required: true, default: 1 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
