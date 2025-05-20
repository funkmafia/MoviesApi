require("dotenv").config(); // loads enviroment variables from a .env file into process.env
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const movieRoutes = require("./routes/movieRoutes");
const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json()); // middleware to parse JSON requests

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//GET request
app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.use("/api/movies", movieRoutes);

// POST request - used for sending information and when you want to create a new resource

// configuring app to listen on a specific port (accepts requests)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
