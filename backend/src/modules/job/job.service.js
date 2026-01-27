import Job from "../../models/job.model.js";
import User from "../../models/user.model.js";
import { sendMail } from "../../services/mail.service.js";

export const createJobService = async (data, user) => {
  
  const job = await Job.create({
    ...data,
    createdBy: user._id
  });

  const students = await User.find({ role: "student" }).select("email");
  
  for (const student of students) {
    await sendMail({
      to: student.email,
      subject: "New Job Vacancy",
      html: `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background:#2563eb;color:#ffffff;padding:20px;text-align:center;">
        <h2 style="margin:0;">🚀 New Job Opportunity</h2>
      </div>

      <!-- Body -->
      <div style="padding:24px;color:#111827;">
        <p style="font-size:16px;">Hello 👋</p>

        <p style="font-size:15px;line-height:1.6;">
          A new job has just been posted on the
          <b>Smart Campus Placement Portal</b>.
        </p>

        <div style="background:#f1f5f9;padding:16px;border-radius:8px;margin:20px 0;">
          <p style="margin:6px 0;"><b>Role:</b> ${job.title}</p>
          <p style="margin:6px 0;"><b>Company:</b> ${job.company}</p>
          ${
            job.lastDate
              ? `<p style="margin:6px 0;"><b>Last Date:</b> ${new Date(
                  job.lastDate
                ).toDateString()}</p>`
              : ""
          }
        </div>

        <p style="font-size:15px;">
          Don’t miss this opportunity. Apply as soon as possible!
        </p>

        <!-- Button -->
        <div style="text-align:center;margin:30px 0;">
          <a href="http://localhost:3000/jobs"
             style="background:#2563eb;color:#ffffff;text-decoration:none;
                    padding:12px 24px;border-radius:6px;font-size:15px;
                    display:inline-block;">
            Apply Now
          </a>
        </div>

        <p style="font-size:14px;color:#6b7280;">
          Best wishes,<br/>
          <b>Placement Cell</b><br/>
          Smart Campus Placement Portal
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb;padding:12px;text-align:center;font-size:12px;color:#9ca3af;">
        © ${new Date().getFullYear()} Smart Campus Placement Portal
      </div>
    </div>
  </body>
</html>`

    });
  }

  return job;
};

export const getAllJobsService = async () => {
  const jobs = await Job.find()
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });

  return jobs;
};

export const getJobByIdService = async (jobId) => {
  const job = await Job.findById(jobId).populate(
    "createdBy",
    "name email role"
  );

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
};
