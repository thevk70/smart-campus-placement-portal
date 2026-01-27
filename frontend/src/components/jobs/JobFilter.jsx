import { Search, Filter } from "lucide-react";

export default function JobFilter({
  search,
  setSearch,
  skill,
  setSkill
}) {
  return (
    <div
      className="card"
      style={{
        padding: 16,
        marginBottom: 24,
        display: "flex",
        gap: 16,
        alignItems: "center"
      }}
    >
      {/* Search */}
      <div className="input" style={{ flex: 1 }}>
        <Search size={18} />
        <input
          placeholder="Search by title or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Skill filter */}
      <div className="input" style={{ width: 220 }}>
        <Filter size={18} />
        <input
          placeholder="Filter by skill (React)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      </div>
    </div>
  );
}
