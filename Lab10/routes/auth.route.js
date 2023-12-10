var express = require('express');
var passport = require('passport')
var router = express.Router();
var authController = require('../controllers/auth.controller');

router.get('/login', authController.renderLoginPage);
router.post('/login', authController.login);

router.get('/register', authController.renderRegisterPage);
router.post('/register', authController.register);

router.get('/logout', authController.logout);

router.get('/google', authController.loginWithGoogle)
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  authController.googleCallback)

module.exports = router;