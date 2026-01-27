import { create } from "zustand";
import api from "../services/api";

export const useAdminStore = create((set) => ({
  jobs: [],
  applications: [],
  loading: false,
  error: null,

  fetchJobs: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/jobs");
      set({ jobs: res.data.data, loading: false });
    } catch (e) {
      set({ error: "Failed to load jobs", loading: false });
    }
  },

  fetchApplicationsByJob: async (jobId) => {
    try {
      set({ loading: true });
      const res = await api.get(`/applications/job/${jobId}`);
      set({ applications: res.data.data, loading: false });
    } catch (e) {
      set({ error: "Failed to load applications", loading: false });
    }
  },

  updateStatus: async (applicationId, status) => {
    await api.patch(`/applications/${applicationId}`, { status });
  }
}));
