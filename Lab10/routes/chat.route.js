var express = require('express');
var router = express.Router();
var chatController = require('../controllers/chat.controller');
const { jwtTokenValidator } = require('../middlewares/jwt-token.guard');

router.get('/', chatController.sendUserList);
router.post('/', () => ({}));

module.exports = router;