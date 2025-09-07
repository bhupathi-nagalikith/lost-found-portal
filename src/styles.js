const styles = {
  pageBg: (c1, c2) => ({
  minHeight: "100vh",                        // fixed height, no extra scroll
  width: "100vw",
  background: `linear-gradient(135deg, ${c1}, ${c2})`,
  display: "flex",
  flexDirection: "column",
  paddingTop: 80,  
  overflowX: "hidden",                     // stop horizontal scroll
  overflowY: "auto",                       // allow vertical scroll if content overflows
}),



  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 60,
    background: "rgba(0,0,0,0.25)",
    backdropFilter: "blur(6px)",
    flexWrap: "wrap",
     // ✅ allows wrapping on smaller screens
  },

  heroTitle: {
    fontSize: "clamp(28px, 5vw, 44px)", // ✅ responsive font size
    fontWeight: 900,
    margin: 0,
    color: "white",
    textAlign: "center",
  },

  heroDesc: {
    fontSize: "clamp(14px, 2.5vw, 18px)", // ✅ scales with screen
    maxWidth: 760,
    margin: "8px auto 0",
    color: "white",
    textAlign: "center",
    padding: "0 12px", // ✅ small padding for mobiles
  },

  ctaBtn: {
    background: "white",
    color: "#7e22ce",
    padding: "10px 18px",
    borderRadius: 999,
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
    marginTop: 12,
    fontSize: "clamp(14px, 2.5vw, 16px)", // ✅ responsive button text
  },

  featuresSection: {
    padding: "28px 20px 80px",
    maxWidth: "95%",
    margin: "36px auto",
  },

  featuresHeading: {
    color: "#fff",
    textAlign: "center",
    fontSize: "clamp(18px, 4vw, 22px)", // ✅ responsive heading
    marginBottom: 16,
  },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", // ✅ responsive grid
    gap: 12,
  },

  featureCard: {
    background: "rgba(255,255,255,0.08)",
    padding: 16,
    borderRadius: 12,
    textAlign: "center",
    color: "white",
    boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
  },

  centerCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "70vh",
    padding: "0 12px", // ✅ mobile padding
  },

  card: {
    background: "white",
    padding: 18,
    borderRadius: 12,
    width: "100%",
    maxWidth: 520,
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },

  title: {
    fontSize: "clamp(18px, 4vw, 20px)", // ✅ scales
    fontWeight: 800,
    marginBottom: 12,
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "clamp(14px, 2.5vw, 16px)", // ✅ responsive input text
  },

  label: {
    fontSize: "clamp(12px, 2vw, 13px)", // ✅ responsive label
    marginBottom: 6,
    display: "block",
    color:"blue"
  },

  // ✅ Buttons stay consistent but scale text
  btnWhite: { background: "white", color: "#6b21a8", padding: "8px 12px", borderRadius: 999, border: "none", cursor: "pointer", marginRight: 8, fontSize: "clamp(12px, 2.5vw, 14px)" },
  btnYellow: { background: "#facc15", color: "#111827", padding: "8px 12px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: "clamp(12px, 2.5vw, 14px)" },
  btnBlue: { background: "#2563eb", color: "white", padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "clamp(12px, 2.5vw, 14px)" },
  btnGreen: { background: "#16a34a", color: "white", padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "clamp(12px, 2.5vw, 14px)" },
  btnRed: { background: "#dc2626", color: "white", padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "clamp(12px, 2.5vw, 14px)" },

  link: {
    color: "#0ea5e9",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "clamp(12px, 2.5vw, 14px)",
  },

  sectionTitle: {
    fontSize: "clamp(18px, 4vw, 20px)",
    fontWeight: 800,
    marginTop: 8,
  },

  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    position: "sticky",
    top: 0,
    background: "linear-gradient(90deg, rgba(0,0,0,0.12), rgba(0,0,0,0.06))",
    zIndex: 40,
    flexWrap: "wrap", // ✅ responsive navbar in dashboard
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", // ✅ responsive cards
    gap: 12,
    marginTop: 12,
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(2,6,23,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 120,
    padding: "0 12px", // ✅ safe spacing for mobiles
  },

  modalBox: {
    background: "white",
    padding: 16,
    width: "min(560px, 94%)",
    borderRadius: 10,
    boxShadow: "0 12px 40px rgba(2,6,23,0.6)",
  },
};

export default styles;