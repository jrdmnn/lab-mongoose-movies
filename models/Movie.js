const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the Movie model to whatever makes sense in this case
const MovieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [],
});

const Movie = model('Movie', MovieSchema);

module.exports = Movie;
