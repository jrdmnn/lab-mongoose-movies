const router = require('express').Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies', (req, res) => {
  Movie.find()
    .populate('cast')
    .then(movies => res.render('movies/index', {movies}))
    .catch(error => console.log(error));
});

// router.get('/movies/new', (req, res) => {
//   res.render('movies/new', {});
// });

// router.post('/movies', (req, res) => {
//   Movie.create({title, genre, plot, cast})
//     .then(movie => res.redirect(`/movies/${movie._id}`))
//     .catch(error => res.redirect('/movies/new'));
// });

router.post('/movies', (req, res) => {
  console.log(req.body);
  
  const { title, genre, plot, cast } = req.body;
  console.log('this is the title field: ', title);
  // console.log(title, author, description, rating);
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
    .then(movie => {
      console.log('this movie was just created: ', movie);
      res.redirect(`/movies/`)
      // res.render('bookDetails', { bookDetails: book });
    })
})

router.get('/movies/add', (req, res) => {
  // to render the select we also need all the authors in the view
  Celebrity.find()
    .then(celebrities => {
      console.log(celebrities)
      res.render('movies/new', { celebrities : celebrities});
      
    })
    .catch(err => {
      console.log(err);
    })
})
router.get('/movies/:id/edit', (req, res) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => res.render('movies/edit', {movie}))
    .catch(error => console.log(error));
});

router.post('/movies/:id', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then(() => res.redirect(`/movies`))
    .catch(error => console.log(error));
});

module.exports = router; 