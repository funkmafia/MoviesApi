const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const movieRoutes = require("./routes/movieRoutes");

app.use(express.json()); // middleware to parse JSON requests

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
