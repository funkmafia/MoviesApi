const mongoose = require('mongoose');

// Helper function to create a test movie
const createTestMovie = () => ({
  title: 'Test Movie',
  director: 'Test Director',
  year: 2024,
  genre: 'Action',
  rating: 8.5
});

// Helper function to clear database
const clearDatabase = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
};

// Helper function to close database connection
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

module.exports = {
  createTestMovie,
  clearDatabase,
  closeDatabase
}; 