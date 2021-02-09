const router = require("express").Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity')

router.get('/movies', (req, res, next) => {
  // get all the movies from the database -> find() returns all the documents
  Movie.find()
    .populate('cast')
    .then(moviesFromDB => {
      console.log('the movies', moviesFromDB);
      // render a movies view to display them
      res.render('movies/index', {moviesList: moviesFromDB })  

  }).catch(err => {
    next(err)
    //console.log(err);
  })
})

router.post('/movies', (req, res) => {
  // const title   = req.body.title;
  // const genre   = req.body.genre;
  // const plot    = req.body.plot;
  // const cast    = req.body.cast;

  const {title, genre, plot, cast} = req.body;

  Movie.create({title, genre, plot, cast})
    .then(movie => res.redirect(`/movies/`))
    // .then(movie => res.redirect(`/movies/${movie._id}`))
    .catch(err => res.redirect('/movies/new'));
});

router.get('/movies/new', (req, res, next) => {
  Celebrity.find().then(allCelebrities => {
    res.render('movies/new', {allCelebrities})
  })
})

router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      console.log('movie to edit', movie)
      res.render('movies/edit', {movie})
    }).catch(err => {
      next(err)
      //console.log(err);
    })
})

router.post('/movies/:id', (req, res, next) => {

  const { title, genre, plot } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot})
    .then(() => res.redirect(`/movies`))
    .catch(error => console.log(error));
    
});


module.exports = router;