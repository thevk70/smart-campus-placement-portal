import { create } from "zustand";
import api from "../services/api";

export const useProfileStore = create((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/users/me");
      set({ profile: res.data.data, loading: false });
    } catch (err) {
      set({ loading: false, error: "Failed to load profile" });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ loading: true });
      const res = await api.patch("/users/me", data);
      set({ profile: res.data.data, loading: false });
      return true;
    } catch (err) {
      set({ loading: false, error: "Failed to update profile" });
      return false;
    }
  }
}));
