const router = require("express").Router();
const Celebrity = require('../models/Celebrity');


router.get('/delete/:id', (req,res) => {
  const celebID = req.params.id;
  Celebrity.findById(celebID)
    .then(celeb => {
      console.log("Everybody gangsta until " + celeb.name + " comes up.")
      res.render('delete', {show: celeb});
    })
})

/* router.post('/gone/:id', (req,res) => {
  const celebID = req.params.id;
  Celebrity.findByIdAndDelete()
    .then(() => {res.redirect('/celebrities')})
    .catch(err => console.log(err));
});; */


/* router.get('/delete/:id', (req, res) => {
  const celebID = req.params.id;
  Celebrity.findByIdAndDelete()
    .then(() => res.redirect('/celebrities'))
    .catch(err => console.log(err));
}) */





module.exports = router;