const HttpError = require('../http-error');

module.exports = (req, res, next) => {
  if (req.review.userId === req.user.id) return next();
  return next(new HttpError(401));
};
