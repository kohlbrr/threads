const express = require('express');
const { Review } = require('../../db/models');
const HttpError = require('../../http-error');
const { isLoggedIn, isOwnerOfReview } = require('../../middleware');

const router = new express.Router({ mergeParams: true });
module.exports = router;

router.param('reviewId', (req, res, next, reviewId) => {
  Review.findById(reviewId)
  .then((review) => {
    if (!review) return next(new HttpError(404));
    req.review = review;
    return next();
  }).catch(() => next(new HttpError(404)));
});

// Create a review
router.post('/', isLoggedIn, (req, res, next) => {
  const review = Object.assign({}, req.body, { userId: req.user.id, designId: req.params.id });
  Review.create(review)
  .then(res.status(201).send.bind(res))
  .catch(() => next(new HttpError(400)));
});

// Update a review
router.put('/:reviewId', isLoggedIn, isOwnerOfReview, (req, res, next) => {
  req.review.update(req.body)
  .then(res.status(201).send.bind(res))
  .catch(() => next(new HttpError(400)));
});

// Delete a review
router.delete('/:reviewId', isLoggedIn, isOwnerOfReview, (req, res, next) => {
  req.review.destroy()
  .then(() => res.sendStatus(203))
  .catch(next);
});
