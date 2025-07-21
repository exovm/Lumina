import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: '', image: '' });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        setError('Could not load feed.');
      }
    };
    fetchPosts();
  }, []);

  const handleNewPostChange = e => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleNewPostSubmit = async e => {
    e.preventDefault();
    setCreating(true);
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/posts', newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts([res.data.post, ...posts]);
      setNewPost({ content: '', image: '' });
      setMessage('Post created!');
    } catch (err) {
      setError('Could not create post.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Feed</h2>
        {isLoggedIn && (
          <form onSubmit={handleNewPostSubmit} style={{ marginBottom: '2rem' }}>
            <textarea name="content" value={newPost.content} onChange={handleNewPostChange} placeholder="What's on your mind?" required style={{ width: '100%', margin: '0.5rem 0', borderRadius: '0.5rem', padding: '0.5rem' }} />
            <input name="image" value={newPost.image} onChange={handleNewPostChange} placeholder="Image URL (optional)" style={{ width: '100%', margin: '0.5rem 0', borderRadius: '0.5rem', padding: '0.5rem' }} />
            <button type="submit" disabled={creating}>Post</button>
          </form>
        )}
        {message && <p style={{ color: '#00ffff' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <hr style={{ margin: '2rem 0' }} />
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className="card" style={{ background: 'rgba(255,255,255,0.03)', margin: '1rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                {post.author?.avatar && <img src={post.author.avatar} alt="avatar" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }} />}
                <span style={{ fontWeight: 'bold' }}>{post.author?.username || 'Unknown'}</span>
              </div>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="post" style={{ maxWidth: '100%', borderRadius: '0.5rem', margin: '0.5rem 0' }} />}
              <p style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed; 