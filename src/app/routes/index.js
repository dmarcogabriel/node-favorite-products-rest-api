const { Router } = require('express');
const usersRoutes = require('./user.routes');
const productsRoutes = require('./product.routes');
const authRoutes = require('./auth.routes');

const router = Router();

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/auth', authRoutes);

module.exports = router;
