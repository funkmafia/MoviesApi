const request = require('supertest');
const mongoose = require('mongoose');
const { createTestMovie, clearDatabase } = require('../utils/testUtils');
const app = require('../../index');

describe('Movie Routes Integration Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/movies', () => {
    it('should get all movies', async () => {
      const response = await request(app).get('/api/movies');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data.movies)).toBeTruthy();
    });
  });

  describe('POST /api/movies', () => {
    it('should create a new movie', async () => {
      const testMovie = createTestMovie();
      const response = await request(app)
        .post('/api/movies')
        .send(testMovie);
      expect(response.status).toBe(201);
      expect(response.body.data.movie.title).toBe(testMovie.title);
    });

    it('should create a new movie with watched status', async () => {
      const testMovie = { ...createTestMovie(), watched: true };
      const response = await request(app)
        .post('/api/movies')
        .send(testMovie);
      expect(response.status).toBe(201);
      expect(response.body.data.movie.title).toBe(testMovie.title);
      expect(response.body.data.movie.watched).toBe(true);
    });
  });

  describe('GET /api/movies/:id', () => {
    it('should get a movie by id', async () => {
      const testMovie = createTestMovie();
      const createdMovie = await request(app)
        .post('/api/movies')
        .send(testMovie);
      
      const response = await request(app)
        .get(`/api/movies/${createdMovie.body.data.movie._id}`);
      
      expect(response.status).toBe(200);
      expect(response.body.data.movie.title).toBe(testMovie.title);
    });
  });

  describe('GET /api/movies?title=Test', () => {
    it('should find movies by title', async () => {
      const testMovie = createTestMovie();
      await request(app).post('/api/movies').send(testMovie);
      const response = await request(app).get('/api/movies?title=Test');
      expect(response.status).toBe(200);
      expect(response.body.data.movies.length).toBeGreaterThan(0);
      expect(response.body.data.movies[0].title).toMatch(/Test/i);
    });
  });

  describe('GET /api/movies?director=Director', () => {
    it('should find movies by director', async () => {
      const testMovie = createTestMovie();
      await request(app).post('/api/movies').send(testMovie);
      const response = await request(app).get('/api/movies?director=Director');
      expect(response.status).toBe(200);
      expect(response.body.data.movies.length).toBeGreaterThan(0);
      expect(response.body.data.movies[0].director).toMatch(/Director/i);
    });
  });
}); 