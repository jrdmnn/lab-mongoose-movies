const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then(celebritiesFromDB => { res.render('../views/index.hbs', {celebrities: celebritiesFromDB});
  })
  .catch(error => {
    console.log('Error while getting the celebrities from the DB: ', error);
    next(error);
  });
});

