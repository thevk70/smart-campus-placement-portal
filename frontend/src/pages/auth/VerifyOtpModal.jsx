import { Modal, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { verifyOTPApi } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function VerifyOtpModal({ isOpen, userId, onClose }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(600);

  const inputsRef = useRef([]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!isOpen) return;

    setTimer(600);
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  /* ---------------- OTP INPUT ---------------- */
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* ---------------- VERIFY ---------------- */
  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.warning("Please enter 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOTPApi({
        userId,
        otp: otpValue,
      });

      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      footer={null}
      closable={!loading}               // 🔒 disable close while verifying
      maskClosable={!loading}
      onCancel={onClose}
      centered
    >
      <h2 className="text-xl font-semibold text-center mb-2">
        Verify OTP
      </h2>
      <p className="text-center text-gray-500 mb-4">
        Enter the 6-digit OTP sent to your email
      </p>

      {/* 🔢 OTP BOXES */}
      <div className="flex justify-center gap-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-xl border rounded-md focus:outline-blue-500"
          />
        ))}
      </div>

      {/* ⏱️ RESEND
      <div className="text-center mb-4">
        {timer > 0 ? (
          <span className="text-gray-500">
            Resend OTP in <b>{timer}s</b>
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="text-blue-600 font-medium"
          >
            Resend OTP
          </button>
        )}
      </div> */}

      {/* ACTION */}
      <Button
        type="primary"
        block
        loading={loading}
        onClick={handleVerify}
      >
        Verify OTP
      </Button>
    </Modal>
  );
}
