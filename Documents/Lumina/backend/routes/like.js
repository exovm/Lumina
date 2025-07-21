const express = require('express');
const Like = require('../models/Like');
const auth = require('../middleware/auth');

const router = express.Router();

// Like a post or profile
router.post('/', auth, async (req, res) => {
  try {
    const { targetType, targetId } = req.body;
    if (!targetType || !targetId) return res.status(400).json({ message: 'Target required.' });
    const existing = await Like.findOne({ user: req.user, targetType, targetId });
    if (existing) return res.status(400).json({ message: 'Already liked.' });
    const like = new Like({ user: req.user, targetType, targetId });
    await like.save();
    res.status(201).json({ message: 'Liked.', like });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Unlike a post or profile
router.delete('/', auth, async (req, res) => {
  try {
    const { targetType, targetId } = req.body;
    if (!targetType || !targetId) return res.status(400).json({ message: 'Target required.' });
    const like = await Like.findOneAndDelete({ user: req.user, targetType, targetId });
    if (!like) return res.status(404).json({ message: 'Like not found.' });
    res.json({ message: 'Unliked.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get likes for a target
router.get('/:targetType/:targetId', async (req, res) => {
  try {
    const { targetType, targetId } = req.params;
    const likes = await Like.find({ targetType, targetId }).populate('user', 'username avatar');
    res.json(likes);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 