const mongoose = require('mongoose');
const chatSchema = mongoose.Schema({
    chatName: {type: String, trim: false},
    users: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    },],
    latestMessage: {type: mongoose.Schema.Types.ObjectId,
    ref:"Message",
    }
    } , {
        timestampes:true,
    })
    
    module.exports =  mongoose.model('Chat',chatSchema);;
