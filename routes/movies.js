const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");
const router = require("express").Router();

//////////////////// start page for movies - where they are listed & you can add ///////////////////////////
router.get("/movies", (req, res, next) => {
  Movie.find()
  .then(movie => {
    res.render("movies", {movie});
  })
  .catch(err =>
    next(err))
});

//////////////////// Viewing the add form & posting/add the movie ///////////////////////////
router.get("/movies/add", (req,res) => {
  Celebrity.find()
  .then(addCast => {
    res.render('add', {addCast});
  })
  .catch(err => 
    next(err))
})

router.post('/movies', (req,res, next) => {
  //name of HTML form needs to be the same as this deconstructed argument, cause that is what gets send
  const {title, genre, plot, cast} = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  })
  .then(newMovie => {
    res.redirect(`/movies/${newMovie._id}`)
  })
  .catch(err => 
  next(err))
})

//////////////////// Editing movie ///////////////////////////
router.get('/movies/edit/:id', (req, res, next) => {
  Movie.findById(req.params.id)
  .then(movieEdit => {
    res.render('editMovie', {movieEdit})
  })
  .catch(err =>
    next(err));
});

router.post('/movies/edit/:id', (req, res, next) => {
  const {title, genre, plot} = req.body;
  Movie.findByIdAndUpdate(req.params.id, {
    title: title,
    genre: genre,
    plot: plot
  })
  .then(editedMovie => {
    res.redirect(`/movies`)
  })
  .catch(err =>
    next(err))
})

//////////////////// Viewing the details of the movie ///////////////////////////
// also necessary to simply see the new movie after it's been added 
// --> you need the route with the id to render it

router.get('/movies/:id', (req,res, next) => {
  //argument for populate() is the key for that partial Schema in your model
  Movie.findById(req.params.id).populate('cast')
  .then(movieDetails => {
    console.log()
    res.render('movie-details', {movieDetails});
  })
  .catch(err =>
    next(err))
})

module.exports = router;