import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

import Navbar from './components/Navbar';
import Test from './components/Test';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import StaffList from './components/Staff';

const App = () => (

  <Router>

      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/Test"  element ={ <Test />} />
          <Route path="/Login"  element ={ <LoginForm />} />
          <Route path="/Staff"  element ={ <StaffList />} />
          <Route path="/Profile"  element ={ <Profile />} />
        </Routes>
      </div>
      
  </Router>
);

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

export default App;
