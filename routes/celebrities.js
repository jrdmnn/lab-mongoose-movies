const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

// Find celebrities
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

// See celebrity details
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

// Form
router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new');
});

// Update celebrity
router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((celeb) => {
            res.render('celebrities/edit', { celeb });
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

router.post('/celebrities/:id', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findByIdAndUpdate(req.params.id, {
        name,
        occupation,
        catchPhrase,
    })
        .then((celeb) => {
            res.redirect('/celebrities');
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

// Add celebrity
router.post('/celebrities', (req, res) => {
    preventDefault();
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

// Remove celebrity
router.post('/celebrities/:id/delete', (req, res, next) => {
    console.log('req.params.id', req.params.id);
    Celebrity.findByIdAndRemove(req.params.id)
        .then((celeb) => {
            console.log('This celebrity was removed', celeb);
            res.redirect(`/celebrities`);
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

module.exports = router;
