import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
import "./Register.css";
const baseUrl = process.env.REACT_APP_API_URL;


export default function Register() {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // ADD THIS LINE

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await(`${baseUrl}/api/auth/register`,  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // SAVE TOKEN AFTER SUCCESSFUL REGISTRATION
        localStorage.setItem("myDiaryToken", data.token);
        
        setSuccess("Registration successful! Redirecting to dashboard...");
        
        // Clear form fields
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError(data.message || "Registration failed");
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
      <div className="login-card p-4">
        <h2 className="login-title text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control fancy-input"
              id="fullName"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control fancy-input"
              id="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control fancy-input"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button type="submit" className="btn btn-diary w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="link-diary">Login</a>
        </p>
      </div>
    </div>
  </div>
);
}
