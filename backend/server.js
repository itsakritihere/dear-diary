const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB once
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Import routes
const authRoutes = require('./routes/authRoutes');
const entryRoutes = require('./routes/entryRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/diary', entryRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("API is running");
});
// Dashboard route - add this


// Catch-all 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "404 Not Found - The requested resource does not exist." });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
