const { Router } = require('express');
const controller = require('../controllers/products');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/', controller.get);
router.get('/:id', authMiddleware.authorize, controller.getById);
router.post('/', authMiddleware.authorize, controller.post);

module.exports = router;
