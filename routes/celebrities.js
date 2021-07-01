const router = require("express").Router();
const { findById } = require("../models/Celebrity");
// ../ to go up one folder
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
  // display all celebrities which are retrieved from MongoDB
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
})


// router.get('celebrities/new', (req, res, next) => {
//   .then(allCelebrities => {
//     res.render('celebrities/new', {celebrities: allCelebrities});
//   }
//   .catch(err => {
//     console.log(err)
//   })
// })

router.get('celebrities/:id', (req, res, next) => {
  console.log(req.params.id);
  Celebrity.findById(req.params.id)
    .then(allCelebrities => {
      res.render('celebrities/show.hbs', { allCelebrities });
    })
    .catch(err => {
      next(err);
    });
});



module.exports = router;
