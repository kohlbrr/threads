const router = require('express').Router();
const apiRoutes = require('./api');
const authRoutes = require('./auth');
const paymentRoutes = require('./payment');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;
