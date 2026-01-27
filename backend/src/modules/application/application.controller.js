import {
  applyForJobService,
  getMyApplicationsService,
  getApplicationsByJobService,
  updateApplicationStatusService
} from "./application.service.js";

export const applyForJob = async (req, res, next) => {
  try {
    const application = await applyForJobService(
      req.params.jobId,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Applied for job successfully",
      data: application
    });
  } catch (err) {
    next(err);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    
    const applications = await getMyApplicationsService(req.user._id);

    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (err) {
    next(err);
  }
};

export const getApplicationsByJob = async (req, res, next) => {
  try {
    const applications = await getApplicationsByJobService(req.params.jobId);

    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (err) {
    next(err);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const application = await updateApplicationStatusService(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Application status updated",
      data: application
    });
  } catch (err) {
    next(err);
  }
};
