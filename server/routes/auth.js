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

function loginCallback(req, res, next) {
  return err => (err ? next(err) : req.session.save(() => res.json(req.user)));
}

router.get('/me', (req, res) => res.json(req.user));

router.post('/signup', (req, res, next) => {
  User.create(req.body)
  .then((user) => {
    req.login(user, loginCallback(req, res, next));
  })
  .catch(() => next(new HttpError(401)));
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err && !user) next(new HttpError(401));
    req.login(user, (loginErr) => {
      if (err) next(loginErr);
      res.json(user);
    });
  })(req, res, next);
});

module.exports = router;
