export default function StatusBadge({ status }) {
  const colors = {
    applied: "#3b82f6",
    shortlisted: "#16a34a",
    rejected: "#dc2626"
  };

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 20,
        background: colors[status],
        color: "#fff",
        fontSize: 12
      }}
    >
      {status.toUpperCase()}
    </span>
  );
}
