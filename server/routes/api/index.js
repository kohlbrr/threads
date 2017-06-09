const router = require('express').Router();

router.use('/clothings', require('./clothings'));
router.use('/designs', require('./designs'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/categories', require('./categories'));

module.exports = router;
