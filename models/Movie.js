const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    // genre: {
    //     type: String,
    //     enum: ['comedy', 'drama', 'action', 'horror', 'other'],
    //     required: true,
    // },
    plot: {
        type: String,
    },
    director: {
        type: String,
    },
    year: {
        type: String,
    },

    cast: {},
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
