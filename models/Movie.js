const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true
  },
  director: {
    type: String,
    required: [true, 'Director name is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Release year is required'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating must be between 0 and 10'],
    max: [10, 'Rating must be between 0 and 10']
  },
  watched: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema); 