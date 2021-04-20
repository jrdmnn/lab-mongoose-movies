const router = require("express").Router();
const Movie = require("../models/Movie");


router.get("/movies", (req, res, next) => {
  res.render("movies/new");
});

module.exports = router;