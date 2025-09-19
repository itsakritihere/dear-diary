import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");       // if you store JWT token
    localStorage.removeItem("diaryEntries"); // optional, if cached locally

    // Redirect to login page after logout
    navigate("/login");
  };

  const handleCancel = () => {
    // Redirect back to dashboard to cancel logout
    navigate("/Dashboard");
  };

  return (
    <div className="logout-page">
      <div className="logout-box">
        <h2>⚠️ Are you sure you want to logout?</h2>
        <p>Your progress will be saved automatically.</p>
        <div className="logout-buttons">
          <button className="btn btn-danger" onClick={handleLogout}>
            Yes, Logout
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
