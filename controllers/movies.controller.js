const Movie = require('../models/movie.model');
const Celebrity = require('../models/celebrity.model');

module.exports.list = (req, res, next) => {
  Movie.find()
    .then((movies) => res.render('movies/list', { movies }))
    .catch(err => next(err))
}

module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => res.render('movies/form', { movie: new Movie(), celebrities }));
}

module.exports.doCreate = (req, res, next) => {
  const movie = new Movie(req.body);

  movie.save()
    .then(() => { res.redirect('/movies' )});
}

module.exports.doEdit = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      movie.set(req.body);

      movie.save()
        .then(() => { res.redirect('/movies' )});
    })
}

module.exports.edit = (req, res, next) => {
  Promise.all([
    Celebrity.find(),
    Movie.findById(req.params.id)
  ])
  .then((results) => {
    const celebrities = results[0];
    const movie = results[1]

    res.render('movies/form', { movie, celebrities })
  })
}

module.exports.get = (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('celebrity')
    .then(movie => res.render('movies/detail', {movie}));
}

module.exports.delete = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/movies'));
}
