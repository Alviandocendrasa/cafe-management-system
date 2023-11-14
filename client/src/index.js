import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot }  from 'react-dom/client';
import jwtDecode from 'jwt-decode';

import { AuthProvider } from './contexts';

import './index.css';
import App from './App';
import { setTokenHeader } from './services/api';

if(localStorage.jwtToken){
    setTokenHeader(localStorage.jwtToken);
}

const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);