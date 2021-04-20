const router = require('express').Router();
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');
const hbs = require("hbs");

hbs.registerHelper('selected', (cast, celebrityId) => {
  if (cast.includes(celebrityId)) return 'selected';
  else return '';
});

router.get('/movies', (req, res, next) => {
  Movie.find().populate('cast')
    .then(movies => {
      res.render('movies/index', { movieList: movies });
    }).catch(err => {
      next(err);
    });
});

router.post('/movies', (req, res) => {
  Movie.create(req.body)
    .then(() => {
    res.redirect('/movies');
  }).catch(err => {
    console.log(err);
    res.render('movies/new');
  });
});

router.get('/movies/new', (req, res) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('movies/new', { celebrityList: celebrities });
    }).catch(err => {
      next(err);
    });
});

router.post('/movies/:id/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/movies');
    }).catch(err => {
      next(err);
    });
});

router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      Celebrity.find()
        .then(celebrities => {
          res.render('movies/edit', { movieDetails: movie , celebrityList: celebrities });
        })
    }).catch(err => {
      next(err);
    });
});

router.post('/movies/:id/edit', (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect('/movies');
    }).catch(err => {
      next(err);
    });
});

module.exports = router;