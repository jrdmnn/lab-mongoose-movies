const express = require("express");
const Celebrity = require("../models/Celebrity");
const router = express.Router();



router.get("/", (req, res, next) => {
  // console.log('hello world');
  
  Celebrity.find()
  .then(celebrityData => {
    // console.log(celebrityData);
    
    res.render("celebrities/index",{celebrityData});

  })
  .catch(error => {
    console.log(error);
    next(error);
  })
});

router.post("/", (req, res, next) => {

  Celebrity.create({name: req.body.name, occupation: req.body.occupation, catchPhrase: req.body.catchPhrase})
    .then(celeb => {
      console.log(celeb);
      res.redirect("/celebrities")

    })
    .catch(() => {
      res.render("celebrities/new")
    })
})

router.get("/new", (req, res) => res.render("celebrities/new"))


router.post("/:id/delete", (req, res, next)=> {
  console.log('deleting a celeb');
  
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/celebrities")
      console.log('celeb removed')
    })
    .catch(error => next(error))
})

router.get("/:celebId", (req, res, next) => {
  console.log('hey');
  
  Celebrity.findById(req.params.celebId)
    .then(celeb => {
      console.log(celeb);
      res.render("celebrities/show", {celeb})
    })
    .catch(error => {
      console.log(error);
      next(error)
    })
})






module.exports = router;
