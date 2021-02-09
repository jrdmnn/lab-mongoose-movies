const Celebrity = require('../models/Celebrity');

exports.getAllCelebrities = async (req, res, next) => {
  const celebrities = await Celebrity.find();
  if (!celebrities) return next(new Error('🚨 No Celebrities found 🚨'));
  res.render('celebrities/getAllCelebrities', { celebrities });
};

exports.getCelebrity = async (req, res, next) => {
  const celebrity = await Celebrity.findById(req.params.id);
  if (!celebrity) return next(new Error('🚨 No Celebrity found 🚨'));
  res.render('celebrities/getCelebrity', { celebrity });
};

exports.showCreateCelebrityForm = (req, res, next) => {
  res.render('celebrities/createNewCelebrityForm');
};

exports.createCelebrity = async (req, res, next) => {
  const newCelebrity = await Celebrity.create(req.body);
  res.redirect(`/celebrities/${newCelebrity.id}`);
};

exports.deleteCelebrity = async (req, res, next) => {
  await Celebrity.findByIdAndRemove(req.params.id);
  res.redirect(`/`);
};

exports.showEditCelebrityForm = async (req, res, next) => {
  const celebrity = await Celebrity.findById(req.params.id);
  res.render('celebrities/editCelebrityForm', { celebrity });
};

exports.editCelebrity = async (req, res, next) => {
  await Celebrity.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/celebrities/${req.params.id}`);
};
