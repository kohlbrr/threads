const express = require('express');
const { Review } = require('../../db/models');
const HttpError = require('../../http-error');
const { isLoggedIn } = require('../../middleware');

const router = new express.Router({ mergeParams: true });
module.exports = router;

// Create a review
router.post('/', isLoggedIn, (req, res, next) => {
  const review = Object.assign({}, req.body, { userId: req.user.id, designId: req.params.id });
  Review.create(review)
  .then(res.status(201).send.bind(res))
  .catch(() => next(new HttpError(400)));
});

// Update a review
router.put('/:reviewId', (req, res, next) => {
  Review.update(
    req.body,
    {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }
  )
  .then(review => res.status(201).send(review[1]))
  .catch((errContent) => { // !Does not account for invalid data errors
    const err = new Error(errContent);
    err.status = 400;
    next(err);
  });
});

// Delete a review
router.delete('/:reviewId', (req, res, next) => {
  Review.destroy({
    where: { id: req.params.id },
  })
  .then(wasDeleted => {
    if(!wasDeleted) res.sendStatus(404);
    else res.sendStatus(204);
  })
  .catch(next);
});
