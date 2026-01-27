import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import { loginApi } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { loginStart, loginSuccess, loginError, loading, error } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginStart();
      const res = await loginApi(form);
      loginSuccess(res.data.data,navigate);
    } catch (err) {
      loginError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f6f8"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 360,
          padding: 24,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          🔐 Login
        </h2>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: 6,
              padding: "8px 10px"
            }}
          >
            <Mail size={18} style={{ marginRight: 8, color: "#555" }} />
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
              style={{
                border: "none",
                outline: "none",
                flex: 1
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: 20 }}>
          <label>Password</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: 6,
              padding: "8px 10px"
            }}
          >
            <Lock size={18} style={{ marginRight: 8, color: "#555" }} />
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
              style={{
                border: "none",
                outline: "none",
                flex: 1
              }}
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 6,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
          }}
        >
          <LogIn size={18} />
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Error */}
        {error && (
          <p style={{ color: "red", marginTop: 12, textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
