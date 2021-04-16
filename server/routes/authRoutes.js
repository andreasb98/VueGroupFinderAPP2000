const router = require('express').Router();
const AuthenticationController = require('../controllers/AthenticationController');
const middlewareUser = require('./middlewareUser');

router.post('/login', AuthenticationController.login);

router.post('/register', AuthenticationController.register);

router.post('/update/firstname', middlewareUser.isLoggedIn, AuthenticationController.updateFirstName);

router.post('/update/lastname', middlewareUser.isLoggedIn, AuthenticationController.updateLastName);

router.post('/update/phone', middlewareUser.isLoggedIn, AuthenticationController.updatePhone);

router.post('/update/email', middlewareUser.isLoggedIn, AuthenticationController.updateEmail);









module.exports = router;