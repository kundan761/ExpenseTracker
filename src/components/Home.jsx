import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Homepage.css'; 
import { Box, Button, Typography } from '@mui/material';
import { logout } from '../Redux/userSlice'; 

const HomePage = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <Box className="homePageContainer">
      <Box className="centerText">
        <Typography variant="h4" gutterBottom>
          Welcome to ExpenseTracker!
        </Typography>
        <Typography variant="body1" paragraph>
          Keep track of your expenses with ease.
        </Typography>
      </Box>
      {user ? (
        <Button
          variant="contained"
          color="secondary" 
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/signup"
        >
          Sign Up
        </Button>
      )}
    </Box>
  );
};

export default HomePage;
