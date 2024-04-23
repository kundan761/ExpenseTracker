import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, FormControlLabel, Checkbox, Link, Card, CardContent } from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    agreed: false
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.agreed) {
      alert('Please agree to the privacy policy.');
      return;
    }
    if (!validatePassword(user.password)) {
      toast.error('Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/users', user);
      toast.success('Sign up successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      setUser({
        name: '',
        email: '',
        password: '',
        agreed: false
      });
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return regex.test(password);
  };

  return (
    <Container
      maxWidth="sm"
      style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Card variant="outlined" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '100%' }}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                name="name"
                value={user.name}
                onChange={handleChange}
                label="Full Name"
                margin="normal"
                fullWidth
                style={{ marginBottom: '10px' }}
              />
              <TextField
                name="email"
                value={user.email}
                onChange={handleChange}
                label="Email"
                margin="normal"
                fullWidth
                style={{ marginBottom: '10px' }}
              />
              <TextField
                name="password"
                value={user.password}
                onChange={handleChange}
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                style={{ marginBottom: '10px' }}
              />
              <div style={{ fontSize: '12px', marginBottom: '10px', textAlign: 'left' }}>
                Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.
              </div>
              <FormControlLabel
                control={<Checkbox checked={user.agreed} onChange={handleChange} name="agreed" />}
                label="I agree to the privacy policy"
                style={{ marginBottom: '10px' }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginBottom: '10px' }}>Sign Up</Button>
            </form>
            <Box mt={2}>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign In
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default Signup;
