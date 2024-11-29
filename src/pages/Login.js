import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3008/news/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('authToken', token);
        navigate('/dashboard');
      } else {
        const err = await response.json();
        setError(err.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Card sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Login
        </Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            value={formData.email}
            onChange={handleChange('email')}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
