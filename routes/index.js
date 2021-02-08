const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model.js')
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
  .then(celebritiesList => {
      res.render('celebrities', {celebrities: celebritiesList} )
  })
  .catch(error => {
      console.log('Error while getting the celebrities from the DB: ', error)
      next(error)
  })
});

module.exports = router;
