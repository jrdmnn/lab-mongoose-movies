const router = require("express").Router();
const Movie = require('../models/Movie');
const Celebrity = require("../models/Celebrity");

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/index', { celebrities });
    }).catch(err => {
      next(err);
    })
})

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .then(celebrity => {
      console.log(`${celebrity.name} has been added to the database`);
      res.redirect('/celebrities/');
    })
    .catch(err => {
      res.render('celebrities/new')
    })
})

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
})

router.post('/celebrities/:id/delete', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findByIdAndRemove(celebrityId)
  .then(() => {
    console.log('A celebrity has been deleted from the database');
    res.redirect('/celebrities');
  })
  .catch(err => {
    next(err);
  })
})

router.get('/celebrities/:id/edit', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
  .then((celebrity) => {
    res.render('celebrities/edit', {celebrity})
  })
  .catch(err => {
    next(err);
  })
})

router.post('/celebrities/:id', (req,res,next) => {
  let {name, occupation, catchPhrase} = req.body;
  Celebrity.findByIdAndUpdate((req.params.id), {
    name,
    occupation,
    catchPhrase
  })
  .then((celebrity) => {
    console.log(`The data for "${celebrity.name}" has been updated`);
    res.redirect('/celebrities');
  })
  .catch(err =>
    next(err));
})

router.get('/celebrities/:id', (req,res,next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
  .then(celebrity => {
    res.render('celebrities/show', {celebrity});
  })
  .catch(err => {
    next(err);
  })
})

module.exports = router;