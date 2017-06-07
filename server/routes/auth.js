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

router.post('/signup', (req, res, next) => {
  User.create(req.body)
  .then((user) => {
    console.log(user);
    passport.authenticate('local')(req, res, () => res.redirect('/'));
  })
  .catch(() => next(new HttpError(400)));
});


module.exports = router;
