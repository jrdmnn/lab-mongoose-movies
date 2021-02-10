const mongoose = require('mongoose');
const Celebrity = require("./Celebrity")
const Schema = mongoose.Schema
//==const Celebrity = require('./models/Celebrity')
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const MovieSchema = new Schema({
  name: String,
  genre: String,
  plot: String,
  cast:
  [{type: Schema.Types.ObjectId,
   ref: 'Celebrity'
  }]
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;