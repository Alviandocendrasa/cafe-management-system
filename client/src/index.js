import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot }  from 'react-dom/client';
import { Provider } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import './index.css';
import App from './App';
import { configureStore } from './store';
import { setAuthToken, setCurrentUser, logout } from './store/actions';

const store = configureStore();

const root = createRoot(document.getElementById("root"));

if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    
    // prevent someone from manully tampering with the key of jwtToken in localStorage
    try {
        // repopulate redux state with jwtToken in localStorage
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch(err){
        store.dispatch(logout());
    }
}
else
{
    store.dispatch(logout());
}

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);