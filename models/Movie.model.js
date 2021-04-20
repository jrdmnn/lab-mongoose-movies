const mongoose = require('mongoose');
const Celebrity = require('./Celebrity.model');
const Schema = mongoose.Schema;

const movieSchema = mongoose.Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Celebrity',
    },
  ]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;