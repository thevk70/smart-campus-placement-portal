import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import StatusBadge from "../../components/common/StatusBadge";
import { useAdminStore } from "../../store/admin.store";
import Loader from "../../components/common/Loader";

export default function Applications() {
  const { jobId } = useParams();
  const {
    applications = [],
    fetchApplicationsByJob,
    updateStatus,
    loading
  } = useAdminStore();

  useEffect(() => {
    fetchApplicationsByJob(jobId);
  }, [jobId]);

  const handleUpdate = async (id, status) => {
    await updateStatus(id, status);
    fetchApplicationsByJob(jobId);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader text="Loading applicants..." />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <h2 style={{ marginBottom: 16 }}>Applicants</h2>

        {applications.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 12,
              textAlign: "center",
              color: "#6b7280"
            }}
          >
            No applicants for this job yet.
          </div>
        ) : (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              overflowX: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
            }}
          >
            <table
              width="100%"
              style={{
                borderCollapse: "collapse",
                minWidth: 700
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f9fafb",
                    textAlign: "left"
                  }}
                >
                  <th style={thStyle}>Applicant</th>
                  <th style={thStyle}>Email</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>
                    Status
                  </th>
                  <th style={{ ...thStyle, textAlign: "center" }}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    style={{
                      borderBottom: "1px solid #eee"
                    }}
                  >
                    <td style={tdStyle}>
                      <strong>{app.student.name}</strong>
                    </td>

                    <td style={tdStyle}>
                      {app.student.email}
                    </td>

                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "center"
                      }}
                    >
                      <StatusBadge status={app.status} />
                    </td>

                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "center"
                      }}
                    >
                      <button
                        disabled={app.status === "shortlisted"}
                        onClick={() =>
                          handleUpdate(app._id, "shortlisted")
                        }
                        style={{
                          ...actionBtn,
                          background:
                            app.status === "shortlisted"
                              ? "#9ca3af"
                              : "#16a34a"
                        }}
                      >
                        Shortlist
                      </button>

                      <button
                        disabled={app.status === "rejected"}
                        onClick={() =>
                          handleUpdate(app._id, "rejected")
                        }
                        style={{
                          ...actionBtn,
                          background:
                            app.status === "rejected"
                              ? "#9ca3af"
                              : "#dc2626",
                          marginLeft: 8
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

/* ---------- STYLES ---------- */

const thStyle = {
  padding: "14px 16px",
  fontSize: 14,
  fontWeight: 600,
  color: "#374151",
  borderBottom: "1px solid #e5e7eb"
};

const tdStyle = {
  padding: "14px 16px",
  fontSize: 14,
  color: "#111827",
  verticalAlign: "middle"
};

const actionBtn = {
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  color: "#fff",
  fontSize: 13,
  cursor: "pointer"
};
