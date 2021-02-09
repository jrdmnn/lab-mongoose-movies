const router = require("express").Router();
const Celebrity = require('../models/Celebrity')
const Movie = require('../models/Movie'); 
;


//Listing all Moviesfrom
router.get("/movies/", (req, res, next) => {
  Movie.find()
  .populate('cast')
  .then(movies => {
    res.render('movies/index', { movieList : movies })
  }).catch(err => {
    next(err);
  })
});

//Adding a new movie - Show a form to create a movie 
router.get('/movies/new', (req,res) => {
  Celebrity.find().then(celebrities => {
  res.render('movies/new', {celebrities})
  }).catch(err =>{
    console.log(err); 
  })
})

//Adding a new movie - Send data to create the movie
router.post('/movies/', (req,res) => {
  const {title, genre, plot, cast} = req.body;
  Movie.create({title,genre, plot, cast})
  .then(moviesfromDB => {
    res.redirect(`/movies/${moviesfromDB._id}`)
  })
  .catch(err =>{
    res.redirect('/movies/new')
  });
}); 


//Get to the movies details
// router.get("/movies/:id", (req,res, next) => {
//   const movieId = req.params.id; 
//   Movie.findById(movieId).then(movie => {
//     res.render('movies/show', {movieDetails : movie});
//   }).catch(err => {
//     next(err);
//   })
// });

//Get to the movies details
router.get("/movies/:id", (req,res, next) => {
  const movieId = req.params.id; 
  Movie.findById(movieId)
  .populate('cast')
  .then(movie => {
    res.render('movies/show', {movieDetails : movie});
  }).catch(err => {
    next(err);
  })
});







module.exports = router 