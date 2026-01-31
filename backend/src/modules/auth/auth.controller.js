import { registerUser } from "./auth.service.js";
import { loginUser } from "./auth.service.js";
import User from "../../models/user.model.js";

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {

    const user  = registerUser(req.body,res);
    
  } catch (err) {
    next(err);
  }
};


export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (
    user.otp !== otp ||
    user.otpExpiry < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.status(200).json({ message: "Email verified successfully" });
};
