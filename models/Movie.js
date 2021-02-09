const mongoose = require('mongoose');
/* const { Schema, model } = require("mongoose"); */
const Schema = mongoose.Schema

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const movieSchema = new Schema({
    name: String,
    genre: String,
    plot: String,
    cast:  [{ 
      type: Schema.Types.ObjectId,
      ref: 'Celebrity' // that is the name  of the model that this id refers to
    }],
  
  });

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;