const express = require('express');
const router = new express.Router();
const { isLoggedIn, isAdmin } = require('../../middleware');
const { Order, OrderProducts } = require('../../db/models');
module.exports = router;

// Get al orders
// ADMIN
router.get('/', isAdmin, (req, res, next) => {
  Order.findAll()
  .then(orders => res.json(orders))
  .catch(next);
});

// Create an order
// USER
router.post('/', isLoggedIn, (req, res, next) => {
  // Create order
  Order.create({
    status: 'Pending',
    timestamp: Date.now(),
    userId: req.user && req.user.id
  })
  // Create order items associated with order
  .then(order => {
    const orderProducts = req.body.map(cartContent => {
      OrderProducts.build({
        orderId: order.id,
        productId: cartContent.productId,
        price: cartContent.price,
        quantity: cartContent.quantity
      });
    });
    return OrderProducts.bulkCreate(orderProducts);
  })
  .then(() => res.sendStatus(201))
  .catch(next);
});

// Update an order status
// ADMIN
router.put('/:id', isAdmin, (req, res, next) => {
  Order.update(
    req.body,
    {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    })
  .then(([, order]) => {
    res.status(201).send(order);
  })
  .catch(next);
});

// Return a single order
// USER (gated)
router.get('/:id', isLoggedIn, (req, res, next) => {
  if(req.user.isAdmin || req.user.id === req.params.id) {
    Order.findById(req.params.id)
    .then(order => res.send(order))
    .catch(next);
  } else { res.sendStatus(403); }
});

// Return all order items
// USER (gated)
router.get('/:id/items', isLoggedIn, (req, res, next) => {
  if(req.user.isAdmin || req.user.id === req.params.id) {
    OrderProducts.findAll({
      where: { orderId: req.params.id },
    })
    .then(orderProducts => res.send(orderProducts))
    .catch(next);
  } else { res.sendStatus(403); }
});

// We don't want to delete orders via API routes - can't forsee a reason to
