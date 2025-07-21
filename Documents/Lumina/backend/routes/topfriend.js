const express = require('express');
const TopFriend = require('../models/TopFriend');
const auth = require('../middleware/auth');

const router = express.Router();

// Set top friends (replace all for user)
router.post('/', auth, async (req, res) => {
  try {
    const { friends } = req.body; // [{ friend: userId, order: number }, ...]
    if (!Array.isArray(friends)) return res.status(400).json({ message: 'Friends array required.' });
    await TopFriend.deleteMany({ user: req.user });
    const docs = await TopFriend.insertMany(friends.map(f => ({ user: req.user, friend: f.friend, order: f.order })));
    res.json({ message: 'Top friends set.', topFriends: docs });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get top friends for a user
router.get('/:userId', async (req, res) => {
  try {
    const topFriends = await TopFriend.find({ user: req.params.userId }).populate('friend', 'username avatar').sort({ order: 1 });
    res.json(topFriends);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 