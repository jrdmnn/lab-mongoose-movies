const router = require('express').Router();
const Celebrity = require('../models/Celebrity');


//////////////// Display the names of celebrities //////////////////////////
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then(celebrity => {
    res.render('celebrities', {celebrity});
  })
  .catch(err => {
    next(err);
  })
})
/////////////////// Adding a new celebrity - Have to add it before id! /////////////////////////////
router.get('/celebrities/new', (req, res) => {
  res.render('new')
 })

router.post('/celebrities', (req, res, next) =>{
  console.log(req.body);
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
  .then(newCeleb => {
    res.redirect(`/celebrities/${newCeleb._id}`);
  })
  .catch(err => {
    next(err)
  })
})

/////////////////// Deleting a celebrity /////////////////////////////
router.get('/celebrities/delete/:id', (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/celebrities');
  })
  .catch(err =>
    next(err))
})

/////////////////// Editing a celebrity /////////////////////////////
router.get('/celebrities/edit/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then(celebrity => {
    res.render('edit', {celebrity})
  })
  .catch(err => {
    next(err);
  })
})

router.post('/celebrities/edit/:id', (req, res, next) => {
  const celebId = req.params.id
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.findByIdAndUpdate(celebId, 
    {
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase
    })
  .then(() => {
    res.redirect(`/celebrities`)
  })
  .catch(err =>
    next(err));
})

/////////////// See the details of the celebrities ////////////////////////
router.get('/celebrities/:id', (req,res, next) => {
  Celebrity.findById(req.params.id)
  .then(celebrity => {
    res.render('celeb-details', {celebrity})
  })
  .catch(err =>{
    next(err);
  })
})



module.exports = router;