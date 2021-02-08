const router = require('express').Router();
const Movie = require('../models/Movie');

// Get all movies
router.get('/movies', (req, res, next) => {
    Movie.find()
        .then((resp) => {
            console.log('movies', resp);
            res.render('movies/index', { resp });
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

module.exports = router;
