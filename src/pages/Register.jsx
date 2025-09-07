import Navbar from "../components/Navbar";
import LabeledInput from "../components/LabeledInput";

export default function Register({
  registerData,
  setRegisterData,
  registerErrors,
  handleRegister,
  setRoute,
  isLoggedIn,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #16a34a, #84cc16)",
        paddingTop: 80, // ✅ keeps form below navbar
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Navbar isLoggedIn={isLoggedIn} setRoute={setRoute} />

      <form
        style={{
          background: "white",
          padding: 32,
          borderRadius: 12,
          width: "100%",
          maxWidth: 800,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
        onSubmit={handleRegister}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 24,
            textAlign: "center",
            color: "#111",
          }}
        >
          Register
        </h2>

        {/* ✅ Two-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          <LabeledInput
            label="Full Name"
            value={registerData.name}
            onChange={(v) => setRegisterData({ ...registerData, name: v })}
            error={registerErrors.name}
          />

          <LabeledInput
            label="Email"
            type="email"
            value={registerData.email || ""}
            onChange={(v) => setRegisterData({ ...registerData, email: v })}
            error={registerErrors.email}
          />

          <LabeledInput
            label="Registration Number"
            value={registerData.regdNo}
            onChange={(v) => setRegisterData({ ...registerData, regdNo: v })}
            error={registerErrors.regdNo}
          />

          <LabeledInput
            label="Phone Number"
            type="tel"
            value={registerData.phone}
            onChange={(v) =>
              setRegisterData({
                ...registerData,
                phone: v.replace(/\D/g, ""),
              })
            }
            error={registerErrors.phone}
          />

          <LabeledInput
            label="College Name"
            value={registerData.college}
            onChange={(v) => setRegisterData({ ...registerData, college: v })}
            error={registerErrors.college}
          />

          {/* ✅ Branch dropdown */}
          <div>
            <label
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 6,
                display: "block",
                color: "#374151",
              }}
            >
              Branch
            </label>
            <select
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 15,
                background: "white",
                color: "#111",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
              value={registerData.branch}
              onChange={(e) =>
                setRegisterData({ ...registerData, branch: e.target.value })
              }
            >
              <option value="">-- Select Branch --</option>
              <option value="CSE">CSE</option>
              <option value="AIML">AIML</option>
              <option value="AI">AI</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="DS">DS</option>
            </select>
            {registerErrors.branch && (
              <div style={{ color: "#dc2626", marginTop: 4 }}>
                {registerErrors.branch}
              </div>
            )}
          </div>

          <LabeledInput
            label="Section"
            value={registerData.section}
            onChange={(v) => setRegisterData({ ...registerData, section: v })}
            error={registerErrors.section}
          />

          <LabeledInput
            label="Password"
            type="password"
            value={registerData.password}
            onChange={(v) => setRegisterData({ ...registerData, password: v })}
            error={registerErrors.password}
          />

          <LabeledInput
            label="Confirm Password"
            type="password"
            value={registerData.confirmPassword}
            onChange={(v) =>
              setRegisterData({ ...registerData, confirmPassword: v })
            }
            error={registerErrors.confirmPassword}
          />
        </div>

        {/* ✅ Error message */}
        {registerErrors._general && (
          <div
            style={{
              color: "#dc2626",
              marginTop: 12,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            {registerErrors._general}
          </div>
        )}

        {/* ✅ Button centered */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            style={{
              background: "#16a34a",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
            type="submit"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
