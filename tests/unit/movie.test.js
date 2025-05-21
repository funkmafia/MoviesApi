require('dotenv').config();
const mongoose = require('mongoose');
const { createTestMovie } = require('../utils/testUtils');
const Movie = require('../../models/Movie');

describe('Movie Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save movie successfully', async () => {
    const validMovie = createTestMovie();
    const savedMovie = await Movie.create(validMovie);
    expect(savedMovie._id).toBeDefined();
    expect(savedMovie.title).toBe(validMovie.title);
    expect(savedMovie.director).toBe(validMovie.director);
    expect(savedMovie.year).toBe(validMovie.year);
    expect(savedMovie.genre).toBe(validMovie.genre);
    expect(savedMovie.rating).toBe(validMovie.rating);
  });

  it('should fail to save movie without required fields', async () => {
    const movieWithoutRequiredField = new Movie({ title: 'Test Movie' });
    let err;
    try {
      await movieWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
}); 