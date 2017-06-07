const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/reviews', require('./reviews'));

module.exports = router;
