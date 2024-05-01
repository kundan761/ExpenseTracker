import { Link } from 'react-router-dom';
import './Homepage.css'; 
import { Box, Button, Typography } from '@mui/material';

const HomePage = () => {
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
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/signup"
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default HomePage;
