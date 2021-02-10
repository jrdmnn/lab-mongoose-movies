const router = require("express").Router();
const Celebrity = require('../models/Celebrity');


router.get('/gone/:id', (req,res) => {
  const celebID = req.params.id;
  Celebrity.findByIdAndDelete(celebID)
    .then(() => {res.redirect('/celebrities')})
    .catch(err => console.log(err));
});


module.exports = router;