const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.isLogined, userController.getHome);
router.get('/signup', userController.getSignup);
router.post('/signup', userController.createUser);
router.get('/login', authMiddleware.isLogout, userController.getLogin);
router.post('/login', authMiddleware.isLogout, userController.loginUser);
router.get('/logout', authMiddleware.isLogined, userController.logoutUser);

module.exports = router;
