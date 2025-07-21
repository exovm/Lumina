const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' }, // URL to profile picture
  background: { type: String, default: '' }, // Profile background URL or color
  theme: { type: String, default: 'default' }, // Profile theme name
  layout: { type: Object, default: {} }, // Custom layout settings (section order, etc.)
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Friend list
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Pending friend requests
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema); 