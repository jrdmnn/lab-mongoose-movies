const router = require("express").Router();
const {
  findById
} = require("../models/Movie");
const Movie = require("../models/Movie");

router.get('/movies/new', (req,res)=>{
  res.render('movies/new')
})

module.exports = router;