import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { brown, deepOrange, orange, amber, grey } from '@mui/material/colors';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './App.css';

import { removeMessage } from './store/actions';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WorkSlotsPage from './pages/WorkSlotsPage';
import WorkSlotNewPage from './pages/WorkSlotNewPage';
import ProfilePage from './pages/ProfilePage';

const theme = createTheme({
  palette: {
    primary: brown,
    secondary: grey,
  },
});

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(()=>{
      dispatch(removeMessage());
  },[location])

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <Routes>
          <Route path="/login"  element ={ <LoginPage />} />
          <Route path="/register"  element ={ <RegisterPage />} />
          <Route path="/workslots"  element ={ <WorkSlotsPage />} />
          <Route path="/workslot/new"  element ={ <WorkSlotNewPage />} />
          <Route path="/profile"  element ={ <ProfilePage />} />
        </Routes>
      </LocalizationProvider>
    </ThemeProvider>      
  )
};


export default App;
