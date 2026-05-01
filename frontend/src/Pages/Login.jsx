import { useState } from "react";
import API from "../api";
import "../styles/auth.css";

export default function Login({ onLogin, goToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLogin(data.user);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>CuraLink</h2>
        <p className="subtitle">AI Medical Research Assistant</p>

        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
          <button type="submit">Login →</button>
        </form>

        <p className="switch">
          Don’t have an account?{" "}
          <span onClick={goToRegister}>Register</span>
        </p>
      </div>
    </div>
  );
}