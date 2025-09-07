import styles from "../styles";

export default function Modal({ children, onClose }) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalBox}>
        {children}
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button style={styles.btnRed} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
} 