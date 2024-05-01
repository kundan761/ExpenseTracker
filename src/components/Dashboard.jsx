import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import Tracker from '../DashboardComponents/Tracker';
import Analytics from '../DashboardComponents/Analytics';
import History from '../DashboardComponents/History';
import { Box, Button } from '@mui/material';

const Dashboard = () => {
  const user = useSelector(state => state.user.value);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Redirect to login page if not logged in
    if (!user) {
      navigate('/login');
    }

    // Redirect to /dashboard/tracker if on /dashboard
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/tracker');
    }
  }, [user, navigate, location]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" width="100%">
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Box mt={2} display="flex" flexDirection="row" alignItems="center" justifyContent="center" width="100%">
          <Button component={Link} to="tracker" style={{ marginRight: 10 }}>Tracker</Button>
          <Button component={Link} to="analytics" style={{ marginRight: 10 }}>Analytics</Button>
          <Button component={Link} to="history">History</Button>
        </Box>
        <Routes>
          <Route path="tracker" element={<Tracker />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="history" element={<History userId={user?.id} />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
