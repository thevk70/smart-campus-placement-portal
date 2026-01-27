import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export default function JobCard({ job, applied, onApply }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <h4 style={{ marginBottom: 4 }}>
        <Briefcase size={16} /> {job.title}
      </h4>

      <p style={{ color: "#555" }}>{job.company}</p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          to={`/jobs/${job._id}`}
          className="text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          More Info
        </Link>

        <button
          disabled={applied}
          onClick={() => onApply(job._id)}
          style={{
            background: applied ? "#9ca3af" : "#2563eb",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: applied ? "not-allowed" : "pointer",
          }}
        >
          {applied ? "Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
}
