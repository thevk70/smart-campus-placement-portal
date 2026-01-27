export default function Loader({ text = "Loading..." }) {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontSize: 16,
        color: "#555"
      }}
    >
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}
