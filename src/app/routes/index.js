const { Router } = require('express');
const usersRoutes = require('./user');

const router = Router();

router.use('/users', usersRoutes);

module.exports = router;
