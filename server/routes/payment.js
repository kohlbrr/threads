const router = require('express').Router();

const keySecret = process.env.SECRET_KEY;
const stripe = require('stripe')(keySecret);

router.post('/', (req, res, next) => {
  stripe.customers.create({
    email: req.body.token.email,
    source: req.body.token.id,
  })
  .then(customer => stripe.charges.create({
    amount: req.body.amount,
    description: 'Sample Charge',
    currency: 'usd',
    customer: customer.id,
  }))
  .then(res.status(200).send.bind(res))
  .catch(next);
});

module.exports = router;
