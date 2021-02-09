const router = require("express").Router();
const Celebrity = require("../models/celebrity");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
  .then(celebritiesFromDB => { res.render("celebrities/index", {celebritiesList: celebritiesFromDB});
  })
  .catch(error => {
    console.log("Error while getting the celebrities from the DB: ", error);
    next();
  });
});

router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then(celebritiesFromDB => { res.render("celebrities/show", {celebritiesDetails: celebritiesFromDB});
  })
  .catch(error => {
    console.log("Error while getting the celebrities from the DB: ", error);
    next();
  });
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.post("/celebrities", (req, res) => {
  const { name, occupation, catchPhrase } = req.body; 

  const newCelebrity = new Celebrity({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  });
  
  newCelebrity.save()
  .then(celebrity => { res.redirect("/celebrities")
  })
  .catch(error => {
    console.log("Error while saving a celebrity: ", error);
    res.render("celebrities/new");
  });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
  .then(() => {res.redirect("/celebrities")})
  .catch(error => {
    console.log(error);
    next();
     });
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then(celebrityfromDB => {res.render("celebrities/edit", {celebrity: celebrityfromDB}) 
  })
  .catch(error => {
    console.log("Error while getting a celebrity by its ID: ", error);
    next();
  });
});

router.post('/celebrities/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.updateOne({_id: req.params.id}, {name: name, occupation: occupation, catchPhrase: catchPhrase})
  .then(arg => {
    console.log("Number of elements modified: ", arg.num);
    res.redirect('/celebrities')
  }).catch(error => {
    console.log('Error while updating a celebrity: ', error);
    next();
  })
})

module.exports = router;