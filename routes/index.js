//const router = require("express").Router();
const express = require("express");
const router = express.Router()

/* GET home page */
router.get("/", (req, res, next) => {
  console.log("TEEEEEST")
  res.render("index");
});

module.exports = router;
