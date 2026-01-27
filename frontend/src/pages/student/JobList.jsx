import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import StatCard from "../../components/common/StatCard";
import JobFilter from "../../components/jobs/JobFilter";
import JobSkeleton from "../../components/jobs/JobSkeleton";
import { useAuthStore } from "../../store/auth.store";
import { useJobStore } from "../../store/job.store";
import { useApplicationStore } from "../../store/application.store";
import JobDetailsModal from "./JobDetailsModal";

export default function JobList() {
  /* -------------------- STORES -------------------- */
  const { user } = useAuthStore();

  const {
    jobs = [],
    fetchJobs,
    loading
  } = useJobStore();

  const {
    myApplications = [],
    fetchMyApplications,
    applyForJob
  } = useApplicationStore();

  /* -------------------- LOCAL STATE -------------------- */
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);

  /* -------------------- FETCH DATA -------------------- */
  useEffect(() => {
    fetchJobs();
    fetchMyApplications(user);
  }, []);

  /* -------------------- STATS -------------------- */
  const totalJobs = jobs.length;
  const totalApps = myApplications.length;

  const shortlisted = myApplications.filter(
    (a) => a.status === "shortlisted"
  ).length;

  const rejected = myApplications.filter(
    (a) => a.status === "rejected"
  ).length;

  /* -------------------- APPLIED JOB IDS -------------------- */
  const appliedJobIds = myApplications
    .map((app) => app.job?._id)
    .filter(Boolean);

  /* -------------------- APPLY HANDLER -------------------- */
  const handleApply = async (jobId) => {
    await applyForJob(jobId, user);
    fetchMyApplications(user);
  };

  /* -------------------- FILTER LOGIC -------------------- */
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();
    const skillText = skill.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText);

    const matchesSkill =
      !skillText ||
      job.skillsRequired?.some((s) =>
        s.toLowerCase().includes(skillText)
      );

    return matchesSearch && matchesSkill;
  });

  /* -------------------- UI -------------------- */
  return (
    <>
      <Navbar />

      <div className="container">
        {/* ---------- STATS ---------- */}
        <div style={{ display: "flex", gap: 16,flexWrap: "wrap", marginBottom: 24 }}>
          <StatCard label="Available Jobs" value={totalJobs} color="#2563eb" />
          <StatCard label="Applications" value={totalApps} color="#0d9488" />
          <StatCard label="Shortlisted" value={shortlisted} color="#16a34a" />
          <StatCard label="Rejected" value={rejected} color="#dc2626" />
        </div>

        {/* ---------- FILTER ---------- */}
        <JobFilter
          search={search}
          setSearch={setSearch}
          skill={skill}
          setSkill={setSkill}
        />

        {/* ---------- LOADING ---------- */}
        {loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <JobSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ---------- JOB CARDS ---------- */}
        {!loading && (
          <>
            {filteredJobs.length === 0 ? (
              <p style={{ marginTop: 20 }}>No jobs found</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 20
                }}
              >
                {filteredJobs.map((job) => {
                  const applied = appliedJobIds.includes(job._id);

                  return (
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
                      {/* HEADER */}
                      <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700 }}>
                          {job.title}
                        </h3>

                        <p style={{ color: "#6b7280", marginTop: 4 }}>
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

                        {/* SKILLS */}
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap",
                            marginTop: 10
                          }}
                        >
                          {job.skillsRequired?.slice(0, 3).map((s, i) => (
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
                              {s}
                            </span>
                          ))}
                          {job.skillsRequired?.length > 3 && (
                            <span style={{ fontSize: 12, color: "#6b7280" }}>
                              +{job.skillsRequired.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          marginTop: 16
                        }}
                      >
                        <button
                          onClick={() => handleApply(job._id)}
                          disabled={applied}
                          style={{
                            flex: 1,
                            padding: "8px",
                            borderRadius: 8,
                            border: "none",
                            cursor: applied ? "not-allowed" : "pointer",
                            background: applied ? "#9ca3af" : "#16a34a",
                            color: "#fff",
                            fontWeight: 600
                          }}
                        >
                          {applied ? "Applied" : "Apply"}
                        </button>

                        <button
                          onClick={() => setSelectedJobId(job._id)}
                          style={{
                            flex: 1,
                            padding: "8px",
                            borderRadius: 8,
                            border: "none",
                            cursor: "pointer",
                            background: "#4f46e5",
                            color: "#fff",
                            fontWeight: 600
                          }}
                        >
                          More Info
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ---------- MODAL ---------- */}
        {selectedJobId && (
          <JobDetailsModal
            jobId={selectedJobId}
            onClose={() => setSelectedJobId(null)}
          />
        )}
      </div>
    </>
  );
}
