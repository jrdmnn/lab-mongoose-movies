const mongoose = require('mongoose');
const Schema = mongoose.Schema
//==const Celebrity = require('./models/Celebrity')
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const MovieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast:[
  {name: String},
  {occupation: String},
  {catchPhrase: String},
  ]
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;