const router = require('express').Router();
const designRoutes = require('./designs');

router.use('/designs', designRoutes);

module.exports = router;
