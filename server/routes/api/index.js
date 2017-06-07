const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/categories', require('./categories'));

module.exports = router;
