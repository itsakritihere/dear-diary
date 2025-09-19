import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
const baseUrl = process.env.REACT_APP_API_URL;
export default function Dashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
  const fetchEntries = async () => {
    try {
      fetch(`${baseUrl}/api/auth/Dashboard`);
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      console.error("Error fetching diary entries:", err);
    }
  };

  fetchEntries();
}, []);

  return (
    <div className="dashboard d-flex">
      <Sidebar />

      <div className="content flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
        <h2 className="mb-4 fade-in">Welcome back, Akriti 🌸</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card fancy-card shadow pop">
              <div className="card-body">
                <h5 className="card-title">😊 Today’s Mood</h5>
                <p className="card-text">
                  Feeling: <b>Optimistic</b>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card fancy-card shadow pop">
              <div className="card-body">
                <h5 className="card-title">📝 Quick Notes</h5>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Write something..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card fancy-card shadow pop">
              <div className="card-body">
                <h5 className="card-title">📖 Recent Entries</h5>
                <ul className="list-unstyled">
                  {entries.length > 0 ? (
                    entries.map((entry) => (
                      <li key={entry._id}>{entry.title || entry.content}</li>
                    ))
                  ) : (
                    <li>No diary entries found.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="quote mt-5 text-center fade-in">
          <blockquote>
            “Happiness is not something ready made. It comes from your own
            actions.”
          </blockquote>
        </div>
      </div>
    </div>
  );
}
