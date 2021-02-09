const router = require("express").Router();
const Celebrity = require("../models/Celebrity");
const Movie = require ("../models/Movie")

router.get("/movies", (req, res) => {
  Movie.find().then(moviesFromDB => {
  
    res.render("movies/index.hbs", {moviesFromDB}); 
  });
})

router.get("/movies/new", (req, res) => {
  Celebrity.find().then(celebsFromDB => {
    console.log(celebsFromDB)
    res.render("movies/new.hbs", {listCelebs: celebsFromDB}); 
  });
})


router.post('/movies', (req, res) => {
  // console.log(req.body);
/*   const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase; */
  console.log("HELLLL");
  const {name, genre, plot, cast} = req.body;
    Movie.create({
    name,
    genre,
    plot,
    cast
   })
    .then(() => {
        res.redirect(`/movies`)
      // res.render('bookDetails', { bookDetails: book });
    })
  .catch(err => console.log(err))
}) 

module.exports = router;