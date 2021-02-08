const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((celebs) => {
            console.log('celebrities', celebs);
            res.render('celebrities/index', { celebList: celebs });
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});
router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((celeb) => {
            res.render('celebrities/show', { celeb });
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new');
});

router.post('/celebrities', (req, res) => {
    // preventDefault();
    const { name, occupation, catchPhrase } = req.body;
    console.log('req.body', req.body);
    Celebrity.create({
        name,
        occupation,
        catchPhrase,
    })
        .then((celeb) => {
            console.log('This celebrity was added', celeb);
            res.redirect(`/celebrities`);
        })
        .catch((err) => {
            console.log(err);
            res.redirect(`/celebrities/new`);
        });
});

router.post('celebrities/:id/delete', (req, res) => {
    console.log('req.params.id', req.params.id);
    // Celebrity.findByIdAndRemove(req.params.id)
});

module.exports = router;
