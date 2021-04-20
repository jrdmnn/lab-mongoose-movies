const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  //Is that what is meant with array of Object Ids?
  //Is that the right ref? I call the Schema Celebrity to be included in the movie Schema
  cast: [{
    type: Schema.Types.ObjectId,
    ref: 'Celebrity' 
  }]
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
