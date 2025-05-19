const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieControllers");

// get all of the movies
router.get("/", getAllMovies);

// get a specific movie
router.get("/:id", getMovie);

// creating a new movie
router.post("/", createMovie);

// updating a movie
router.put("/:id", updateMovie);

// // deleting a movie
router.delete("/:id", deleteMovie);

module.exports = router;
