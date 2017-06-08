const HttpError = require('../http-error');

module.exports = (req, res, next) => {
  if (!req.user) return next(new HttpError(403));
  return next();
};
