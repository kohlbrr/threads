const router = require('express').Router();

router.use('/clothings', require('./clothings'));
router.use('/designs', require('./designs'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/categories', require('./categories'));
router.use('/cart', require('./cart'));
router.use('/reviews', require('./reviews'));

module.exports = router;
