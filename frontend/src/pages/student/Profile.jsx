import { useEffect, useState } from "react";
import { User, Mail, FileText, Code, Edit2, Save, X } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import { useProfileStore } from "../../store/profile.store";
import toast from "react-hot-toast";
import Loader from "../../components/common/Loader";

export default function Profile() {
  const { profile, fetchProfile, updateProfile, loading } = useProfileStore();

  const [isEditing, setIsEditing] = useState(false);
  const { error } = useProfileStore();

  const [form, setForm] = useState({
    name: "",
    skills: "",
    resumeLink: "",
  });

  // Fetch profile on load
  useEffect(() => {
    fetchProfile();
  }, []);

  // Populate form with existing data
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        skills: profile.skills?.join(", ") || "",
        resumeLink: profile.resumeLink || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      skills: form.skills.split(",").map((s) => s.trim()),
      resumeLink: form.resumeLink,
    };

    const success = await updateProfile(payload);

    if (success) {
      toast.success("Profile updated successfully");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    // reset form to original profile data
    if (profile) {
      setForm({
        name: profile.name || "",
        skills: profile.skills?.join(", ") || "",
        resumeLink: profile.resumeLink || "",
      });
    }
    setIsEditing(false);
  };
  if (!profile && loading) {
    return (
      <>
        <Navbar />
        <Loader text="Loading profile..." />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div
          className="card"
          style={{ maxWidth: 600, margin: "auto", padding: 24 }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h2>My Profile</h2>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 6,
                }}
              >
                <Edit2 size={16} /> Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSave}>
            {/* Name */}
            <label>Name</label>
            <div className="input">
              <User size={18} />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Email (always readonly) */}
            <label>Email</label>
            <div className="input">
              <Mail size={18} />
              <input value={profile?.email || ""} disabled />
            </div>

            {/* Skills */}
            <label>Skills</label>
            <div className="input">
              <Code size={18} />
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Resume */}
            <label>Resume Link</label>
            <div className="input">
              <FileText size={18} />
              <input
                name="resumeLink"
                value={form.resumeLink}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Actions */}
            {isEditing && (
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 16,
                }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    padding: 10,
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <Save size={16} />
                  {loading ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    flex: 1,
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    padding: 10,
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            )}
          </form>
          {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
        </div>
      </div>
    </>
  );
}
