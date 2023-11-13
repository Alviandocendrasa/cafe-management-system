import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { brown, deepOrange, orange, amber, grey, pink, red } from '@mui/material/colors';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './App.css';

import { AuthProvider } from './contexts';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WorkSlotsPage from './pages/WorkSlotsPage';
import WorkSlotNewPage from './pages/WorkSlotNewPage';
import WorkSlotEditPage from './pages/WorkSlotEditPage';
import BidsPage from './pages/BidsPage';
import BidPage from './pages/BidPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import UserEditPage from './pages/UserEditPage';
import ProfilePage from './pages/ProfilePage';

const theme = createTheme({
  palette: {
    primary: brown,
    secondary: grey,
    error: red
  },
});

const App = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/login"  element ={ <LoginPage />} />
            <Route path="/register"  element ={ <RegisterPage />} />
            <Route path="/workslots"  element ={ <WorkSlotsPage />} />
            <Route path="/workslots/new"  element ={ <WorkSlotNewPage />} />
            <Route path="/workslots/:id/edit"  element ={ <WorkSlotEditPage />} />
            <Route path="/bids"  element ={ <BidsPage />} />
            <Route path="/bids/:id"  element ={ <BidPage />} />
            <Route path="/users"  element ={ <UsersPage />} />
            <Route path="/users/:id"  element ={ <UserPage />} />
            <Route path="/users/:id/edit"  element ={ <UserEditPage />} />
            <Route path="/profile"  element ={ <ProfilePage />} />
          </Routes>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>      
  )
};


export default App;
