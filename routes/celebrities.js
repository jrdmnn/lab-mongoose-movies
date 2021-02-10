const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
  // get all the books from the database -> find() returns all the documents
  Celebrity.find().then(celebsFromDB => {
    console.log(celebsFromDB);
    // render a celebrities view to display them
    res.render('celebrities', { celebsList: celebsFromDB })
  }).catch(err => {
    console.log(err);
  })
})

router.get('/celebrities/:id', (req, res) => {
  const celebID = req.params.id;
  Celebrity.findById(celebID)
    .then(celeb => {
      console.log("Everybody gangsta until " + celeb.name + " comes up.")
      res.render('show', {show: celeb});
    })
})

router.get('/celebrities/delete/:id', (req, res) => {
  const celebID = req.params.id;
  Celebrity.findById(celebID)
    .then(celeb => {
      console.log("Everybody gangsta until " + celeb.name + " comes up.")
      res.render('delete', {delete: celeb});
    })
})








module.exports = router;

