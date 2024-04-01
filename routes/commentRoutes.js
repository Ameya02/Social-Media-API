const express = require('express');
const { protect } = require('../middlewares/authmiddleware');
const { getCommentsByPost, createComment, deleteComment, replyComment } = require('../controllers/commentControllers');
const router = express.Router();
// Routes for managing comments
// get comments by post
router.get("/:pid", protect, getCommentsByPost);
// create a comment
router.post("/", protect, createComment);
// delete a comment
router.delete("/:id", protect, deleteComment);
// reply to a comment
router.post("/:id/reply", protect, replyComment);

module.exports = router;
