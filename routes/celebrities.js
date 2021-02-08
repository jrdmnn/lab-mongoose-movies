const router = require("express").Router();
const Celebrity = require ("../models/celebrity")


router.get("/celebrities", (req, res) => {
  Celebrity.findById("6021746bf10e8f5f649c342e").then(celebsFromDB => {
         /* res.render("celebrities/index", {listCelebs: celebsFromDB});  */
         console.log("This is my list of celebrities:",celebsFromDB);
   })
   .catch(err => {
     console.log(err)
   }) 
   console.log("hello")
});




module.exports = router;