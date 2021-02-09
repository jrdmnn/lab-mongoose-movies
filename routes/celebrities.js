const router = require("express").Router();
const Celebrity = require ("../models/celebrity")


router.get("/celebrities", (req, res) => {
  Celebrity.find().then(celebsFromDB => {
         res.render("celebrities/index", {listCelebs: celebsFromDB}); 
         console.log("This is my list of celebrities:",celebsFromDB);
   })
   .catch(err => {
     console.log(err)
   }) 
   console.log("hello")
});


router.get("/celebrities/:id", (req, res) => {
  const movieId = req.params.id
  Celebrity.findById(movieId).then(celebsFromDB => {
         res.render("celebrities/show", {listCelebs: celebsFromDB}); 
         console.log("This is my list of celebrities:",celebsFromDB);
   })
   .catch(err => {
     console.log(err)
   }) 
   console.log("hello")
});

router.get("/celebrities/new", (req, res) => {
  res.render("celebrities/new", {listCelebs: celebsFromDB}); 
 });


 router.post('/celebrities', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;
  console.log(name, occupation, catchPhrase);
  Book.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
   })
    .then(book => {
      console.log('this celebrity was just added: ', Celebrity);
      res.redirect(`/celebrities/${Celebrity._id}`)
      // res.render('bookDetails', { bookDetails: book });
    })
})

module.exports = router;