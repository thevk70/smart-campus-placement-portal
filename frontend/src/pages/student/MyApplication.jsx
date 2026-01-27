import { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { useApplicationStore } from "../../store/application.store";
import StatusBadge from "../../components/common/StatusBadge";
import { useAuthStore } from "../../store/auth.store";

export default function MyApplications() {
  const { user } = useAuthStore();
  const { myApplications, fetchMyApplications } =
    useApplicationStore();

  useEffect(() => {
    fetchMyApplications(user);
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h2 style={{ marginBottom: 16 }}>My Applications</h2>

        {myApplications.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 10,
              textAlign: "center",
              color: "#555"
            }}
          >
            You haven’t applied to any jobs yet.
          </div>
        ) : (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              overflowX: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
            }}
          >
            <table
              width="100%"
              style={{
                borderCollapse: "collapse",
                minWidth: 500
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f9fafb",
                    textAlign: "left"
                  }}
                >
                  <th style={thStyle}>Job Role</th>
                  <th style={thStyle}>Company</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {myApplications.map((app) => (
                  <tr
                    key={app._id}
                    style={{
                      borderBottom: "1px solid #eee"
                    }}
                  >
                    <td style={tdStyle}>
                      <strong>{app.job.title}</strong>
                    </td>

                    <td style={tdStyle}>
                      {app.job.company}
                    </td>

                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "center"
                      }}
                    >
                      <StatusBadge status={app.status} />
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
  color: "#111827"
};
