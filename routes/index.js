const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* module exports can be a object to
module.exports = {
  greetFunction = great, 
  goodByeFunction = goodbye, 
} */
module.exports = router;
