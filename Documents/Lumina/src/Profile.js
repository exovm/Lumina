import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ bio: '', avatar: '' });
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPostForm, setEditPostForm] = useState({ content: '', image: '' });
  const [newPost, setNewPost] = useState({ content: '', image: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({ bio: res.data.bio || '', avatar: res.data.avatar || '' });
      } catch (err) {
        setError('Could not fetch profile. Please log in.');
      }
    };
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/me/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchProfile();
    fetchPosts();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/users/me', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setEditMode(false);
      setMessage('Profile updated!');
    } catch (err) {
      setError('Could not update profile.');
    }
  };

  // Post editing
  const startEditPost = post => {
    setEditingPostId(post._id);
    setEditPostForm({ content: post.content, image: post.image || '' });
  };

  const handleEditPostChange = e => {
    setEditPostForm({ ...editPostForm, [e.target.name]: e.target.value });
  };

  const handleEditPostSubmit = async (e, postId) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(`http://localhost:5000/api/posts/${postId}`, editPostForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.map(p => (p._id === postId ? res.data.post : p)));
      setEditingPostId(null);
      setMessage('Post updated!');
    } catch (err) {
      setError('Could not update post.');
    }
  };

  const handleDeletePost = async postId => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter(p => p._id !== postId));
      setMessage('Post deleted.');
    } catch (err) {
      setError('Could not delete post.');
    }
  };

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

  if (error) return <div className="card"><p style={{ color: 'red' }}>{error}</p></div>;
  if (!user) return <div className="card"><p>Loading...</p></div>;

  return (
    <div className="card">
      <h2>Profile</h2>
      {user.avatar && <img src={user.avatar} alt="avatar" style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: '1rem' }} />}
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {!editMode ? (
        <>
          <p><strong>Bio:</strong> {user.bio}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <label>
            Bio:
            <textarea name="bio" value={form.bio} onChange={handleChange} style={{ display: 'block', width: '100%', margin: '0.5rem 0', borderRadius: '0.5rem', padding: '0.5rem' }} />
          </label>
          <label>
            Avatar URL:
            <input name="avatar" value={form.avatar} onChange={handleChange} style={{ display: 'block', width: '100%', margin: '0.5rem 0', borderRadius: '0.5rem', padding: '0.5rem' }} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)} style={{ marginLeft: '1rem' }}>Cancel</button>
        </form>
      )}
      {message && <p style={{ color: '#00ffff' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <hr style={{ margin: '2rem 0' }} />
      <h3>Your Posts</h3>
      <form onSubmit={handleNewPostSubmit} style={{ marginBottom: '2rem' }}>
        <textarea name="content" value={newPost.content} onChange={handleNewPostChange} placeholder="What's on your mind?" required style={{ width: '100%', margin: '0.5rem 0', borderRadius: '0.5rem', padding: '0.5rem' }} />
        <input name="image" value={newPost.image} onChange={handleNewPostChange} placeholder="Image URL (optional)" style={{ width: '100%', margin: '0.5rem 0', borderRadius: '0.5rem', padding: '0.5rem' }} />
        <button type="submit" disabled={creating}>Post</button>
      </form>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="card" style={{ background: 'rgba(255,255,255,0.03)', margin: '1rem 0' }}>
            {editingPostId === post._id ? (
              <form onSubmit={e => handleEditPostSubmit(e, post._id)}>
                <textarea name="content" value={editPostForm.content} onChange={handleEditPostChange} style={{ width: '100%', margin: '0.5rem 0', borderRadius: '0.5rem', padding: '0.5rem' }} />
                <input name="image" value={editPostForm.image} onChange={handleEditPostChange} placeholder="Image URL" style={{ width: '100%', margin: '0.5rem 0', borderRadius: '0.5rem', padding: '0.5rem' }} />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingPostId(null)} style={{ marginLeft: '1rem' }}>Cancel</button>
              </form>
            ) : (
              <>
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt="post" style={{ maxWidth: '100%', borderRadius: '0.5rem', margin: '0.5rem 0' }} />}
                <p style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(post.createdAt).toLocaleString()}</p>
                <button onClick={() => startEditPost(post)} style={{ marginRight: '1rem' }}>Edit</button>
                <button onClick={() => handleDeletePost(post._id)} style={{ color: 'red' }}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Profile; 