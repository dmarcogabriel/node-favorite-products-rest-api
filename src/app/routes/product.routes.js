const { Router } = require('express');
const ProductController = require('../controllers/products');
const AuthMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/', AuthMiddleware.authorize, ProductController.get);
router.get('/:id', AuthMiddleware.authorize, ProductController.getById);
router.post('/', AuthMiddleware.authorize, ProductController.post);

module.exports = router;
