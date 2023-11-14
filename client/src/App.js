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
import WorkSlotsPage from './pages/WorkSlotsPage';
import WorkSlotNewPage from './pages/WorkSlotNewPage';
import WorkSlotEditPage from './pages/WorkSlotEditPage';
import WorkSlotAssignPage from './pages/WorkSlotAssignPage';
import BidsPage from './pages/BidsPage';
import BidPage from './pages/BidPage';
import UserNewPage from './pages/UserNewPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import UserEditPage from './pages/UserEditPage';
import UserProfilePage from './pages/UserProfilesPage';
import UserProfileNewPage from './pages/UserProfileNewPage';
import UserProfileEditPage from './pages/UserProfileEditPage';
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
            <Route path="/workslots"  element ={ <WorkSlotsPage />} />
            <Route path="/workslots/new"  element ={ <WorkSlotNewPage />} />
            <Route path="/workslots/:id/edit"  element ={ <WorkSlotEditPage />} />
            <Route path="/workslots/:id/assign"  element ={ <WorkSlotAssignPage />} />
            <Route path="/bids"  element ={ <BidsPage />} />
            <Route path="/bids/:id"  element ={ <BidPage />} />
            <Route path="/users"  element ={ <UsersPage />} />
            <Route path="/users/new"  element ={ <UserNewPage />} />
            <Route path="/users/:id"  element ={ <UserPage />} />
            <Route path="/users/:id/edit"  element ={ <UserEditPage />} />
            <Route path="/user-profiles"  element ={ <UserProfilePage />} />
            <Route path="/user-profiles/new"  element ={ <UserProfileNewPage />} />
            <Route path="/user-profiles/:id/edit"  element ={ <UserProfileEditPage />} />
            <Route path="/profile"  element ={ <ProfilePage />} />
          </Routes>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>      
  )
};


export default App;
