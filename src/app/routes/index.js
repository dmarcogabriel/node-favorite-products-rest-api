const { Router } = require('express');
const usersRoutes = require('./user');
const productsRoutes = require('./products');
const authRoutes = require('./auth.routes');

const router = Router();

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/auth', authRoutes);

module.exports = router;
