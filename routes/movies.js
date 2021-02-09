const router = require('express').Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity')

router.post('/movies', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  }).then(movie => {
    console.log('this movie was created', movie);
    res.redirect('/movies')
  }).catch(err => {
    console.log(err);
    res.render('/movies/new');
  })
})


router.get('/movies', (req, res) => {
  Movie.find()
  .then(moviesFromDb => {
    res.render('movies/index', { movieList : moviesFromDb})
  }).catch(err => {
    console.log(err);
  })

});

router.get('/movies/new', (req, res) => {
  Celebrity.find()
  .then(celebritiesFromDB => {
    res.render('movies/new', { celebrities: celebritiesFromDB})
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/movies/edit/:id', (req, res) => {
  const movieID = req.params.id;
  Celebrity.find().then(celebritiesFromDB => {
    Movie.findById(movieID)
    .then(movieInfo => {
      res.render('movies/edit', { celebrities: celebritiesFromDB, movieInfo: movieInfo})
    }).catch(err => {
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  })
  
})

router.post('/movies/edit/:id', (req, res) => {
  const movieID = req.params.id;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieID, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
  .then(movie => {
    res.redirect(`/movies/${movie._id}`)
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
  .populate('cast')
  .then(movieDB => {
    res.render('movies/show', { movieDetails: movieDB })
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;