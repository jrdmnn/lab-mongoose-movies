const router = require("express").Router();
let Celebrity = require("../models/celebrity.model");

router.route("/").get((req, res) => {
  Celebrity.find()
    .then((celeb) => res.render("celebrities/index", { celebrity: celeb }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Celebrity.findById(req.params.id)
    .then((celeb) => res.render("celebrities/show", { celebrity: celeb }))
    .catch((err) => next(err));
});

router.get("/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.route("/").post((req, res, next) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;

  const newCelebrity = new Celebrity({
    name,
    occupation,
    catchPhrase,
  });

  newCelebrity
    .save()
    .then(() => {
      console.log("Celebrity added");
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("celebrity deleted");
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
