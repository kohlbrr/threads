const router = require('express').Router();
const { isLoggedIn } = require('../../middleware');
const { Design, Product, Cartcontents } = require('../../db/models');
const HttpError = require('../../http-error');

const flattenCartcontents = contents => contents.map(content =>
  Object.assign({},
    {
      price: content.product.design.price,
      name: content.product.design.name,
      sex: content.product.design.sex,
    },
    {
      size: content.product.size,
      color: content.product.color,
      imageUrl: content.product.imageUrl,
      productId: content.product.id,
    }, {
      quantity: content.quantity,
    }));


router.param('productId', (req, res, next, productId) => {
  Product.findById(productId)
  .then((product) => {
    if (!product) return next(new HttpError(404));
    req.product = product;
    return next();
  })
  .catch(() => next(new HttpError(404)));
});

router.get('/', isLoggedIn, (req, res, next) => {
  Cartcontents.findAll({
    where: {
      userId: req.user.id,
    },
    include: [{
      model: Product,
      include: [Design],
    }],
  })
  .then(flattenCartcontents)
  .then(res.send.bind(res))
  .catch(next);
});

router.post('/:productId', isLoggedIn, (req, res, next) => {
  Cartcontents.findOrCreate({
    where: {
      userId: req.user.id,
      productId: req.params.productId,
    },
  })
  .spread((content) => {
    const quantity = content.quantity + req.body.quantity;
    if (quantity > req.product.stock) return next(new HttpError(404));
    return content.update({ quantity });
  })
  .then(res.status(201).send.bind(res))
  .catch(next);
});

//TODO
// need to add code when quatntity === 0  => remove product from cart
router.put('/:productId', isLoggedIn, (req, res, next) => {
  Cartcontents.findOne({
    where: {
      userId: req.user.id,
      productId: req.params.productId,
    },
  })
  .then((content) => {
    if (req.body.quantity > req.product.stock) return next(new HttpError(404));
    return content.update({ quantity: req.body.quantity });
  })
  .then(res.status(201).send.bind(res))
  .catch(next);
});


module.exports = router;
