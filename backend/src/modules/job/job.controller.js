import { createJobService, getAllJobsService, getJobByIdService } from "./job.service.js";

export const createJob = async (req, res, next) => {
  try {
    const job = await createJobService(req.body, req.user);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job
    });
  } catch (err) {
    next(err);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await getAllJobsService();

    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await getJobByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};

