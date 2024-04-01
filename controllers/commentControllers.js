const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const Notification = require('../models/notificationModel');
const createComment = asyncHandler(async (req, res) => {
    const { content, postId } = req.body;
    const comment = await Comment.create({
        author: req.user._id,
        post: postId,
        content: content
    });
    if (comment) {
    const author = await Post.findById(postId).populate({ path: 'author', select: '_id' });
    await Notification.create({
        user: author.author._id,
        type: 'comment',
        content: `${req.user.username} commented on your post`
    })
    
        return res.status(201).json(comment);}

    res.status(500).json({ message: 'Failed to create comment' });
})

const getCommentsByPost = asyncHandler(async (req, res) => {
    const postId = req.params.pid;

    const comments = await Comment.find({ post: postId });
    if (comments) return res.status(200).json(comments);
    res.status(404).json({ message: 'No comments found' });
});

const deleteComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    
    const comment = await Comment.findById(commentId).populate({ path: 'author', select: '_id' });
    if(comment && comment.author._id.toString() !== req.user._id.toString()){
        return res.status(401).json({ message: 'You are not authorized to delete this comment' });
    }
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
});

const replyComment = asyncHandler(async (req, res) => {
    const {content, postId} = req.body;
    const comment_id = req.params.id;
    const reply = await Comment.create({
        author: req.user._id,
        content: content,
        post: postId,
        parentComment: comment_id
    });
    await Comment.findByIdAndUpdate({ _id: comment_id }, { $push: { replies: reply._id } });
    if (reply) return res.status(201).json(reply);
    res.status(500).json({ message: 'Failed to reply comment' });
})

const commentLikes = asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (comment) {
        if (comment.likes.includes(req.user._id)) {
            await Comment.findByIdAndUpdate(commentId, { $pull: { likes: req.user._id } });
        }
        else {
            await Comment.findByIdAndUpdate(commentId, { $push: { likes: req.user._id } });
        }
        res.status(200).json({ message: 'success' });
    }
    else {
        res.status(404).json({ message: 'Comment not found' });
    }})

module.exports = { createComment, getCommentsByPost, deleteComment, replyComment, commentLikes }