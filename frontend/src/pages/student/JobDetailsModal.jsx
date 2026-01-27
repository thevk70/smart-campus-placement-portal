import { useEffect } from "react";
import { X } from "lucide-react";
import { useJobStore } from "../../store/job.store";

export default function JobDetailsModal({ jobId, onClose }) {
  const { job, fetchJob, clearJob, loading } = useJobStore();

 useEffect(() => {
  fetchJob(jobId);
  return () => clearJob(); // 👈 CLEANUP
}, [jobId]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "90%",
          maxWidth: 600,
          borderRadius: 12,
          padding: 24,
          position: "relative"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            border: "none",
            background: "transparent",
            cursor: "pointer"
          }}
        >
          <X />
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : job ? (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 600 }}>
              {job.title}
            </h2>
            <p style={{ color: "#555" }}>{job.company}</p>

            <p style={{ marginTop: 16 }}>{job.description}</p>

            <h4 style={{ marginTop: 20 }}>Skills Required</h4>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {job.skillsRequired?.map((s, i) => (
                <span
                  key={i}
                  style={{
                    background: "#eef2ff",
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p>Job not found</p>
        )}
      </div>
    </div>
  );
}
