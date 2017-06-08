const express = require('express');
const { Category, Design } = require('../../db/models');
const { isAdmin } = require('../../middleware');
const HttpError = require('../../http-error');

const router = new express.Router();
module.exports = router;

router.param('id', (req, res, next, id) => {
  Category.findById(id, {
    include: [{
      model: Design,
    }],
  })
  .then((category) => {
    if (!category) return next(new HttpError(404));
    req.category = category;
    return next();
  })
  .catch(() => next(new HttpError(404)));
});

router.get('/', (req, res, next) => {
  Category.findAll()
  .then(categories => res.json(categories))
  .catch(next);
});

router.get('/:id', (req, res) => {
  res.send(req.category);
});

router.post('/', isAdmin, (req, res, next) => {
  Category.create(req.body)
  .then(category => res.status(201).send(category))
  .catch(() => next(new HttpError(400)));
});

router.put('/:id', isAdmin, (req, res, next) => {
  req.category
  .update(req.body)
  .then(category => res.status(201).send(category))
  .catch(next);
});

router.delete('/:id', isAdmin, (req, res, next) => {
  req.category
  .destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
});

