const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    genre: [
        {
            type: String,
            // enum: [
            //     'Comedy',
            //     'Action',
            //     'Crime',
            //     'Drama',
            //     'Thriller',
            //     'Horror',
            //     'Sci-fi',
            //     'Biography',
            //     'History',
            //     'Western',
            //     'Other',
            // ],
        },
    ],

    plot: {
        type: String,
    },
    director: {
        type: String,
    },
    year: {
        type: String,
    },

    cast: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Celebrity',
        },
    ],
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
