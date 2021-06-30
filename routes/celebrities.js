const express = require('express');
const router = require("express").Router();

const Celebrity = require('../models/celebrity');

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then(celebsFromDB => {
      res.render("celebrities/index.hbs", { celebList: celebsFromDB });
      console.log(celebList)
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('movies/new', (req, res, next) => {
  Celebrity.find()
    .then(celebsFromDB => {
      res.render('movies/new,hbs', {celebrities: celebsFromDB});
    })
    .catch(err => {
      console.log(err)
    })
})
router.get("/new", (req, res, next) => {
  res.render('celebrities/new.hbs');
});

router.get("/:id", (req, res, next) => {
  //console.log(req.params.id);
  Celebrity.findById(req.params.id)
    .then(celebFromDB => {
      console.log(celebFromDB);
      res.render("celebrities/show.hbs", { celebDetails: celebFromDB})
    })
    .catch(err => {
			console.log(err);
		})
});


router.post("/", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  //console.log(name, occupation, catchPhrase);
  Celebrity.create({
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase
  })
      .then(newCeleb => {
        //console.log(`Celeb created: ${newCeleb}`);
        res.redirect(`/celebrities`)
      })
      .catch(err => {
        console.log(err);
      })
});

router.post('/:id', (req, res, next) => {
  console.log(req.body);
  const { celebrityname, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, { name: celebrityname, occupation: occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/:id/delete", (req, res, next) => {
  const celebId = req.params.id;
  Celebrity.findOneAndDelete(celebId)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.log(err)
    })

});

router.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;
