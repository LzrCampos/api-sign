const router = require('express').Router();

const userController = require('./app/controllers/UserController');
const authService = require('./app/services/authService');

router.post('/api/user/signup', userController.store);
router.post('/api/user/signin', userController.get);
router.get('/api/user', authService.authorize, userController.find);

module.exports = router;
