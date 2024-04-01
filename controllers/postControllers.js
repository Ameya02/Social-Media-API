// postController.js

const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

const createPost = asyncHandler(async (req, res) => {
    const { content, attachments } = req.body;

    // Create a new post
    const post = await Post.create({
      author: req.user._id, 
      content: content,
      attachments: attachments 
    });
    if(post) return res.status(201).json(post);
    res.status(500).json({ message: 'Failed to create post' });
})

const deletePost = asyncHandler(async (req, res) => {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate({path:"author",select:"_id"});
        if(post){
            if(post.author._id.toString() !== req.user._id.toString()){
                return res.status(401).json({ message: 'You are not authorized to delete this post' });
            }
            await Post.findByIdAndDelete(postId);
            res.status(200).json({ message: 'Post deleted successfully' });
        }
        else{
            res.status(500).json({ message: 'Failed to delete post' });
        }
    });

const getPost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if(post) return res.status(200).json(post);
    res.status(404).json({ message: 'Post not found' });
});

const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({author: {$ne:req.user._id}});
    if(posts) return res.status(200).json(posts);
    res.status(404).json({ message: 'No posts found' });
});

const getPostsByUser = asyncHandler(async (req, res) => {
    const un = req.params.un;
    const posts = await Post.find({}).populate({ path:  'author', select: 'username' })
    if(posts) return res.status(200).json(posts);
    res.status(404).json({ message: 'No posts found' });
});


const PostLikes = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if(post){
        if(post.likes.includes(req.user._id)){
            await Post.findByIdAndUpdate(postId,{$pull:{likes:req.user._id}})
        }
        else{
            await Post.findByIdAndUpdate(postId,{$push:{likes:req.user._id}})
        }
        res.status(200).json({ message: 'success' });
    }
    else{
        res.status(404).json({ message: 'Post not found' });
    
}
});

module.exports = { createPost, deletePost, getPost, getPosts, getPostsByUser, PostLikes }