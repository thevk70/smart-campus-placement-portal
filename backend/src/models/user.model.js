import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // VERY IMPORTANT
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    isVerified: { type: Boolean, default: false },

    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true },
);


export default mongoose.model("User", userSchema);
