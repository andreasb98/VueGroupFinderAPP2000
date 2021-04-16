const router = require('express').Router();
const ChatController = require('../controllers/ChatController');

router.get('/:id', ChatController.getMessages);

module.exports = router;