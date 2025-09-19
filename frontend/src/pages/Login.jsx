import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_URL; // initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await (`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        
        // FIXED: Use consistent key name for token storage
        localStorage.setItem("myDiaryToken", data.token);

        // FIXED: Navigate to /dashboard (lowercase) to match your routing
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  return (
  <div className="login-bg">
    <div className="overlay"></div>
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow p-4 login-card">
        <h2 className="text-center mb-4 login-title">📖 My Diary</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control fancy-input"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control fancy-input"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-diary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register" className="link-diary">Register</a>
        </p>
      </div>
    </div>
  </div>
);
}