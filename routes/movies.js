const router = require('express').Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

// Get all movies
router.get('/movies', (req, res, next) => {
    Movie.find()
        .populate('cast')
        .then((movies) => {
            console.log('movies', movies);
            res.render('movies/index', { movies });
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});
// Form
router.get('/movies/new', (req, res) => {
    Celebrity.find().then((cel) => {
        res.render('movies/new', { cel });
    });
});

// Add movie
router.post('/movies', (req, res) => {
    // preventDefault();
    const { title, director, year, genre, plot, cast } = req.body;
    Movie.create({
        title,
        director,
        year,
        genre,
        plot,
        cast,
    })
        .then((movie) => {
            console.log('This movie was added', movie);
            res.redirect(`/movies`);
        })
        .catch((err) => {
            console.log(err);
            res.redirect(`/movies/new`);
        });
});

module.exports = router;
