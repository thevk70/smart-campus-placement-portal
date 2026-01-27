export default function StatCard({ label, value, color }) {
  return (
    <div
      className="card"
      style={{
        flex: 1,
        padding: 16,
        background: color,
        color: "#fff"
      }}
    >
      <h4>{label}</h4>
      <h2>{value}</h2>
    </div>
  );
}
