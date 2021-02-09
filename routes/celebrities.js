const router = require("express").Router();
const Celebrity = require ("../models/Celebrity")


router.get("/celebrities", (req, res) => {
  Celebrity.find().then(celebsFromDB => {
         res.render("celebrities/index", {listCelebs: celebsFromDB}); 
         // console.log("This is my list of celebrities:",celebsFromDB);
   })
   .catch(err => {
     console.log(err)
   }) 
   //console.log("hello")
});

router.get("/celebrities/new", (req, res) => {
  console.log("HELLOO")
  res.render("celebrities/new"); 
 });

router.get("/celebrities/:id", (req, res) => {
  const movieId = req.params.id
  Celebrity.findById(movieId).then(celebsFromDB => {
         res.render("celebrities/show", {listCelebs: celebsFromDB}); 
         // console.log("This is my list of celebrities:",celebsFromDB);
   })
   .catch(err => {
     console.log(err)
   }) 
   // console.log("hello")
});


router.post('/celebrities', (req, res) => {
  // console.log(req.body);
/*   const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase; */

  const {name, occupation, catchPhrase} = req.body;
  console.log(name, occupation, catchPhrase);
  Celebrity.create({
    name,
    occupation,
    catchPhrase,
   })
    .then(() => {
        res.redirect(`/celebrities`)
      // res.render('bookDetails', { bookDetails: book });
    })
  .catch(err => console.log(err))
}) 

router.post('/celebrities/:id/delete', (req, res) => {
  const movieId = req.params.id;
  Celebrity.findByIdAndDelete(movieId).then(celebsFromDB => {
    res.redirect("/celebrities"); 
  })
  .catch(err => {
    console.log(err)
  }) 
  // console.log("hello")
});



module.exports = router;