const router = require('express').Router();
const controller = require('../controllers/auth.controller');

router.post('/', controller.auth);

module.exports = router;