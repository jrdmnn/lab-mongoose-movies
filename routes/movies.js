const router = require('express').Router();
const Movies = require('../models/Movies');
const Celebrity = require('../models/Celebrity');

router.get('/movies', (req, res) => {
  Movies.find().populate('cast')
  .then(movies => {
    res.render('movies/index', {movies})
  }).catch(err => next(err))
})

router.get('/movies/new', (req, res) => {
  Celebrity.find()
  .then(celebrity => {
    res.render('movies/new', {celebrity})
  }).catch(err => next(err))
})

router.post('/movies', (req,res) => {
  const {title, genre, plot, cast } = req.body;
    Movies.create({ title, genre, plot, cast })
  .then(() => {
    res.redirect('/movies')
  }).catch(err => next(err))
})


router.get('/movies/:id/edit', (req, res, next) => {
  Movies.findById(req.params.id).populate('cast')
    .then(movie => {
      console.log(movie);
      Celebrity.find().then(celebrities => {
        console.log(movie.cast);
        let options = '';
        let selected = '';
        celebrities.forEach(actor => {
          selected = movie.cast.map(el => el._id).includes(actor._id) ? ' selected' : '';
          options += `<option value="${actor._id}" ${selected}>${actor.name}</option>`;
        });
        res.render('movies/edit', { movie, options });
      })
    })
    .catch(err => {
      next(err);
    })
});






module.exports = router;