const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['Post', 'Profile'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', LikeSchema); 