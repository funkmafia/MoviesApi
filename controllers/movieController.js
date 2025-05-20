const Movie = require('../models/Movie');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const { title, director } = req.query;
    const filter = {};
    if (title) filter.title = new RegExp(title, 'i');
    if (director) filter.director = new RegExp(director, 'i');
    const movies = await Movie.find(filter);
    res.status(200).json({
      status: 'success',
      results: movies.length,
      data: {
        movies
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching movies',
      error: error.message
    });
  }
};

// Get a single movie
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        status: 'fail',
        message: 'Movie not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        movie
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching movie',
      error: error.message
    });
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        movie: newMovie
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error creating movie',
      error: error.message
    });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!movie) {
      return res.status(404).json({
        status: 'fail',
        message: 'Movie not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        movie
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error updating movie',
      error: error.message
    });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({
        status: 'fail',
        message: 'Movie not found'
      });
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting movie',
      error: error.message
    });
  }
}; 