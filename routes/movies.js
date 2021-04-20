const router = require("express").Router();
const Celebrity = require("../models/Celebrity");
const {
  findById
} = require("../models/Movie");
const Movie = require("../models/Movie");

router.get('/movies/new', (req,res,next)=>{
  Celebrity.find()
  .then(celebsInDb => {
    res.render('movies/new', {celebrities : celebsInDb});
  })
  .catch(err=>{
    next(err);
  })
})

module.exports = router;