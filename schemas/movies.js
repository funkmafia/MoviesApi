const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  Genre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", moviesSchema);
// mongoose looks at the name, makes it plural, hence why Movie is connected to this schema (will read as movies)

// what properties? producer, genre,

{
  /* Duration: {
    type: Number, 
    required: true,
  }
    */
}
