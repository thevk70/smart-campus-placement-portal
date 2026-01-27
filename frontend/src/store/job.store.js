import { create } from "zustand";
import api from "../services/api";

export const useJobStore = create((set) => ({
  jobs: [],
  job: null,
  loading: false,
  error: null,

  // 🔹 Get all jobs
  fetchJobs: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/jobs");
      set({ jobs: res.data.data, loading: false });
    } catch {
      set({ loading: false, error: "Failed to load jobs" });
    }
  },

  // 🔹 Get single job (More Info / Modal)
  fetchJob: async (jobId) => {
    try {
      set({ loading: true, error: null });
      const res = await api.get(`/jobs/${jobId}`);
      set({ job: res.data.data, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to load job"
      });
    }
  },

  // 🔹 Clear selected job (on modal close)
  clearJob: () => set({ job: null }),

  // 🔹 Create job (Admin)
  createJob: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.post("/jobs", data);
      set({ loading: false });
      return true;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to create job"
      });
      return false;
    }
  }
}));
