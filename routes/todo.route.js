const router = require('express').Router();
const controller = require('../controllers/todo.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id/update', controller.updateById);
router.patch('/:id/complete', controller.setComplete);
router.delete('/:id/delete', controller.deleteById);

module.exports = router;