const router = require("express").Router();
const { findById } = require("../models/Celebrity");
const Celebrity = require("../models/Celebrity");

router.get('/celebrities', (req,res,next)=>{
  Celebrity.find()
  .then(celebrities => {
    console.log(celebrities);
    res.render('celebrities/index', {celebList: celebrities});
  })
  .catch(err=>{
    next(err); 
  })
});

router.get('/celebrities/:id',(req,res,next)=>{
  console.log(req.params.id);
  const celebId = req.params.id;
  Celebrity.findById(celebId)
  .then(celeb => {
    console.log("okay",celeb);
    res.render('celebrities/show', {celebInfo : celeb})
  })
  .catch(err=>{
    next(err);
  })  
})

module.exports = router; 