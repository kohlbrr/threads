const router = require('express').Router();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../db/models');
const HttpError = require('../http-error');

passport.use(new LocalStrategy((email, password, done) => {
  User.findOne({ where: { email } })
  .then((user) => {
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }).catch(done);
}));

passport.serializeUser((user, done) => done(null, user.id));


passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => done(null, user))
  .catch(done);
});

router.get('/me', (req, res) => res.json(req.user))

router.post('/signup', (req, res, next) => {
  User.create(req.body)
  .then((user) => {
    req.logIn(user, err => err ?  next(err) : req.session.save(() => res.status(201).json(user)));
  })
  .catch(() => next(new HttpError(401)));
});


module.exports = router;
