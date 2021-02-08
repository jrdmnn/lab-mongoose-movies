const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

// Find celebrities
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((resp) => {
            console.log('celebrities', resp);
            res.render('celebrities/index', { resp });
        })
        .catch((err) => {
            next(err);
        });
});

// See celebrity details
router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((resp) => {
            res.render('celebrities/show', { resp });
        })
        .catch((err) => {
            next(err);
        });
});

// Form
router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new');
});

// Update celebrity
router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((resp) => {
            res.render('celebrities/edit', { resp });
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/celebrities/:id', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findByIdAndUpdate(req.params.id, {
        name,
        occupation,
        catchPhrase,
    })
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((err) => {
            next(err);
        });
});

// Add celebrity
router.post('/celebrities', (req, res) => {
    preventDefault();
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({
        name,
        occupation,
        catchPhrase,
    })
        .then((resp) => {
            console.log('This celebrity was added', resp);
            res.redirect(`/celebrities`);
        })
        .catch((err) => {
            console.log(err);
            res.redirect(`/celebrities/new`);
        });
});

// Remove celebrity
router.post('/celebrities/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndRemove(req.params.id)
        .then((resp) => {
            console.log('This celebrity was removed', resp);
            res.redirect(`/celebrities`);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
