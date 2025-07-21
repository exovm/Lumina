const express = require('express');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

// Send message
router.post('/', auth, async (req, res) => {
  try {
    const { recipient, content } = req.body;
    if (!recipient || !content) return res.status(400).json({ message: 'Recipient and content required.' });
    const message = new Message({ sender: req.user, recipient, content });
    await message.save();
    res.status(201).json({ message: 'Message sent.', message });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Inbox
router.get('/inbox', auth, async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user }).populate('sender', 'username avatar').sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Outbox
router.get('/outbox', auth, async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user }).populate('recipient', 'username avatar').sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Mark as read
router.post('/:id/read', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found.' });
    if (message.recipient.toString() !== req.user) return res.status(403).json({ message: 'Not authorized.' });
    message.read = true;
    await message.save();
    res.json({ message: 'Message marked as read.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 