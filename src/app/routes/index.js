const { Router } = require('express');
const usersRoutes = require('./user');
const productsRoutes = require('./products');

const router = Router();

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

module.exports = router;
