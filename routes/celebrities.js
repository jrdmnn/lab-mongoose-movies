const router = require("express").Router();

const { get } = require(".");
const Celebrity = require("../models/Celebrity")

router.get('/celebrities', (req, res) => {
  Celebrity.find().then(celebritiesFromDb => {
    console.log(celebritiesFromDb);
    res.render('celebrities/index', { celebrityList: celebritiesFromDb })
  }).catch(err => {
    console.log("err");
  })
})


router.post('/celebrities/new', (req, res) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then(Celebrity => {
      console.log('this Celebrity was just created: ', Celebrity);
      res.redirect(`/Celebrity/${celebrity._id}`)
      res.render('celebrities/new', { CreatedCelebrity: Celebrity });
    })
})


router.get('/celebrities/:id', (req, res) => {
  console.log("Hier is our consol from celebrities/:id  🤡", req.params)
  const celebrityID = req.params.id;
  Celebrity.findById(celebrityID).then(clickedCelebrity => {
    console.log(clickedCelebrity);
    res.render('celebrities/show', { oneCelebrity: clickedCelebrity })
  }).catch(err => {
    console.log("err");
  })
})

router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new');
})



module.exports = router;

