const router = require("express").Router();
const Celebrity = require("../models/celebrity");
const Movie = require("../models/movie");

router.get("/movies", (req, res, next) => {
  Movie.find()
  .then(moviesFromDB => res.render("movies/index", {moviesFromDB}))
  .catch(error => {
    console.log("Error while getting the movies from the DB: ", error);
    next();
  });
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
  .then(moviesFromDB => { res.render("movies/show", {moviesDetails: moviesFromDB});
  })
  .catch(error => {
    console.log("Error while getting the movies from the DB: ", error);
    next();
  });
});

router.get("/movies/new", (req, res, next) => {
  res.render("movies/new");
});

router.post("/movies", (req, res) => {
  const { title, genre, plot, cast } = req.body; 

  const newMovie = new Movie({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  });
  
  newMovie.save()
  .then(movie => { res.redirect("/movies")
  })
  .catch(error => {
    console.log("Error while saving a movie: ", error);
    res.render("movies/new");
  });
});

router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
  .then(() => {res.redirect("/movies")})
  .catch(error => {
    console.log(error);
    next();
     });
});

router.get("/movies/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
  .then(moviefromDB => {res.render("movies/edit", {movie: moviefromDB}) 
  })
  .catch(error => {
    console.log("Error while getting a movie by its ID: ", error);
    next();
  });
});

router.post("/movies/:id", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.updateOne({_id: req.params.id}, {title: title, genre: genre, plot: plot, cast: cast})
  .then(arg => {
    console.log("Number of movie elements modified: ", arg.num);
    res.redirect('/movies')
  }).catch(error => {
    console.log('Error while updating a movie: ', error);
    next();
  })
})

module.exports = router;
