const express = require('express');
const router = new express.Router();

const keySecret = process.env.SECRET_KEY;
const stripe = require('stripe')(keySecret);

const { isLoggedIn, isAdmin } = require('../../middleware');
const { Order, OrderProducts } = require('../../db/models');

module.exports = router;

// USER / ADMIN
router.get('/', isLoggedIn, (req, res, next) => { // TODO: REFACTOR FOR USER/ADMIN
  if (req.user.isAdmin) {
    Order.findAll({
      include: [{ all: true }],
      order: 'timestamp DESC',
    })
    .then(orders => res.json(orders))
    .catch(next);
  } else {
    Order.findAll({
      where: { userId: req.user.id },
      include: [{ all: true }],
      order: 'timestamp DESC',
    })
    .then(orders => res.json(orders))
    .catch(next);
  }
});

// Create an order
// USER
router.post('/', isLoggedIn, (req, res, next) => {
  // Create order
  stripe.charges.retrieve(req.body.chargeId)
  .then(() =>
    Order.create({
      status: 'Pending',
      timestamp: Date.now(),
      userId: req.user && req.user.id,
    }))
  // Create order items associated with order
  .then((order) => {
    const orderProducts = req.body.cart.map(cartContent => ({
      orderId: order.id,
      productId: cartContent.productId,
      price: Number(cartContent.price),
      quantity: cartContent.quantity,
    }));
    return OrderProducts.bulkCreate(orderProducts);
  })
  .then(() => res.sendStatus(201))
  .catch(console.log);
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
  .catch(errContent => {
    const err = new Error(errContent);
    err.status = 400;
    next(err);
  });
});

// Return a single order
// USER (gated)
router.get('/:id', isLoggedIn, (req, res, next) => {
  if (req.user.isAdmin || req.user.id === req.params.id) {
    Order.findById(req.params.id)
    .then(order => res.send(order))
    .catch(next);
  } else { res.sendStatus(403); }
});

// Return all orders for a user
// ADMIN
router.get('/user/:userId', isAdmin, (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(orders => res.send(orders))
  .catch(next);
});

// Return all order items
// USER (gated)
router.get('/:id/items', isLoggedIn, (req, res, next) => {
  if (req.user.isAdmin || req.user.id === req.params.id) {
    OrderProducts.findAll({
      where: { orderId: req.params.id },
    })
    .then(orderProducts => res.send(orderProducts))
    .catch(next);
  } else { res.sendStatus(403); }
});

router.post('/promocode', (req, res, next) => {
  if (req.body.promocode === "HotGeoff"){
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// We don't want to delete orders via API routes - can't forsee a reason to
