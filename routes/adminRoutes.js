const express = require('express');
const { adminAccess } = require('../middlewares/adminMiddleware');
const { getAllUsers, getUserById, grantAdminAccess, deleteUser, getAllPosts, getPostById, deletePost, getCommentById, deleteComment, getAllComments } = require('../controllers/adminControllers');
const router = express.Router();
// Routes for managing users
router.get('/u', adminAccess, getAllUsers);
router.get('/u/:userId',adminAccess, getUserById);
router.put('/u/:userId',adminAccess, grantAdminAccess);
router.delete('/u/:userId',adminAccess, deleteUser);

// Routes for managing posts
router.get('/p',adminAccess, getAllPosts);
router.get('/p/:postId',adminAccess, getPostById);
router.delete('/p/:postId',adminAccess, deletePost);

// Routes for managing comments
router.get('/c',adminAccess, getAllComments);
router.get('/c/:commentId',adminAccess, getCommentById);
router.delete('/c/:commentId',adminAccess, deleteComment);

module.exports = router;