const Movie = require('../models/movie.model');

module.exports.list = (req, res, next) => {
  Movie.find()
    .then( movies => res.render('movies/list', { movies }))
    .catch(err => next(err))
}

module.exports.create = (req, res, next) => {
  res.render('movies/create');
}

module.exports.doCreate = (req, res, next) => {
  const movie = new Movie(req.body);

  movie.save()
    .then((movie) => { res.redirect('/movies' )});
}

module.exports.get = (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => res.render('movies/detail', { movie }));
}

module.exports.delete = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(movie => res.redirect('/movies'));
}