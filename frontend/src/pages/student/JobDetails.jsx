import { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";

export default function JobList({ jobs }) {
  const [selectedJobId, setSelectedJobId] = useState(null);

  return (
    <>
      {/* JOB LIST */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16
        }}
      >
        {jobs.map((job) => (
          <div
            key={job._id}
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>
              {job.title}
            </h3>

            <p style={{ color: "#555", marginTop: 4 }}>
              {job.company}
            </p>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                onClick={() => setSelectedJobId(job._id)}
                style={{
                  padding: "6px 12px",
                  background: "#4f46e5",
                  color: "#fff",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer"
                }}
              >
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedJobId && (
        <JobDetailsModal
          jobId={selectedJobId}
          onClose={() => setSelectedJobId(null)}
        />
      )}
    </>
  );
}
