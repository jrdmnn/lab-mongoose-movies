const express = require("express");
const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");
const router = express.Router();

router.get("/", (req, res, next) => {
 
  Movie.find()
    .populate('cast')
    .then(movies => {
      console.log(movies);
      res.render("movies/index", {movies})
    })
})

router.get("/new", (req, res, next) => {
  Celebrity.find()
    .then(celebrities => res.render("movies/new", {celebrities}))
    .catch(error => next(error))
  })


router.post("/", (req, res, next) => {
  const formData = req.body;
  console.log(formData);
  Movie.create({title:formData.title, genre: formData.genre, plot: formData.plot, cast: formData.cast})
    .then(res.redirect("/movies/"))
    .catch(() => res.redirect("/"))
})


router.get("/:id", (req,res, next) => {
  Movie.findById(req.params.id)
  .then(movie => {
    res.render("movies/edit.hbs", {movie})
  })
  .catch((error => next(error)))
})

router.post("/:id/edit", (req, res, next)=> {
  console.log('editing');
  const {title, genre, plot} = req.body;
  Movie.findByIdAndUpdate(req.params.id, {title, genre, plot}, {new:true})
    .then(res.redirect("/movies/"))

}) 

module.exports = router;
