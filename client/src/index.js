import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot }  from 'react-dom/client';
import { Provider } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import './index.css';
import App from './App';
import { setTokenHeader} from './services/api';


const root = createRoot(document.getElementById("root"));

if(localStorage.jwtToken){
    setTokenHeader(localStorage.jwtToken);
    
    // // prevent someone from manully tampering with the key of jwtToken in localStorage
    // try {
    //     // repopulate redux state with jwtToken in localStorage
    //     store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    // } catch(err){
    //     store.dispatch(logout());
    // }
}

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);