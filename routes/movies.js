const router = require("express").Router();
const { populate } = require("../models/Celebrity");
const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");


//see all the movies
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('movies/index', {
        allMovies: movies
      })
    })
    .catch(err => {
      next(err);
    })
})

//send data to create the movie
router.post('/movies', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
  .then(() => {
    res.redirect('/movies')
  })
  .catch(err => {
    next(err);
  })
})

//add new movie
router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then(celebritiesFromDB => {
      res.render('movies/new', { celebrities: celebritiesFromDB })
    })
    .catch(err => {
      next(err);
    })
})

//see movie details
router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movieFromDB => {
      console.log(movieFromDB)
      res.render('movies/show', { movie: movieFromDB })
    })
    .catch(err => {
      next(err);
    })
})

//delete movie
router.post('/movies/:id/delete', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/movies')
    })
    .catch(err => {
      next(err);
    })
})

//display edit view
router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movieFromDB => {     
      Celebrity.find()
        .then(celebrities => {
          //console.log(movieFromDB)
          res.render('movies/edit', { movie: movieFromDB, celebritiesAll: celebrities })
        })      
    })
    .catch(err => {
      next(err);
    })
})

//edit information
router.post('/movies/:id', (req, res, next) => {
  const { title, genre, plot, cast} = req.body;
  Movie.findByIdAndUpdate(req.params.id, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
  .then(() => {
    res.redirect(`${req.params.id}`)
  })
  .catch(err => {
    next(err);
  })
})



module.exports = router;