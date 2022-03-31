const usersRoutes = require('./users-route');
const thoughtsRoutes = require('./thoughts-route');
const router = require('express').Router();

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;