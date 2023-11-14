import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot }  from 'react-dom/client';

import { AuthProvider } from './contexts';

import './index.css';
import App from './App';



const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);