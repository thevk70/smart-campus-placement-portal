import Application from "../../models/application.model.js";
import ApiError from "../../utils/ApiError.js";
import { sendMail } from "../../services/mail.service.js";
import fs from "fs";
import path from "path";

export const applyForJobService = async (jobId, studentId) => {
  try {
    const application = await Application.create({
      job: jobId,
      student: studentId
    });
    return application;
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(400, "You have already applied for this job");
    }
    throw err;
  }
};

export const getMyApplicationsService = async (student) => {
  
  return Application.find({ student: student })
    .populate("job", "title company")
    .sort({ createdAt: -1 });
};

export const getApplicationsByJobService = async (jobId) => {
  return Application.find({ job: jobId })
    .populate("student", "name email")
    .populate("job", "title company")
    .sort({ createdAt: -1 });
};

export const updateApplicationStatusService = async (id, status) => {
  const application = await Application.findById(id)
    .populate("student", "email name")
    .populate("job", "title company");

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  application.status = status;
  await application.save();

  // Load template
  const templatePath = path.resolve(
    "src/templates",
    status === "shortlisted" ? "shortlisted.html" : "rejected.html"
  );

  let html = fs.readFileSync(templatePath, "utf-8");
  html = html
    .replace("{{name}}", application.student.name)
    .replace("{{job}}", application.job.title)
    .replace("{{company}}", application.job.company);

  // Send email
  await sendMail({
    to: application.student.email,
    subject: `Application ${status}`,
    html
  });

  return application;
};