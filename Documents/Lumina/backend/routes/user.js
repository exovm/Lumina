const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get current user's profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update current user's bio and avatar
router.put('/me', auth, async (req, res) => {
  try {
    const { bio, avatar } = req.body;
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;
    await user.save();
    res.json({ message: 'Profile updated.', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update profile customization
router.put('/me/customize', auth, async (req, res) => {
  try {
    const { background, theme, layout } = req.body;
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (background !== undefined) user.background = background;
    if (theme !== undefined) user.theme = theme;
    if (layout !== undefined) user.layout = layout;
    await user.save();
    res.json({ message: 'Profile customization updated.', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Send friend request
router.post('/me/friends/request/:id', auth, async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    const user = await User.findById(req.user);
    if (!target || !user) return res.status(404).json({ message: 'User not found.' });
    if (target.friendRequests.includes(user._id) || target.friends.includes(user._id)) {
      return res.status(400).json({ message: 'Already requested or friends.' });
    }
    target.friendRequests.push(user._id);
    await target.save();
    res.json({ message: 'Friend request sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Accept friend request
router.post('/me/friends/accept/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const requester = await User.findById(req.params.id);
    if (!user || !requester) return res.status(404).json({ message: 'User not found.' });
    if (!user.friendRequests.includes(requester._id)) {
      return res.status(400).json({ message: 'No friend request from this user.' });
    }
    user.friends.push(requester._id);
    requester.friends.push(user._id);
    user.friendRequests = user.friendRequests.filter(id => id.toString() !== requester._id.toString());
    await user.save();
    await requester.save();
    res.json({ message: 'Friend request accepted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Remove friend
router.post('/me/friends/remove/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const friend = await User.findById(req.params.id);
    if (!user || !friend) return res.status(404).json({ message: 'User not found.' });
    user.friends = user.friends.filter(id => id.toString() !== friend._id.toString());
    friend.friends = friend.friends.filter(id => id.toString() !== user._id.toString());
    await user.save();
    await friend.save();
    res.json({ message: 'Friend removed.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get current user's posts
const Post = require('../models/Post');
router.get('/me/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 