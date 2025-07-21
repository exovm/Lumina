const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const { content, image } = req.body;
    if (!content) return res.status(400).json({ message: 'Content is required.' });
    const post = new Post({ author: req.user, content, image });
    await post.save();
    res.status(201).json({ message: 'Post created.', post });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Edit a post
router.patch('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    if (post.author.toString() !== req.user) return res.status(403).json({ message: 'Not authorized.' });
    const { content, image } = req.body;
    if (content !== undefined) post.content = content;
    if (image !== undefined) post.image = image;
    await post.save();
    res.json({ message: 'Post updated.', post });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    if (post.author.toString() !== req.user) return res.status(403).json({ message: 'Not authorized.' });
    await post.deleteOne();
    res.json({ message: 'Post deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username avatar').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 