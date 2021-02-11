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
            next(err);
        });
});

// Get movie details
router.get('/movies/:id', (req, res, next) => {
    console.log('req.params', req.params.id);
    Movie.findById(req.params.id)
        .populate('cast')
        .then((movie) => {
            res.render('movies/show', { movie });
        })
        .catch((err) => {
            next(err);
        });
});

// Form
router.get('/movies/new', (req, res) => {
    Celebrity.find()
        .populate('cast')
        .then((cast) => {
            console.log(cast);
            res.render('movies/new', { cast });
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
            res.render(`movies/new`, { cast });
        });
});

// Update movie
router.get('/movies/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id).then((movie) => {
        Celebrity.find()
            .populate('cast')
            .then((celebrities) => {
                let options = '';
                let selected = '';
                celebrities.forEach((actor) => {
                    selected = movie.cast
                        .map((el) => el._id)
                        .includes(actor._id)
                        ? ' selected'
                        : '';
                    options += `<option value="${actor._id}" ${selected}>${actor.name}</option>`;
                });
                console.log('celebrities', celebrities);
                // res.render('movies/edit', { movie, celebrities });
                res.render('movies/edit', { movie, options });
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
    });
});

router.post('/movies/:id', (req, res, next) => {
    const { title, director, year, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id, {
        title,
        director,
        year,
        genre,
        plot,
        cast,
    }, { new: true })
        .then(movie => {
            res.status(200).redirect(`/movies/${movie._id}`);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
