import express from "express";
import { createJob, getAllJobs, getJobById } from "./job.controller.js";
import { protect, adminOnly } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Admin → create job
router.post("/", protect, adminOnly, createJob);

// Public / Student → list jobs
router.get("/", protect, getAllJobs);

router.get("/:id", protect, getJobById);

export default router;
