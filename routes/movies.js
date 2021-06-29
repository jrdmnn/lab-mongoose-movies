const router = require("express").Router();

const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get("/movies", (req, res, next) => {

  Movie.find()
    .populate('cast')
		.then(moviesFromDB => {
			console.log(moviesFromDB);
			res.render('movies/index', { moviesFromDB, title: 'Movies' });
		})
		.catch(err => {
			console.log(err)
		})
});

router.get("/movies/new", (req, res, next) => {
// we need to get all the celebrities and pass them into the view
Celebrity.find()
.then(celebritiesFromDB => {
  console.log(celebritiesFromDB);
  res.render('movies/new', { celebrities: celebritiesFromDB, title: 'Add movie' });
})
.catch(err => {
  console.log(err);
})
});

router.post("/movies", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title,
    genre,
    plot,
    cast
  })
	.then(movie => {
    console.log(`Success! Added ${movie} to the database`);
    res.redirect('/movies');
	})
	.catch(err => {
		console.log(err);
    res.render('movies/new', { title: 'Add movie' });
	})
});

module.exports = router;