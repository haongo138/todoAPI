const router = require('express').Router();
const controller = require('../controllers/user.controller');
const middleware = require('../controllers/auth.controller');

router.get('/protectedRoute', middleware.checkToken, middleware.checkExist, controller.getOne);
router.get('/', controller.getAll);
router.post('/', controller.addNewUser);

module.exports = router;