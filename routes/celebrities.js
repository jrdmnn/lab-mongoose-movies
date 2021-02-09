const router = require("express").Router();
const Celebrity = require('../models/Celebrity')

router.get("/celebrities", (req, res, next) => {
  Celebrity.find().then(CelebsFromDB => {
    // console.log(CelebsFromDB)
    res.render("celebrities/index", { CelList : CelebsFromDB });
  }).catch(err => {
    console.log(err);
  })
});

router.get('/celebrities/new', (req, res) => {
  Celebrity.find().then(celebFromDB => {
  res.render('celebrities/new', { CelList4: celebFromDB });
 })
});


router.get('/celebrities/:id', (req, res) => {
  const celebId = req.params.id;
  Celebrity.findById(celebId)
  .then(celebFromDB => {
    
    res.render('celebrities/show', { CelList2: celebFromDB });
  })
  .catch(err => {
    console.log(err);
  })
})


router.post('/celebrities', (req, res) => {
  console.log(req.body)
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  }) 
  .then(celeb => {
    console.log('This celeb was added: ', celeb);
    res.redirect(`/celebrities`)
 })
 .catch(err=> console.log(err)) 
})


router.post('/celebrities/:id/delete', (req, res) => {
  const celebId = req.params.id;
  Celebrity.findByIdAndDelete(celebId)
  .then(celebsFDB => {
    
    res.redirect(`/celebrities`)
  })
  .catch(err => console.log(err))
})



module.exports = router;
