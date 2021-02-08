const router = require("express").Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find().then(body => {
    //console.log(body);
    res.render('celebrities/index', {body})
  }).catch(err => {
    console.log(err);
  })
})

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById (req.params.id).then(body => {
    //console.log(body);
    res.render('celebrities/show', {body})
  }).catch(err => {
    console.log(err);
  })
})

router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
})


router.post('/celebrities', (req, res, next) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhras = req.body.catchPhras;
  console.log(name, occupation, catchPhras);
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhras: catchPhras
  })
  .then(() => {
    res.redirect("celebrities");
  })
  .catch(() => {
    res.render("celebrities/new");
  });
})

router.post('/celebrities/:id/delete', (req, res, next) => {
  //console.log(req.params.id)
  Celebrity.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect("/celebrities")
  })
  .catch(err => {
    console.log(err);
  })
  
})

module.exports = router;