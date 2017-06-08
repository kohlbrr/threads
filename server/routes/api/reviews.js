const express = require('express');
const router = new express.Router();
const { Review } = require('../../db/models');
module.exports = router;

// !Needs to be validated and hardened for sec purposes

// Get all reviews for a design
router.get('/:designId', (req, res, next) => {
  Review.findAll({
    where: { designId: req.params.designId }
  })
  .then(reviews => {
    if(reviews.length === 0) res.sendStatus(404);
    else res.send(reviews);
  })
  .catch(next);
});

// Get all reviews for a user
router.get('/user/:userId', (req, res, next) => {
  Review.findAll({
    where: { userId: req.params.userId }
  })
  .then(reviews => {
    if(reviews.length === 0) res.sendStatus(404);
    else res.send(reviews);
  })
  .catch(next);
});

// Create a review
router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(review => {
    res.status(201).send(review);
  })
  .catch(next);
});

// Update a review
router.put('/:id', (req, res, next) => {
  Review.update(
    req.body,
    {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }
  )
  .then(review => res.status(201).send(review[1]))
  .catch(next);
});

// Delete a review
router.delete('/:id', (req, res, next) => {
  Review.destroy({
    where: { id: req.params.id }
  })
  .then(wasDeleted => {
    if(!wasDeleted) res.sendStatus(404);
    else res.sendStatus(204);
  })
  .catch(next);
});
