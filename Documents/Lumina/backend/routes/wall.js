const express = require('express');
const WallPost = require('../models/WallPost');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Create a wall post
router.post('/:userId', auth, async (req, res) => {
  try {
    const { content, image } = req.body;
    const recipient = await User.findById(req.params.userId);
    if (!recipient) return res.status(404).json({ message: 'Recipient not found.' });
    const post = new WallPost({ author: req.user, recipient: recipient._id, content, image });
    await post.save();
    res.status(201).json({ message: 'Wall post created.', post });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all wall posts for a user
router.get('/:userId', async (req, res) => {
  try {
    const posts = await WallPost.find({ recipient: req.params.userId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 