const router = require('express').Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
  Movie.find()
    .then(movies => res.render('movies/index', {movies}))
    .catch(error => console.log(error));
});

router.post('/', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({title, genre, plot, cast})
    .then(movie => res.redirect(`/movies/${movie._id}`))
    .catch(error => res.redirect('/movies/new'));
});

router.get('/new', (req, res) => {
  Celebrity.find()
    .then(celebrities => res.render('movies/new', {celebrities}))
    .catch(error => res.redirect('/movies/new'));
});

router.post('/edit/:id', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  const movieId = req.params.id;
  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
    .then(movie => res.redirect(`/movies/${movie._id}`))
    .catch(err => console.log(err));
});

router.post('/:id/delete', (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/movies'))
    .catch(error => console.log(error));
});

router.get('/:id/edit', (req, res) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => {
      const listIdCast = movie.cast.map(celeb => celeb._id);
      let listNames = [];
      Celebrity.find()
        .then(celebrities => {
          celebrities.forEach(celeb => listNames.push({celebName: celeb.name, id: celeb._id, included: listIdCast.includes(celeb._id)}));
          // console.log(listNames);
          res.render('movies/edit', {movie, listNames: listNames});
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});

router.get('/:id', (req, res) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => res.render('movies/show', {movie}))
    .catch(error => console.log(error));
});

module.exports = router;