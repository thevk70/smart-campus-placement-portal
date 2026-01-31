import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import { sendMail } from "../../services/mail.service.js";
import { otpEmailTemplate } from "../../utils/OtpEmailTemplate.js";

export const loginUser = async ({ email, password }) => {
  // 1. Check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }
  if (user.role === "student") {
    if (!user.isVerified) {
      throw new ApiError(403, "Please verify your email before login");
    }
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // 3. Generate JWT
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  // 4. Return safe data
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const registerUser = async ({ name, email, password, role },res) => {
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

  res.status(201).json({
    message: "OTP sent to email",
    userId: user._id
  });
  
    sendMail({
      to: email,
      subject: "Verify your email - Smart Campus",
      html: otpEmailTemplate({name,otp})
    });

    return user;
};