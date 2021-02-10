const express = require("express");
const router = express.Router();
const Celeb  = require("../models/celebrity.js");




// Celeb Routes
router.get('/celebrities', (req,res) => {
  Celeb.find().then((celebData)=> {
    console.log(celebData);
    res.render('celebrities/index.hbs', {celebArray: celebData})
  }).catch((error)=> {
    console.log(error)
  })
})

router.get('/celebrities/new', (req,res) => {
  res.render("celebrities/new.hbs")
})


router.post("/celebrities", (req,res)=> {
  Celeb.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchphrase:  req.body.catchphrase,
  }).then((newCeleb)=> {
    console.log('A new star has been created:', `celebrities/${newCeleb._id}`);
    res.redirect(`celebrities/${newCeleb._id}`);
  }).catch((error)=> {
      console.log(error);
  })
})

router.get('/celebrities/edit/:id', (req,res) => {
  Celeb.findById(req.params.id).then((specifcCeleb)=>{
        res.render("celebrities/edit.hbs", {celeb:specifcCeleb})
  }).catch((error)=> {
      console.log(error);
  })
})

router.post("/celebrities/:id", (req,res)=> {
  Celeb.findByIdAndDelete(req.params.id).then(()=> {
      res.redirect("/celebrities");
  }).catch((error)=> {
    console.log(error);
  })
})

router.post("/celebrities/edit/:id", (req,res)=> {
  const {name,occupation, catchphrase} = req.body  
  Celeb.findByIdAndUpdate(req.params.id, {
      name,
      occupation,
      catchphrase,
    } ).then((updatedCeleb)=>{
      console.log(updatedCeleb);
        res.redirect(`/celebrities/${updatedCeleb._id}`);
    }).catch((error)=>{
      console.log(error);
    })
})

router.get('/celebrities/:id', (req,res) => {
  Celeb.findById(req.params.id).then((celebData)=> {
    console.log(celebData);
    res.render('celebrities/show.hbs', {targetCeleb: celebData});
  }).catch((error)=>{
    console.log(error);
  })
})

module.exports = router;