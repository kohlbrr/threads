const express = require('express');
const router = new express.Router();
const { Category } = require('../../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Category.findAll()
  .then(categories => res.json(categories))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Category.create(req.body)
  .then(category => res.status(201).send(category))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  Category.update(
    req.body,
    {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    })
  .then(category => res.status(201).send(category[1]))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Category.findById(req.params.id)
  .then(category => res.send(category))
  .catch(next);
});
