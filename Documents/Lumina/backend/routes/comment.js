const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a comment (guestbook or post)
router.post('/', auth, async (req, res) => {
  try {
    const { recipient, post, content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content is required.' });
    const comment = new Comment({ author: req.user, recipient, post, content });
    await comment.save();
    res.status(201).json({ message: 'Comment created.', comment });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get comments for a user (guestbook)
router.get('/user/:userId', async (req, res) => {
  try {
    const comments = await Comment.find({ recipient: req.params.userId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 