/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/userSlice';
import { Box, Button, Card, CardContent, Container, TextField } from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await axios.get('https://expensetracker-32wt.onrender.com/users');
      const user = users.data.find(user => user.email === credentials.email && user.password === credentials.password);
      if (user) {
        dispatch(login(user));
        navigate('/dashboard/*');
      } else {
        console.error('Invalid credentials!');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container maxWidth="xs" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card variant="outlined" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                name="email"
                value={credentials.email}
                onChange={handleChange}
                label="Email"
                margin="normal"
                fullWidth
                style={{ marginBottom: '10px' }}
              />
              <TextField
                name="password"
                value={credentials.password}
                onChange={handleChange}
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                style={{ marginBottom: '10px' }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginBottom: '10px' }}>Login</Button>
            </form>
            <Box mt={2}>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
