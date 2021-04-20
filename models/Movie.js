const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let moviesSchema = new Schema ({
    title: String,
    genre: String,
    plot: String,
    cast: Array
})

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;

