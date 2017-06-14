const router = require('express').Router();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../db/models');
const HttpError = require('../http-error');

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
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

router.get('/me', (req, res, next) => {
  req.user ? res.json(req.user) : next(new HttpError(401));
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
  .then((user) => {
    req.login(user, err => (err ? next(err) : res.json(req.user)));
  })
  .catch(() => next(new HttpError(401)));
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, mes) => {
    if (err && !user) next(new HttpError(401));
    req.login(user, (loginErr) => {
      if (err) next(new HttpError(401, loginErr));
      user ? res.json(user) : next(new HttpError(401, mes));
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(201);
})

module.exports = router;
