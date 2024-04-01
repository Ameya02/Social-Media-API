const asyncHandler = require('express-async-handler');
const getNotification = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const notifications = await Notification.find({userId: userId, read:false});
       if(notifications)
        res.status(200).json({ notifications });
    else{
        res.status(500).json({ message: 'Failed to get notifications' });
    }
})
const readNotifications = asyncHandler(async (req, res) => {
    const notificationId = req.params.id;
    const notification = await Notification.findByIdAndUpdate(notificationId,{read:true});
    if(notification){
        res.status(200).json({ message: 'Notification deleted successfully' });
    }
    else{
        res.status(500).json({ message: 'Failed to delete notification' });
    }
});

const deleteNotifications = asyncHandler(async (req, res) => {
    const expiredNotifications = await Notification.find({ read: true, expiresAt: { $lte: new Date() } });

    if (expiredNotifications.length > 0) {
        // Delete expired notifications
        await Notification.deleteMany({ _id: { $in: expiredNotifications.map(notification => notification._id) } });
        res.status(200).json({ message: 'Expired notifications deleted successfully' });
    } else {
        res.status(404).json({ message: 'No expired notifications found' });
    }

})

module.exports = { getNotification, readNotifications, deleteNotifications };
