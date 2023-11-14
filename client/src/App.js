import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { brown, grey } from '@mui/material/colors';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './App.css';
import { AuthContext } from './contexts';


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

import ProtectedRoute from './protected/ProtectedRoute';
import { ROLE } from './constants';

const theme = createTheme({
  palette: {
    primary: brown,
    secondary: grey
  },
});

const App = () => {
  console.log(process.env);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login"  element ={<LoginPage />} />
            <Route element={<ProtectedRoute allowedRoles={['owner', 'manager', 'staff']}/>}>
              <Route path="/workslots"  element ={<WorkSlotsPage />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['owner']}/>}>
              <Route path="/workslots/new"  element ={<WorkSlotNewPage />} />
              <Route path="/workslots/:id/edit"  element ={<WorkSlotEditPage />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['manager']}/>}>
              <Route path="/workslots/:id/assign"  element ={<WorkSlotAssignPage />} />
              <Route path="/bids"  element ={<BidsPage />} />
              <Route path="/bids/:id"  element ={<BidPage />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
              <Route path="/users"  element ={<UsersPage />} />
              <Route path="/users/new"  element ={<UserNewPage />} />
              <Route path="/users/:id"  element ={<UserPage />} />
              <Route path="/users/:id/edit"  element ={<UserEditPage />} />
              <Route path="/user-profiles"  element ={<UserProfilePage />} />
              <Route path="/user-profiles/new"  element ={<UserProfileNewPage />} />
              <Route path="/user-profiles/:id/edit"  element ={<UserProfileEditPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile"  element ={<ProfilePage />} />
            </Route>
          </Routes>
      </LocalizationProvider>
    </ThemeProvider>      
  )
};

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(switchWithRole());
  },[])

  const switchWithRole = () => {
    if (!auth.isAuth){
      return "/login";
    }
    
    switch(auth.role){
      case ROLE.admin:
        return "/users";
      case ROLE.owner:
        return "/workslots";
      case ROLE.manager:
        return "/bids";
      case ROLE.staff:
        return "/workslots";
      default:
        return "/";
    }
  }

  return <></>;
}


export default App;
