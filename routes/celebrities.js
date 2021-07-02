const router = require("express").Router();
const { findById, findByIdAndRemove } = require("../models/Celebrity");
// ../ to go up one folder
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
  // display all celebrities which are retrieved from MongoDB
  const {name, occupation, catchphrase} = req.body;
  Celebrity.find()
  .then(allCelebrities => {
    // do I need to declare a const here?
    // How to do the below? 
    // Pass the array of celebrities into the view as a variable.
    // console.log(allCelebrities);
    res.render('celebrities/index', {celebrities: allCelebrities});
  })
  .catch(err => {
    console.log(err)
  })
});

router.post('/celebrities', (req, res, next) => {
  // display all celebrities which are retrieved from MongoDB
  const {name, occupation, catchphrase} = req.body;
  Celebrity.create({ name, occupation, catchphrase})
  .then(() => {
    res.redirect('/celebrities')
  })
  .catch(err => {
    res.redirect('/celebrities/new')}) 
})

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new.hbs');
});

router.get('/celebrities/:id', (req, res, next) => {
  console.log(req.params.id);
  Celebrity.findById(req.params.id)
    .then(allCelebrities => {
      res.render('celebrities/show.hbs', { allCelebrities });
    })
    .catch(err => {
      next(err);
    });
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect('/celebrities')
  })
  .catch(err => {
    next(err);
  })
})

module.exports = router;
