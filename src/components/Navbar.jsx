// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../Redux/userSlice';
// import { AppBar, Button, Toolbar, Typography } from '@mui/material';

// const Navbar = () => {
//   const user = useSelector(state => state.user.value);
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar style={{ justifyContent: 'space-evenly' }}>
//         <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
//           Expense Tracker
//         </Typography>
//         <Button color="inherit" component={Link} to="/dashboard/*">Dashboard</Button>
//         {user ? (
//           <>
//             <Button color="inherit" onClick={handleLogout}>Logout</Button>
//             <Typography variant="h6">{user.name.toUpperCase()}</Typography>
//           </>
//         ) : (
//           <>
//             <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
//             <Button color="inherit" component={Link} to="/login">Login</Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;


// Navbar.jsx
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/userSlice';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-evenly' }}>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Expense Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard/*">Dashboard</Button>
        {user ? (
          <>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            <Typography variant="h6">{user.name.toUpperCase()}</Typography>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
