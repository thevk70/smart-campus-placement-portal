import express from "express";
import {
  applyForJob,
  getMyApplications,
  getApplicationsByJob,
  updateApplicationStatus
} from "./application.controller.js";
import { protect, adminOnly } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Student applies for a job
router.post("/:jobId", protect, applyForJob);

// Student views own applications
router.get("/me", protect, getMyApplications);

// Admin views applicants for a job
router.get("/job/:jobId", protect, adminOnly, getApplicationsByJob);

// Admin updates application status
router.patch("/:id", protect, adminOnly, updateApplicationStatus);

export default router;
