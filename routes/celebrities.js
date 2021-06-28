const router = require("express").Router();
// ../ to go up one folder
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
  // display all celebrities which are retrieved from MongoDB
  Celebrity.find()
  .then(allCelebrities => {
    // do I need to declare a const here?
    // How to do the below? 
    // Pass the array of celebrities into the view as a variable.
    console.log(allCelebrities);
    res.render('celebrities/index', {celebrities: allCelebrities});
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;
