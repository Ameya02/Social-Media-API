const express = require('express');
const { createPost, getPosts, getPost, deletePost, getPostsByUser } = require('../controllers/postControllers');
const { protect } = require('../middlewares/authmiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Routes for managing posts

// create a post
router.post('/', protect, upload.array('attactments',5),createPost);
// get all posts
router.get('/', protect, getPosts);
// get a post by id
router.get('/:id', protect, getPost);
// delete a post by id
router.delete('/:id', protect, deletePost);
// get all posts by a user
router.get('/u/:un', protect, getPostsByUser);

module.exports = router;