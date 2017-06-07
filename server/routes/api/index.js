const router = require('express').Router();
const designRoutes = require('./designs');
const productRoutes = require('./products');

router.use('/designs', designRoutes);

router.use('/products', productRoutes);

module.exports = router;
