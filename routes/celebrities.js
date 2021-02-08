const router = require("express").Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find().then(celebritiesFromDB => {
    //console.log(celebritiesFromDB);
    res.render('celebrities/index', { celebritiesList: celebritiesFromDB })
  }).catch(err => {
    console.log('Error while getting the list of all celebrities from the database: ', err);
    next();
  })
})

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id).then(celebrityfromDB => {
    //console.log(celebrityfromDB);
    res.render('celebrities/show', { celebrityDetails: celebrityfromDB})
  }).catch(err => {
    console.log('Error while getting the list of all celebrities from the database: ', err);
    next();
  })
})

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
})

router.post('/celebrities', (req, res) => {
  //console.log(req.body);
  const { name, occupation, catchPhrase } = req.body; 

  const newCeleb = new Celebrity({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })

  newCeleb.save().then(celebrity => {
    res.redirect("/celebrities");
  }).catch(err => {
    console.log('Error while saving a new celebrity: ', err);
    res.render('celebrities/new');
  })

})

module.exports = router;