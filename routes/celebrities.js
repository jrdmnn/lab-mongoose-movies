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


module.exports = router;