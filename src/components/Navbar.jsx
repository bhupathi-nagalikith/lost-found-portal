import styles from "../styles";

export default function Navbar({ isLoggedIn, setRoute }) {
  return (
    <div style={styles.navbar}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "white" }}>
          🎒 Campus Lost & Found
        </div>
      </div>
      <div>
        {!isLoggedIn && (
          <>
            <button style={styles.btnWhite} onClick={() => setRoute("login")}>Login</button>
            <button style={styles.btnYellow} onClick={() => setRoute("register")}>Register</button>
          </>
        )}
      </div>
    </div>
  );
}
