import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import { loginApi } from "../../services/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const { loginStart, loginSuccess, loginError, loading, error } =
    useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginStart();
      const res = await loginApi(form);
      loginSuccess(res.data.data, navigate);
    } catch (err) {
      loginError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center px-6">

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT PANEL (DESIGN / BRANDING) */}
        <div className="hidden lg:flex flex-col justify-center relative p-14 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">

          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_40%)]"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold leading-tight mb-6">
              Smart Campus <br /> Placement Portal
            </h1>

            <p className="text-lg text-blue-100 mb-8 max-w-md">
              A unified platform for students, placements, and career growth.
            </p>

            <ul className="space-y-4 text-blue-100 text-sm">
              <li>✔ Secure & verified access</li>
              <li>✔ Student & recruiter management</li>
              <li>✔ Placement analytics & tracking</li>
              <li>✔ Modern, scalable system</li>
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL (LOGIN FORM) */}
        <div className="flex items-center justify-center p-8 sm:p-12 bg-white">
          <div className="w-full max-w-sm animate-slideInUpFast">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md mb-4">
                <LogIn />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Sign in to your account
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Welcome back! Please enter your details
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                icon={<Mail size={18} />}
                name="email"
                type="email"
                placeholder="Email address"
                onChange={handleChange}
              />

              <div className="relative">
                <Input
                  icon={<Lock size={18} />}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium
                           hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {error && (
              <p className="text-red-500 text-sm text-center mt-4">
                {error}
              </p>
            )}

            <p className="text-sm text-center mt-6 text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 font-medium">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- INPUT ---------- */
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
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   caret-blue-600"
      />
    </div>
  );
}
