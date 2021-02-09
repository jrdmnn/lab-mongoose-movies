const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log('rendering index');
  res.render("index");
});

module.exports = router;
