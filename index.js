require("dotenv").config(); // loads enviroment variables from a .env file into process.env
const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

// Middleware
app.use(express.json()); // middleware to parse JSON requests

// Routes
app.use("/api/movies", movieRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movies')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//GET request
app.get("/", (request, response) => {
  response.send("Hello World!");
});

// configuring app to listen on a specific port (accepts requests)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export for testing
