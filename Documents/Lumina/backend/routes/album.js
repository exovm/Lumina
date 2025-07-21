const express = require('express');
const Album = require('../models/Album');
const auth = require('../middleware/auth');

const router = express.Router();

// Create album
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required.' });
    const album = new Album({ owner: req.user, title, description, photos: [] });
    await album.save();
    res.status(201).json({ message: 'Album created.', album });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all albums for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const albums = await Album.find({ owner: req.params.userId }).sort({ createdAt: -1 });
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get single album
router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album not found.' });
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Add photo to album
router.post('/:id/photo', auth, async (req, res) => {
  try {
    const { photoUrl } = req.body;
    if (!photoUrl) return res.status(400).json({ message: 'Photo URL is required.' });
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album not found.' });
    if (album.owner.toString() !== req.user) return res.status(403).json({ message: 'Not authorized.' });
    album.photos.push(photoUrl);
    await album.save();
    res.json({ message: 'Photo added.', album });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 