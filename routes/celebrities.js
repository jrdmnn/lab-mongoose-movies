const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
  // get all the celebrities from the database -> find() returns all the documents
  Celebrity.find().then(celebritiesFromDB => {
    console.log("this is the response",celebritiesFromDB);
    // render a books view to display them
    res.render('celebrities/index', { celebritiesList: celebritiesFromDB })
  }).catch(err => {
    console.log(err);
  })
})

module.exports = router;