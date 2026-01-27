import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { register,loading } = useAuthStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(loading);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Called");
    register(form,navigate)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input icon={<User size={18} />} name="name" placeholder="Full Name" onChange={handleChange} />
          <Input icon={<Mail size={18} />} name="email" type="email" placeholder="Email" onChange={handleChange} />
          <Input icon={<Lock size={18} />} name="password" type="password" placeholder="Password" onChange={handleChange} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
           {loading ? "Sending OTP..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ---------- Input ---------- */
function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-2.5 text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        required
        className="w-full pl-10 pr-3 py-2 border rounded-md"
      />
    </div>
  );
}
