const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const accessChat = asyncHandler(async (req,res) => {
    const { userId } = req.body;
    if(!userId){
        throw new Error ("UserId param not sent with request");
    }
    var isChat = await Chat.find({
        isGroupChat:false,
        $and: [
            {users: {$elemMatch: {$ne:userId}}},
            {users:{$elemMatch:{$eq:req.user._id}}},
        ],
    }).populate("users","-password")
    .populate("latestMessage");

   isChat = await User.populate(isChat,{
    path:"latestMessage.sender",
    select:"name pic email",
   });

   if(isChat.length > 0){
    res.send(isChat[0]);
   }
   else {
    var chatData = {
        chatName :"sender",
        isGroupChat: false,
        users:[userId,req.user._id],
    };
    try {
        const createdChat = await Chat.create(chatData);

        const FullChat = await Chat.findOne({_id:createdChat._id}).populate("users","-password")
        res.status(200).send(FullChat);
    } catch (error) {
        throw Error(error.message)
    }

   }
});

const fetchChats = asyncHandler(async(req,res) => {
    try {
        Chat.find({users:{$elemMatch:{$eq: req.user._id}}})
        .populate("users","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(result)=> {
            results = await User.populate(result,{
                path: "latestMessage.sender",
                select:"name pic email",
            });
            res.status(200).send(results);
        })
    } catch (error) {
        throw new Error(error.message)
    }
})

module.exports   = { accessChat, fetchChats }