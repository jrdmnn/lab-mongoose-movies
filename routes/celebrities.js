const router = require("express").Router();
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

module.exports = router; 