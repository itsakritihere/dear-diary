import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddEntry.css";
import Sidebar from "../components/Sidebar";
const baseUrl = process.env.REACT_APP_API_URL;



export default function AddEntry() {
  const [date, setDate] = useState("");
  const [entry, setEntry] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // FIXED: Use consistent token key name
    const token = localStorage.getItem('myDiaryToken'); // Changed from 'token' to 'myDiaryToken'

    if (!token) {
      setError("You must be logged in to add an entry.");
      return;
    }

    try {
   const response = await fetch(`${baseUrl}/api/diary`, {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // Include JWT token in headers
  },
  body: JSON.stringify({ date, content: entry }),
});


      const data = await response.json();

      if (response.ok) {
        setSuccess("Your diary entry has been saved! 💖");
        setDate("");
        setEntry("");
      } else {
        setError(data.message || "Failed to save diary entry");
      }
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="add-entry-container flex-grow-1 d-flex justify-content-center align-items-center">
        <motion.div
          className="entry-card shadow p-4"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-center mb-4 diary-title">📖 Add Diary Entry</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Select Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Write about your day ✨</label>
              <textarea
                className="form-control diary-textarea"
                rows="6"
                placeholder="Dear Diary, today was..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                required
              ></textarea>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="btn btn-diary w-100"
            >
              💌 Save Entry
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
