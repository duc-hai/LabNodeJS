const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/account.controller');

// Define your account routes here
// E.g:
router.get('/', accountController.home)
router.get('/login', accountController.getLogin)
router.post('/login', accountController.checkValidatorLogin, accountController.login)
router.get('/logout', accountController.logout)
router.get('/register', accountController.getRegister)
router.post('/register', accountController.validator, accountController.register)

module.exports = router;