import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage('Registration successful! You can now log in.');
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="card">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required style={{ display: 'block', margin: '1rem 0', width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: 'none' }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ display: 'block', margin: '1rem 0', width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: 'none' }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ display: 'block', margin: '1rem 0', width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: 'none' }} />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p style={{ color: '#00ffff' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Signup; 