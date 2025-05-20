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
}); 