const { Router } = require('express');
const controller = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/', authMiddleware.authorize, controller.get);
router.get('/:id', authMiddleware.authorize, controller.get);
router.post('/', controller.post);
router.put('/:id', authMiddleware.authorize, controller.put);
router.delete('/:id', authMiddleware.authorize, controller.delete);

module.exports = router;
