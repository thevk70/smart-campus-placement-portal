import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Building, Calendar, Code } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import { useJobStore } from "../../store/job.store";

export default function CreateJob() {
  const navigate = useNavigate();
  const { createJob, loading, error } = useJobStore();

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    skillsRequired: "",
    lastDate: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      company: form.company,
      description: form.description,
      skillsRequired: form.skillsRequired
        .split(",")
        .map((s) => s.trim()),
      lastDate: form.lastDate
    };

    const success = await createJob(payload);

    if (success) {
      alert("✅ Job created successfully");
      navigate("/admin");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card" style={{ maxWidth: 600, margin: "auto", padding: 24 }}>
          <h2>Create New Job</h2>

          <form onSubmit={handleSubmit}>
            {/* Job Title */}
            <label>Job Title</label>
            <div className="input">
              <Briefcase size={18} />
              <input
                name="title"
                placeholder="Frontend Developer"
                onChange={handleChange}
                required
              />
            </div>

            {/* Company */}
            <label>Company</label>
            <div className="input">
              <Building size={18} />
              <input
                name="company"
                placeholder="Infosys"
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Job description"
              onChange={handleChange}
              required
            />

            {/* Skills */}
            <label>Skills (comma separated)</label>
            <div className="input">
              <Code size={18} />
              <input
                name="skillsRequired"
                placeholder="React, JavaScript, HTML"
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Date */}
            <label>Last Date</label>
            <div className="input">
              <Calendar size={18} />
              <input
                type="date"
                name="lastDate"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 16,
                width: "100%",
                background: "#2563eb",
                color: "#fff",
                padding: 10,
                border: "none",
                borderRadius: 6
              }}
            >
              {loading ? "Creating..." : "Create Job"}
            </button>

            {error && (
              <p style={{ color: "red", marginTop: 10 }}>{error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
