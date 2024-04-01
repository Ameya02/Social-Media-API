const express = require('express');
const { protect } = require('../middlewares/authmiddleware');
const {accessChat, fetchChats} = require('../controllers/chatControllers');
const router = express.Router();
// Routes for managing chats


// access chat
router.route("/").post(protect,accessChat);
// fetch chats
router.route("/").get(protect,fetchChats);


module.exports = router;