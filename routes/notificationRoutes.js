const express = require('express');
const { getNotification, deleteNotifications, readNotifications,} = require('../controllers/notificationController');
const { protect } = require('../middlewares/authmiddleware');
const router = express.Router();

router.get("/", protect,getNotification);

router.delete("/", protect, deleteNotifications);

router.get("/:id", protect, readNotifications);

module.exports = router