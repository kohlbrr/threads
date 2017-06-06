const express = require('express');
const router = new express.Router();
const { Order } = require('../../db/models');
module.exports = router;

// Get al orders
// ADMIN
router.get('/', (req, res, next) => {
  Order.findAll()
  .then(orders => res.json(orders))
  .catch(next);
});

// Create an order
// USER
router.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(res.send)
  .catch(next);
});

// Update an order status
// ADMIN
router.put('/:id', (req, res, next) => {
  Order.update(
    req.body,
    { where: { id: req.params.id } }
  )
  .then(res.send)
  .catch(next);
});

// Return a single order
// USER (gated)
router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
  .then(res.send)
  .catch(next);
});

// We don't want to delete orders via API routes - can't forsee a reason to
