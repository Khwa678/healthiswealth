import { useState } from "react";
import API from "../api";
//import "../styles/auth.css";

export default function Register({ onRegister, goToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("Form submitted");   // 👈 ADD THIS
    try {
      const { data } = await API.post("/auth/register", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onRegister(data.user);

    } catch (err) {
      console.log("FULL ERROR:", err.response);
  alert(JSON.stringify(err.response?.data) || "Register failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join CuraLink</p>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Register →</button>
        </form>

        <p className="switch">
          Already have an account?{" "}
          <span onClick={goToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
}
