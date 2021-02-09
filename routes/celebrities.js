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
  res.render('celebrities/new', { CelList4: celebFromDB });
})


router.post('/celebrities', (req, res) => {
  console.log(req.body)
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  }) 
  .then(celeb => res.redirect('/celebrities'))
  .catch(err=> console.log(err))
     
})

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



module.exports = router;
