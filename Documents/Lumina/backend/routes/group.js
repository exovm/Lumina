const express = require('express');
const Group = require('../models/Group');
const auth = require('../middleware/auth');

const router = express.Router();

// Create group
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required.' });
    const group = new Group({ name, description, owner: req.user, members: [req.user] });
    await group.save();
    res.status(201).json({ message: 'Group created.', group });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Join group
router.post('/:id/join', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found.' });
    if (group.members.includes(req.user)) return res.status(400).json({ message: 'Already a member.' });
    group.members.push(req.user);
    await group.save();
    res.json({ message: 'Joined group.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Leave group
router.post('/:id/leave', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found.' });
    group.members = group.members.filter(id => id.toString() !== req.user);
    await group.save();
    res.json({ message: 'Left group.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().populate('owner', 'username').sort({ createdAt: -1 });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get single group
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('owner', 'username').populate('members', 'username avatar');
    if (!group) return res.status(404).json({ message: 'Group not found.' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 