const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authmiddleware');
const { sendMessage, receiveMessage, sendMessageFile } = require('../controllers/messageControllers');

// Routes for managing messages
// send a message
router.route("/").post(protect,sendMessage);
// send a file
// router.route("/file").post(protect,sendMessageFile);
// receive a message
router.route("/:chatId").get(protect,receiveMessage);

module.exports = router;