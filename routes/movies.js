const router = require("express").Router();
const Celebrity = require("../models/Celebrity");
const Movie = require ("../models/Movie")
 

router.get("/movies", (req, res) => {
  
  Movie.find()
  .populate('cast')
  .then(moviesFromDB => {
    Celebrity.find()
    .then(celebsFromDB => {
      res.render("movies/index.hbs", {moviesFromDB, celebsFromDB}); 
    })
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
   const {name, genre, plot, cast} = req.body;
    console.log('WE ARE HERE =======>', req.body)
    Movie.create({
    name,
    genre,
    plot,
    cast
   })
    .then(() => {
        res.redirect(`/movies`)
    })
  .catch(err => console.log(err))
}) 

router.get('/movies/:id', (req, res) => {
  const celebId = req.params.id;
  // get the book with this id
  // we need to call populate to replace the id of the author in the 'author' field
  // with all the information from the author model
  Celebrity.findById(celebId)
    .populate('cast')
    .then(celeb => {
      console.log(book);
      // render a book details view
      res.render('memberCast', { memberCast : celeb });
    })
})
module.exports = router;