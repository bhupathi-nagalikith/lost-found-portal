import Navbar from "../components/Navbar";
import styles from "../styles";

export default function Home({ setRoute, isLoggedIn }) {
  return (
    <div style={styles.pageBg("#7e22ce", "#ef4444")}>
      <Navbar isLoggedIn={isLoggedIn} setRoute={setRoute} />
      <div style={{ paddingTop: 90, textAlign: "center", color: "white" }}>
        <h1 style={styles.heroTitle}>Find. Report. Reunite.</h1>
        <p style={styles.heroDesc}>
          Report lost items, search the catalogue, get instant updates,
          and celebrate successful returns.
        </p>
        <button style={styles.ctaBtn} onClick={() => setRoute("register")}>
          Get Started — Register
        </button>
      </div>

      <section style={styles.featuresSection}>
        <h2 style={styles.featuresHeading}>Features you'll love</h2>
        <div style={styles.featuresGrid}>
          {[
            ["🔍", "Smart Search", "Filter by name, status and keywords."],
            ["⚡", "Quick Reports", "Add lost/found items quickly."],
            ["📢", "Real-time Updates", "See latest posts at a glance."],
            ["✅", "Verify & Claim", "Securely return items to owners."],
            ["🤝", "Community First", "Students helping students."],
            ["🎉", "Success Stories", "Celebrate reunions."],
          ].map(([emoji, title, desc], i) => (
            <div key={i} style={styles.featureCard}>
              <div style={{ fontSize: 28 }}>{emoji}</div>
              <div style={{ fontWeight: 800, marginTop: 8 }}>{title}</div>
              <div style={{ marginTop: 6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}