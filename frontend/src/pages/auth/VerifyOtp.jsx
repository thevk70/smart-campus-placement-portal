import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOTPApi } from "../../services/auth.service";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      toast.warning("Please enter a valid 6-digit OTP");
      return;
    }
    try {
      const res = await verifyOTPApi({
        userId: state.userId,
        otp: otp.toString(),
      });

      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow w-96">
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6 digit OTP"
          className="border w-full p-2 mb-4"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
