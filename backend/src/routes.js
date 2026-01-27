import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import jobRoutes from "./modules/job/job.routes.js";
import applicationRoutes from "./modules/application/application.routes.js";
import userRoutes from "./modules/user/user.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/jobs",jobRoutes);
router.use("/applications", applicationRoutes);
router.use("/users", userRoutes);

export default router;
