const router = require('express').Router();
const designRoutes = require('./designs');
const productRoutes = require('./products');

router.use('/designs', designRoutes);

router.use('/products', productRoutes);

router.use('/users', require('./users'));
router.use('/orders', require('./orders'));

module.exports = router;
