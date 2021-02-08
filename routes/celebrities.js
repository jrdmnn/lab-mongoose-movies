const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
  Celebrity.find().then(celebrities => {
    console.log(celebrities)
    res.render('celebrities/index', { allCelebrities: celebrities})
  }).catch(err => {
    console.log(err)
  })
})

router.post('/celebrities', (req,res) => {
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
  .then(celebrity => {
      res.redirect('/celebrities')
  })
  .catch(err => {
    res.render('celebrities/new')
  })
})

router.get('/celebrities/:id/edit', (req, res) => {
  let celebrityId = req.params.id
  Celebrity.findById(celebrityId)
  .then(celebrity => {
    res.render('celebrities/edit', {allCelebrities: celebrity})
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/celebrities/:id/edit', (req, res) => {
  let editId = req.params.id
  console.log(editId)
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.findByIdAndUpdate(editId, {
    name: name,
    occupation: occupation,
    catchPhrase:catchPhrase
  })
  .then(celebrity => {
      res.redirect('/celebrities') 
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/celebrities/:id/delete', (req, res) => {
  const deleteId = req.body.id
  console.log(deleteId)
  Celebrity.findByIdAndRemove(deleteId)
  .then(() => {
    res.redirect('/celebrities')
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new')
})

router.get('/celebrities/:id', (req,res) => {
  let celebrityId = req.params.id
  Celebrity.findById(celebrityId)
  .then(celebrity=> {
    res.render('celebrities/show', { celebritiesDetails : celebrity})
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;