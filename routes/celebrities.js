const router = require("express").Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res, next) => {
  console.log("I am celebrity!");
  Celebrity.find()
    .then((celebrities) => {
      console.log(celebrities);
      res.render("celebrities/index", { celebrities });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  console.log(req.params.id);
  const celebrityId = req.params.id;

  Celebrity.findById(celebrityId)
    .then((celebrity) => {
      console.log("celebrities here");
      res.render("celebrities/show", { celebrity });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/celebrities", (req, res) => {
  // retrieve the fields from the request body
  console.log(req.body);
  let { name, occupation, catchPhrase } = req.body;

  // create a new document in the database
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: phrase,
  })

    .then((celebrity) => {
      console.log(`This celebrity was just created ${celebrity.name}`);
      res.redirect("/celebrities");
    })

    .catch((err) => {
      res.redirect("/celebrities/new");
    });
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

module.exports = router;
