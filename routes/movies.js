const router = require("express").Router();
const Movie = require("../models/Movie");
const Celebrity = require("../models/Celebrity");


router.get('/',(req, res, next) =>{
  Movie.find()
  .then(movies => {
    console.log(movies)
    res.render('movies', { moviesList: movies });
  }).catch(err => {
    next(err);
  })
})

router.get('/create', (req, res) => {
  Celebrity.find()
    .then(celebritiesFromDB => {
      console.log('CELEBRITIES', celebritiesFromDB);
      res.render('movies/create', { celebrities: celebritiesFromDB });
    })
    .catch(err => {
      next(err);
    })
})

router.get('/:id', (req, res, next) =>{
  Movie.findById(req.params.id)
  .populate('cast')
  .then(movies => {
    console.log('populate',movies)
    res.render('movies/show', { moviesList: movies });
  }).catch(err => {
    next(err);
  })
})

//detalis
router.get('/details/:id', (req, res, next) => {
  console.log(req.params.id)
  const movieId = req.params.id;
  //find movie by id
  Movie.findById(movieId).populate('cast').then(movie => {
    res.render('show', { movieDetails: movie });
  })
    .catch(err => {
      next(err);
    })
})

router.post('/', (req, res) => {
  console.log(req.body);
  const {title, genre, plot, cast} = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
  .then(movieFromDB => {
    console.log(`Movie was just created ${movieFromDB}`);
    res.redirect(`movies/${movieFromDB._id}`);
  })
})

router.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
  .then(movieFromDB => {
    res.render('movies/edit', { movie: movieFromDB });
  })
  .catch(err => {
    next(err);
  });
});


router.post('/:id/', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
    .then (() => {

      res.redirect('/movies');
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;