import { create } from "zustand";
import { registerApi } from "../services/auth.service";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  loginSuccess: (data,navigate) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    set({
      token: data.token,
      user: data.user,
      loading: false,
      error: null,
    });
    
    data.user.role === "admin" ? navigate("/admin") : navigate("/jobs");
  },

  loginStart: () => set({ loading: true, error: null }),

  loginError: (message) => set({ loading: false, error: message }),

  register: async (data,navigate) => {
    set({ loading: true });
    try {
      const res = await registerApi(data);
      toast.success("OTP sent to your email");
      navigate("/verify-otp",{
        state: { userId: res.data.userId }
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, token: null });
  },
}));
