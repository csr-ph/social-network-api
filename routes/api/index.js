const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/friends', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', thoughtRoutes);

module.exports = router;