const { Router } = require('express');
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/', AuthMiddleware.authorize, UserController.get);
router.get('/:id', AuthMiddleware.authorize, UserController.getById);
router.post('/', UserController.post);
router.put('/:id', AuthMiddleware.authorize, UserController.put);
router.delete('/:id', AuthMiddleware.authorize, UserController.delete);

module.exports = router;
