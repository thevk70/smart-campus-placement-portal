import { create } from "zustand";
import api from "../services/api";

export const useApplicationStore = create((set) => ({
  myApplications: [],

  fetchMyApplications: async (user) => {
    const res = await api.get("/applications/me",user);
    set({ myApplications: res.data.data });
  },

  applyForJob: async (jobId,user) => {
    await api.post(`/applications/${jobId}`,user);
  }
}));
