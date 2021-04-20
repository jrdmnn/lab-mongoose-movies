const router = require('express').Router();
const Movie = require('../models/movie');
const Celeb = require('../models/celebrity');

router.get('/', (req, res, next) => {
  Movie.find()
    .then(movies => {
      console.log(movies);
      res.render('movies/index', { movieList: movies });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/new', (req, res) => {
  Celeb.find()
    .then(celebs => {
      res.render('movies/movieForm', { celebs });
    });

});

router.get('/:id', (req, res, next) => {
  // console.log(req.params.id);
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate('cast')
    .then(movie => {
      console.log(movie);
      res.render('movies/movieShow', { movieDetails: movie });
    })
    .catch(err => {
      console.log(err);
      // next(err);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .then((movie) => {
      res.render('movies/movieEdit.hbs', { movie });
    })
    .catch(err => {
      next(err);
    });
});

router.post('/new', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
    .then(movieFromDB => {
      console.log(`this movie was just created: ${movieFromDB}`);
      res.redirect('/movies');
    })
    .catch(err => {
      // next(err);
      console.log(err);
    });
});

router.post('/:id', (req, res, next) => {
  console.log(req.body);
  const { title, genre, plot } = req.body;
  const movieId = req.params.id;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => {
      next(err);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const movieId = req.params.id;

  Movie.findByIdAndRemove(movieId)
    .then(() => {
      console.log('The movie has been deleted');
      res.redirect('/movies');
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;