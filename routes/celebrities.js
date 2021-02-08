const router = require("express").Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res) => {
  Celebrity.find().then(body => {
    console.log(body);
    res.render('/celebrities/index', {body})
  }).catch(err => {
    console.log(err);
  })
})


module.exports = router;