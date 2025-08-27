// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection using connection string from environment variables
// Removed deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const entryRoutes = require('./routes/entryRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/diary', entryRoutes);

// Root test route to verify server status
app.get("/", (req, res) => {
  res.send("API is running");
});

// Catch-all 404 handler - place after all route handlers
app.use((req, res, next) => {
  res.status(404).json({ message: "404 Not Found - The requested resource does not exist." });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
