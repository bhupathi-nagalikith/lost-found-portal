import styles from "../styles";

export default function LabeledInput({ label, type = "text", value, onChange, error }) {
  return (
    <div style={{ marginBottom: 10,color:"blueviolet" }}>
      <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...styles.input, borderColor: error ? "#dc2626" : "#ccc" }}
      />
      {error && <div style={{ color: "#dc2626", fontSize: 12 }}>{error}</div>}
    </div>
  );
}
