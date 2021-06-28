const router = require("express").Router();

const Celebrity = require('../models/celebrity');

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then(celebsFromDB => {
      res.render("/celebrities/index", { celebList: celebsFromDB });
      console.log(celebList)
    })
    .catch(err => {
      console.log(err)
    })
});

router.get("/celebrities/:id", (req, res, next) => {
  console.log(req.params.id);
  const celebId = req.params.id;
  Celebrity.findById(celebId)
    .then(celebFromDB => {
      console.log(celebFromDB);
      res.render("celebrities/show", { celebDetails: celebFromDB})
    })
    .catch(err => {
			console.log(err);
		})
});

router.get("/celebrities/new", (req, res, next) => {
    res.render('new');
})

router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(name, occupation, catchPhrase);
  Celebrity.create({
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase
  })
      .then(newCeleb => {
        console.log(`Celeb created: ${newCeleb}`);
        res.redirect(`celebrities/${newCeleb._id}`)
      })
      .catch(() => {
        res.render("celebrities/new")
      });
})

router.get("celebrities/delete/:id", (req, res, next) => {
  const celebId = req.params.id;
  Celebrity.findByIdAndDelete(celebId)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.log(err)
    })

})

module.exports = router;
