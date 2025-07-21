const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  photos: [{ type: String }], // Array of image URLs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Album', AlbumSchema); 