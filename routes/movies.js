const router = require('express').Router();
const Movie = require('../models/Movie.js');
const Celebrity = require('../models/Celebrity.js');
const hbs = require('hbs');

// register new function
hbs.registerHelper("contains", function(options) {
  const movieCast = options.data.root.movie.cast;

  // check if current celebrity (this) is in cast
  let found = false;
  for (let person of movieCast) {
    if (person.name === this.name) {
      found = true;
    }
  }

  if(found){
    // console.log('it\'s a match!');
    return new hbs.SafeString('<option value="' + this._id + '" selected>' + this.name + '</option>');
  } else {
    // console.log('no match!');
    return new hbs.SafeString('<option value="' + this._id + '">' + this.name + '</option>');
  }
});

router.get('/movies', (req,res,next) => {
  Movie.find()
  .then(movies => {
    res.render('movies/index', { movies });
  })
  .catch(err => {
    next(err);
  })
})

router.post('/movies', (req,res,next) => {
  console.log(req.body)
  let {title, genre, plot, cast} = req.body;

  Movie.create({
    title, genre, plot, cast
  })
  .then(movie => {
    console.log(`${movie.title} has been added to the database`);
    res.redirect('movies')
  })
  .catch(err => {
    res.render('movies/new')
  })
})

router.get('/movies/new', (req,res,next) => {
  Celebrity.find()
  .then(celebrities => {
    res.render('movies/new', {celebrities});
  })
  .catch(err => {
    next(err)
  })
})

router.get('/movies/:id', (req,res,next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
  .populate('cast')
  .then(movie => {
    res.render('movies/show', {movie})
  })
  .catch(err => {
    next(err);
  })
})

router.get('/movies/:id/:edit', (req,res,next) => {
  Celebrity.find()
  .then(celebrities => {
    const movieId = req.params.id;
    Movie.findById(movieId)
    .populate('cast')
    .then(movie => {
      res.render('movies/edit', {celebrities, movie})
    })
    .catch(err => {
      next(err);
    })
  })
  .catch(err => {
    next(err);
  })
})

router.post('/movies/:id', (req,res,next) => {
  let {title, genre, plot, cast} = req.body;
  Movie.findOneAndUpdate({_id: req.params.id}, {title, genre, plot, cast})
  .populate('cast')
  .then(() => {
    res.redirect('/movies');
  })
  .catch(err =>
    next(err));
})

module.exports = router;