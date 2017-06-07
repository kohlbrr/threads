const router = require('express').Router();

const { Product } = require('../../db/models');

router.param('id', (req, res, next, id) => {   // dries-up code
  Product.findOne({
    where: { id: id },
  })
  .then((product) => {
    if (product) {
      req.product = product;
      next();
    } else {
      res.sendStatus(404);
    }
  })
  .catch(() => {
    const error = new Error();
    error.status = 404;
    next(error);
  });
});

router.get('/', (req, res, next) => {         // get all products
  Product.findAll()
  .then((products) => {
    console.log('products found');
    res.json(products);
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {      // get one product
  res.send(req.product);
  next();
});

// post, put, delete:

router.post('/', (req, res, next) => {        // create one product
  Product.create(req.body)
  .then((product) => {
    console.log('created successfully');
    res.status(201).send(product);
  })
  .catch(next);
});

router.put('/:id', (req, res, next) => {      // update one product
  Product.update(req.product)
  .then((product) => {
    console.log('updated successfully');
    res.send(product);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {   // delete one product
  req.design.destroy()
  .then(() => res.send('deleted successfully'))
  .catch(next);
});


module.exports = router;
