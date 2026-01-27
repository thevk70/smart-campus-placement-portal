import { registerUser } from "./auth.service.js";
import { loginUser } from "./auth.service.js";
import User from "../../models/user.model.js";
import { sendMail } from "../../services/mail.service.js";
import { otpEmailTemplate } from "../../utils/OtpEmailTemplate.js";
import bcrypt from "bcryptjs";

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

// export const register = async (req, res, next) => {
//   try {
//     const user = await registerUser(req.body);

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    otp,
    otpExpiry: Date.now() + 10 * 60 * 1000 // 10 min
  });

  await sendMail({
    to: email,
    subject: "Verify your email - Smart Campus",
    html: otpEmailTemplate({name,otp})
  });

  res.status(201).json({
    message: "OTP sent to email",
    userId: user._id
  });
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

  res.json({ message: "Email verified successfully" });
};
