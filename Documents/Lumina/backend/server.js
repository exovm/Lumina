const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../images')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fregier_aero_social', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes);

const wallRoutes = require('./routes/wall');
app.use('/api/wall', wallRoutes);
const commentRoutes = require('./routes/comment');
app.use('/api/comments', commentRoutes);

const albumRoutes = require('./routes/album');
app.use('/api/albums', albumRoutes);
const messageRoutes = require('./routes/message');
app.use('/api/messages', messageRoutes);

const likeRoutes = require('./routes/like');
app.use('/api/likes', likeRoutes);
const groupRoutes = require('./routes/group');
app.use('/api/groups', groupRoutes);
const topFriendRoutes = require('./routes/topfriend');
app.use('/api/topfriends', topFriendRoutes);

app.get('/', (req, res) => {
  res.send('Fregier Aero Social API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 