
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities', {celebList: celebrities})
    })
    .catch(err => {
      next(err);
    })  
});

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new', {})
})

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity
  .create({name, occupation, catchPhrase})
  // .save() //why do we not have to use the save method, as apposed to what the excersize said
  .then(() => res.redirect('celebrities'))
  .catch(err => res.render('celebrities/new')) 
})

router.post('/celebrities/:id/delete', (req, res, next) => {
  const celebId = req.params.id;
  console.log(req.params);
  Celebrity.findByIdAndRemove(celebId)
  .then(() => res.redirect('/celebrities'))
  .catch(err => {next(err);})  
})

router.get('/celebrities/:id', (req, res, next) =>{
  const celebId = req.params.id;
  Celebrity.findById(celebId)
    .then(celeb => {
      res.render('celebrities/show', {celebDetails: celeb})
    })
    .catch(err => {
      next(err);
    })
})

module.exports = router;
//Q0. When creating a route. what is the minimal thing you have to do to get a console.log a routes GET request to work
//Q1. why do we export the router on every page? What does it do exactly
//Q2 in the render object, what is the first and the alst again?