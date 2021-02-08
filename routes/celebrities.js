const router = require("express").Router();
const { route } = require(".");
const Celebrity = require('../models/celebrity'); 

//GET to the list of celebrities
router.get("/celebrities", (req, res, next) => {
  //call the celibrity model's find method
  Celebrity.find().then(firstCelebrities => {
    console.log(firstCelebrities); 
    res.render('celebrities/index', { celibritiesList : firstCelebrities })
  }).catch(err => {
    next(err);
  })
});

//GET to a specific celebrity 
router.get("/celebrities/:id", (req,res, next) => {
  const celebrityId = req.params.id; 
  Celebrity.findById(celebrityId).then(firstCelebrities => {
    res.render('celebrities/show', {celebrityDetails : firstCelebrities});
  }).catch(err => {
    next(err);
  })
});

//Locate the /celebrities/new GET route in routes/celebrities
router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new');
})

//Locate the /celebrities post route
router.post('/celebrities', (req,res) => { 
  const {name, occupation, catchPhrase} = req.body; 
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .then(celebrity => {
      console.log('this celebrities was just created', celebrity); 
      res.redirect(`/celebrities/${celebrity._id}`)
    })
   // .catch(err=> res.redirect('/celebrities/new'));
});

//Deleting Celebrity
router.get('/celebrities/delete/:id', (req, res) => {
  const celebrityId = req.params.id; 
  Celebrity.findByIdAndDelete(celebrityId)
    .then(()=> {
      res.redirect('/celebrities')
    })
    .catch(err => {
      console.log(err);
    })
})


module.exports = router 