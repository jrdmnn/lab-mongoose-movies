const router = require("express").Router();
const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');

router.get('/movies', (req, res, next) => {
  Movie.find()
  .populate('cast')
  .then(allMovies => {
    console.log(allMovies)
    res.render("movies/index.hbs", {allMovies})
  })
  .catch(err => {
    console.log(err);
    next(error);
  })
})

router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
  .then(allCelebrities => {
    res.render('movies/new.hbs', {allCelebrities})
  })
  .catch((err) => {
    console.log(err);
  })
})

router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
  .then(body => {
    console.log(body);
    res.render('movies/edit', {body})
  }).catch(err => {
    console.log(err);
    next(error);
  })
})

router.post('/movies', (req, res, next) => {
  const title = req.body.title;
  const genre = req.body.genre;
  const plot = req.body.plot;
  const cast = req.body.cast
  //console.log(name, occupation, catchPhras);
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
  .then(() => {
    res.redirect("/movies");
  })
  .catch((err) => {
    console.log(err);
  });
})

router.post('/movies/:id', (req, res, next) => {
  const title = req.body.title;
  const genre = req.body.genre;
  const plot = req.body.plot;
  console.log(title, genre, plot);
  const obj = {
    title: title,
    genre: genre,
    plot: plot
  }
  Movie.findByIdAndUpdate(req.params.id, obj)
  .then(() => {
    res.redirect("/movies")
  })
  .catch(err => {
    console.log(err);
  })
})

module.exports = router;