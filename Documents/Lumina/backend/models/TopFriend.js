const mongoose = require('mongoose');

const TopFriendSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  friend: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: Number, required: true },
});

module.exports = mongoose.model('TopFriend', TopFriendSchema); 