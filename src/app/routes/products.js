const { Router } = require('express');
const controller = require('../controllers/products');

const router = Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);

module.exports = router;
