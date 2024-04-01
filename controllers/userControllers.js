const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


// Update password route
const updatePassword = asyncHandler(async(req, res) => {
    if(req.user){
    const userId = req.user._id;
    const  newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const user = await User.findById(userId);
    if(user && (await user.matchPassword(oldPassword))) {
        const salt =  bcrypt.genSalt(10);
    const password=  bcrypt.hash(newPassword,salt);
        await User.findByIdAndUpdate(userId, { password: password });
            res.status(200).json({ message: 'Password updated successfully' });

    }
    else{
        res.status(401).json({ message: 'Invalid password' });
    }}
    else{ res.status(401).json({ message: 'Not authorized' }); }
});

const updateProfile = asyncHandler(async(req, res) => {
    if(req.user){

        const userId = req.user._id;
        const {bio, profile} = req.body;
    const user = await User.findById(userId);
    if(user){
        await User.findByIdAndUpdate(userId, { bio: bio, profile: profile });
        res.status(200).json({ message: 'Profile updated successfully' });
    }
    else{
        res.status(500).json({ message: 'Failed to update profile' });
    }
}
else{ res.status(401).json({ message: 'Not authorized' }); }
});

const deleteProfile = asyncHandler(async(req, res) => {
    if(req.user){
    const password = req.body.password;
        const userId = req.user._id;
    const user = await User.findById(userId);
    if(user && (await user.matchPassword(password))){
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'Profile deleted successfully' });
    }
    else{
        res.status(500).json({ message: 'Failed to delete profile' });
    }}
    else{ res.status(401).json({ message: 'Not authorized' }); }
})

const getProfile = asyncHandler(async(req, res) => {
    const userId = req.params.id;
    const user = User.findById(userId);
    if(user){
        res.status(200).json({ user });
    }
    else{
        res.status(500).json({ message: 'Failed to get profile' });
    }
});

const getOtherProfile = asyncHandler(async(req, res) => {
    if(req.user){

        const userId = req.user._id;
    const user = User.find({ne: {_id: userId}});
    if(user){
        res.status(200).json({ user });
    }
    else{
        res.status(500).json({ message: 'Failed to get profile' });
    }
}
else{ res.status(401).json({ message: 'Not authorized' }); }
});

const followUser = asyncHandler(async(req, res) => {
    if(req.user){
        const userId = req.user._id;
        const followId = req.params.id;
        const user = User.findById(userId); 
        const follow = User.findById(followId);
        if(user && follow){
        if(user.following.includes(followId)){
            await User.findByIdAndUpdate(userId, { $pull: { following: followId } });
            await User.findByIdAndUpdate(followId, { $pull: { followers: userId } });
        }
        else{
            await User.findByIdAndUpdate(userId, { $push: { following: followId } });
            await User.findByIdAndUpdate(followId, { $push: { followers: userId } });
            await Notification.create({
                user: followId,
                message: `${user.username} is now following you`
            });
            }
            res.sendStatus(200).json("success");
        }
        else{
            res.status(500).json({ message: 'Failed to follow user' });
        }
}})

module.exports = { updatePassword, updateProfile, deleteProfile, getProfile, getOtherProfile, followUser };
