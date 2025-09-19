// Sidebar.js
import React from "react";

export default function Sidebar() {
  return (
    <div className="sidebar p-4 shadow">
      <h2 className="brand mb-5">🌸 MyDiary</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="/Dashboard" className="nav-link">🏠 Home</a>
        </li>
        <li className="nav-item">
          <a href="/AddEntry" className="nav-link">✍️ Write Diary</a>
        </li>
        <li className="nav-item">
          <a href="/ViewEntries" className="nav-link">📖 View Entries</a>
        </li>
        <li className="nav-item">
          <a href="/Settings" className="nav-link">⚙️ Settings</a>
        </li>
        <li className="nav-item">
          <a href="/Logout" className="nav-link text-danger">🚪 Logout</a>
        </li>
      </ul>
    </div>
  );
}
