// The Movie model should have:

// title - String
// genre - String
// plot - String
// cast - Array of Object Id's referencing the Celebrity model

const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }]
});

const Movie = model("User", movieSchema);

module.exports = Movie;
