const HttpError = require('../http-error');

module.exports = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) return next(new HttpError(401));
  return next();
};
