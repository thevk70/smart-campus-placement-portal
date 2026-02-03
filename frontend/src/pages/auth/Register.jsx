import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import VerifyOtpModal from "../auth/VerifyOtpModal";

export default function Register() {
  const { register, loading } = useAuthStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [showOtp, setShowOtp] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await register(form);
    console.log(result);

    if (result?.success) {
      setUserId(result.userId);
      setShowOtp(true); // 🔥 open OTP popup
    }
  };

  return (
    <>
      {/* 🌈 Background */}
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center px-6">

        {/* MAIN WRAPPER */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* LEFT PANEL (DESKTOP ONLY) */}
          <div className="hidden lg:flex flex-col justify-center relative p-14 bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_40%)]"></div>

            <div className="relative z-10">
              <h1 className="text-4xl font-bold leading-tight mb-6">
                Create your <br /> Smart Campus Account
              </h1>

              <p className="text-lg text-blue-100 mb-8 max-w-md">
                Join the placement portal to manage opportunities, profiles,
                and career growth in one place.
              </p>

              <ul className="space-y-4 text-blue-100 text-sm">
                <li>✔ OTP-based secure registration</li>
                <li>✔ Verified student profiles</li>
                <li>✔ Placement & recruiter access</li>
                <li>✔ Modern campus platform</li>
              </ul>
            </div>
          </div>

          {/* RIGHT PANEL (FORM) */}
          <div className="flex items-center justify-center p-8 sm:p-12 bg-white">
            <div className="w-full max-w-sm animate-slideInUpFast">

              {/* Header */}
              <div className="text-center mb-8">
                <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-indigo-600 text-white shadow-md mb-4">
                  <User />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Create Account
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Register to get started
                </p>
              </div>

              {/* FORM (UNCHANGED LOGIC) */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  icon={<User size={18} />}
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                />

                <Input
                  icon={<Mail size={18} />}
                  name="email"
                  type="email"
                  placeholder="Email address"
                  onChange={handleChange}
                />

                <Input
                  icon={<Lock size={18} />}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium
                             hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? "Sending OTP..." : "Register"}
                </button>
              </form>

              {/* Footer */}
              <p className="text-sm text-center mt-6 text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 OTP POPUP (UNCHANGED) */}
      <VerifyOtpModal
        isOpen={showOtp}
        onClose={() => setShowOtp(false)}
        userId={userId}
      />
    </>
  );
}

/* ---------- INPUT (UPGRADED UI, SAME PROPS) ---------- */
function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
        {icon}
      </span>
      <input
        {...props}
        required
        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   caret-indigo-600"
      />
    </div>
  );
}
