import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";
import "./ViewEntries.css";

export default function ViewEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("myDiaryToken");
    // Use the correct backend endpoint (update if yours differs!)
    fetch("http://localhost:5001/api/diary", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch diary entries");
        return res.json();
      })
      .then((data) => {
        setEntries(data.data || []); // If your backend returns {data: [...]}
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="view-container">
        <Sidebar />
        <main className="entries-container">
          <h1 className="entries-title">📖 My Diary</h1>
          <p>Loading entries...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-container">
        <Sidebar />
        <main className="entries-container">
          <h1 className="entries-title">📖 My Diary</h1>
          <p className="error-message">{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="view-container">
      <Sidebar />
      <main className="entries-container">
        <h1 className="entries-title">📖 My Diary</h1>
        {entries.length === 0 ? (
          <div className="empty-state">
            <p>Nothing here yet… Start writing your first entry! 💭</p>
          </div>
        ) : (
          <div className="entries-grid">
            {entries
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((entry, idx) => (
                <motion.div
                  key={entry._id || idx}
                  className="entry-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="entry-header">
                    <span className="entry-date">
                      📅 {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="entry-content">
                    <p>{entry.content || entry.entry}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
