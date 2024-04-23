/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from '../Redux/userSlice'; // Import login action
import { TextField, Button, Container, Card, CardContent, Box } from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Use Redux's useDispatch hook

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await axios.get('http://localhost:3001/users');
      const user = users.data.find(user => user.email === credentials.email && user.password === credentials.password);
      if (user) {
        toast.success('Login successful!');
        dispatch(login(user)); // Dispatch the login action with the user as payload
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast.error('Invalid credentials!');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Card variant="outlined" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
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
      <ToastContainer />
    </Container>
  );
};

export default Login;
