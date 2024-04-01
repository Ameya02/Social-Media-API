const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    profile: {
        type: String,
        default:"https://acdsinc.org/wp-content/uploads/2015/12/dummy-profile-pic-300x300.png",
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
    },
    {
        timestamps: true
    });

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.updatePassword = async function(newPassword){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(newPassword,salt);
}
const User = mongoose.model('User', userSchema);

module.exports = User;