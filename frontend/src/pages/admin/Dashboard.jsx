import { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { useAdminStore } from "../../store/admin.store";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";

export default function Dashboard() {
  const { jobs = [], fetchJobs, loading } = useAdminStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader text="Loading jobs..." />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <h2 style={{ marginBottom: 20 }}>Admin Dashboard</h2>

        {jobs.length === 0 ? (
          <p>No jobs posted yet</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20
            }}
          >
            {jobs.map((job) => (
              <div
                key={job._id}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 18,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                {/* ---------- HEADER ---------- */}
                <div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 4
                    }}
                  >
                    {job.title}
                  </h3>

                  <p style={{ color: "#6b7280", fontSize: 14 }}>
                    {job.company}
                  </p>

                  {job.lastDate && (
                    <p
                      style={{
                        marginTop: 6,
                        fontSize: 13,
                        color: "#dc2626",
                        fontWeight: 500
                      }}
                    >
                      Last Date:{" "}
                      {new Date(job.lastDate).toLocaleDateString()}
                    </p>
                  )}

                  {/* ---------- SKILLS ---------- */}
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                      marginTop: 10
                    }}
                  >
                    {job.skillsRequired?.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: 12,
                          background: "#eef2ff",
                          color: "#4338ca",
                          padding: "4px 8px",
                          borderRadius: 20
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skillsRequired?.length > 4 && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#6b7280"
                        }}
                      >
                        +{job.skillsRequired.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* ---------- META ---------- */}
                  <p
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      color: "#9ca3af"
                    }}
                  >
                    Posted on{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* ---------- ACTION ---------- */}
                <button
                  onClick={() =>
                    navigate(`/admin/jobs/${job._id}`)
                  }
                  style={{
                    marginTop: 16,
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding: "10px",
                    borderRadius: 10,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  View Applicants
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
