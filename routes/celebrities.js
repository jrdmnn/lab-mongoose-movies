const router = require("express").Router();
const Celebrity = require('../models/Celebrity');
// const Name = require('../models/Name');

router.get('/', (req, res) => {
  Celebrity.find()
    .then(celebrities => res.render('celebrities/index', {celebrities}))
    .catch(error => console.log(error));

});


router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new')
})


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


router.post('/:id/delete', (req, res) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/celebrities'))
    .catch(error => console.log(error));
});


router.get('/celebrities/:id', (req, res) => {
  
  const celebrityId = req.params.id;
    Celebrity.findById(celebrityId)

    .then(celebrity => {
      console.log(celebrity);
      // render a book details view
      res.render('celebrities/celebrityDetails', { celebritiesList: celebrity });
    })
})

router.get('/celebrities/:id/editCeleb', (req, res, next) => {
  Celebrity.findById(req.params.id).then(celebrityfromDB => {
    res.render('celebrities/editCeleb', {celebrity: celebrityfromDB}) 
  }).catch(err => {
    console.log('Error while getting a celebrity by ID: ', err);
    next();
  })
})


module.exports = router;
