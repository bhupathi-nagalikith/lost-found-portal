import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [route, setRoute] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [stories, setStories] = useState([]);

  const [registerData, setRegisterData] = useState({
    name: "",
    regdNo: "",
    phone: "",
    college: "",
    branch: "",
    section: "",
    password: "",
    confirmPassword: ""
  });
  const [registerErrors, setRegisterErrors] = useState({});

  const [loginData, setLoginData] = useState({ regdNo: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Load from localStorage
  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setItems(JSON.parse(localStorage.getItem("items")) || []);
    setStories(JSON.parse(localStorage.getItem("stories")) || []);
  }, []);

  useEffect(() => localStorage.setItem("users", JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem("items", JSON.stringify(items)), [items]);
  useEffect(() => localStorage.setItem("stories", JSON.stringify(stories)), [stories]);

  // ---------------- REGISTER ----------------
  const handleRegister = (e) => {
    e.preventDefault();
    let errs = {};
    if (!registerData.name) errs.name = "Name required";
    if (!registerData.regdNo) errs.regdNo = "Regd No required";
    if (!registerData.phone) errs.phone = "Phone required";
    if (!registerData.college) errs.college = "College required";
    if (!registerData.branch) errs.branch = "Branch required";
    if (!registerData.section) errs.section = "Section required";
    if (!registerData.password) errs.password = "Password required";
    if (registerData.password !== registerData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";

    setRegisterErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setUsers([...users, { ...registerData }]);
    setRegisterData({
      name: "", regdNo: "", phone: "", college: "",
      branch: "", section: "", password: "", confirmPassword: ""
    });
    setRoute("login");
  };

  // ---------------- LOGIN ----------------
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.regdNo === loginData.regdNo && u.password === loginData.password
    );
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setRoute("dashboard");
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setRoute("home");
  };

  if (isLoggedIn && route === "dashboard") {
    return (
      <Dashboard
        currentUser={currentUser}
        items={items}
        setItems={setItems}
        stories={stories}
        setStories={setStories}
        setRoute={setRoute}
        handleLogout={handleLogout}
      />
    );
  }

  if (route === "login") {
    return (
      <Login
        loginData={loginData}
        setLoginData={setLoginData}
        handleLogin={handleLogin}
        loginError={loginError}
        setRoute={setRoute}
      />
    );
  }

  if (route === "register") {
    return (
      <Register
        registerData={registerData}
        setRegisterData={setRegisterData}
        registerErrors={registerErrors}
        handleRegister={handleRegister}
        setRoute={setRoute}
      />
    );
  }

  return <Home setRoute={setRoute} />;
}
