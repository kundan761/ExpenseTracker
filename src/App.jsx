// import './App.css'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import HomePage from './components/Home';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { AuthProvider } from './contextApi/AuthContext';
// const theme = createTheme();
// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//     <Router>
//       <AuthProvider>
//       <Navbar />
//       <Routes>
//         <Route path='/' element={<HomePage/>}/>
//         <Route path="/dashboard/*" element={<Dashboard/>} />
//         <Route path="/signup" element={<Signup/>} />
//         <Route path="/login" element={<Login/>} />
//       </Routes>
//       </AuthProvider>
//     </Router>
//     </ThemeProvider>
//   );
// };

// export default App;



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import HomePage from './components/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from './contextApi/AuthContext.jsx'; // Make sure the path is correct

const theme = createTheme();

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider> {/* Make sure AuthProvider is wrapping the entire application */}
            <Navbar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
  );
};

export default App;
