import React from "react";
import Navbar from "../components/Navbar";
import LabeledInput from "../components/LabeledInput";
import styles from "../styles";

export default function Login({ loginData, setLoginData, handleLogin, loginError, setRoute }) {
  return (
    <div style={styles.pageBg("#3b82f6", "#06b6d4")}>
      <Navbar isLoggedIn={false} setRoute={setRoute} />
      <div style={styles.centerCard}>
        <form style={styles.card} onSubmit={handleLogin}>
          <h2 style={styles.title}>Login</h2>
          <LabeledInput
            label="Registration Number"
            value={loginData.regdNo}
            onChange={(v) => setLoginData({ ...loginData, regdNo: v })}
          />
          <LabeledInput
            label="Password"
            type="password"
            value={loginData.password}
            onChange={(v) => setLoginData({ ...loginData, password: v })}
          />
          {loginError && <div style={{ color: "#dc2626" }}>{loginError}</div>}
          <button style={styles.btnBlue} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
