const express = require("express");
const router = express.Router();
const Movies  = require("../models/movies.js");
const Celeb = require("../models/celebrity");

/*
router.get("/movies/addMovie", (req,res)=> {
        Celeb.find().then((superstar)=> {
            res.render("celebrities/newMovie.hbs", {startingStars: superstar})
        })
})

router.get('/movies', (req, res)=> {
    Movies.find().populate('cast').then((movies)=>{
        res.render('celebrities/movieIndex.hbs', {movies})
    }).catch((error) =>{
        console.log(error);
    })
})

router.get("/movies/addMovie", (req,res)=> {
    res.render("celebrities/newMovie.hbs")
})


router.post("/movies", (req,res)=> {
   Movies.create({
    title: req.body.title,
    genre: req.body.genre,
    plot:  req.body.plot,
    cast:  req.body.cast,
   }).then((newMovie)=> {
        console.log(newMovie);
   }).catch((error)=> {
       console.log(error);
   })
})

*/

router.get('/movies', (req, res) => {
    Movies.find()
      .populate('cast')
      .then(movies => res.render('celebrities/movieIndex', {movies}))
      .catch(error => console.log(error));
  });
  
  
  router.post('/movies', (req, res) => {
    console.log(req.body);
    
    const { title, genre, plot, cast } = req.body;
    console.log('this is the title field: ', title);
    // console.log(title, author, description, rating);
    Movies.create({
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
  
  router.get('/movies/addMovie', (req, res) => {
    // to render the select we also need all the authors in the view
    Celeb.find()
      .then(celebrities => {
        console.log(celebrities)
        res.render('celebrities/newMovie', { celebrities : celebrities});
        
      })
      .catch(err => {
        console.log(err);
      })
  })

  
module.exports = router;