const router = require("express").Router();
const { json } = require("express");
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
  Celebrity.find().then(celebritiesFromDB => {
  //  res.json(celebritiesFromDB);
    res.render('./celebrities/index', {celebritiesList: celebritiesFromDB})
  }).catch(err => {
    next();
    console.log(err);
  })
})

router.get('/celebrities/new', (req,res) => {
  Celebrity.find().then(celebritiesFromDB => {
    res.render('./celebrities/new')
  }).catch(err => {
    next();
    console.log(err);
  })
})

router.get('/celebrities/:id', (req,res) => {
  Celebrity.findById(req.params.id)
  .then(celebrityFromDB => {
    console.log(celebrityFromDB)
    res.render('./celebrities/show', {celebrity: celebrityFromDB})
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/celebrities', (req,res)=> {
  const { name, occupation, catchPhrase } = req.body
  console.log(name, occupation, catchPhrase);
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
  .then(celebrity => {
    console.log('this celebrity was just added: ', celebrity);
    res.redirect(`/celebrities/${celebrity._id}`)
  })
})

router.post('/celebrities/:id/delete', (req,res) => {
  Celebrity.findByIdAndRemove(req.params.id)
  .then(() => {
    console.log(req.params)
    res.redirect('/celebrities')
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;