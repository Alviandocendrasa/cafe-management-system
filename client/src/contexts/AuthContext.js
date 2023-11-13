import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const getInitAuthState = () => {
    const auth = localStorage.getItem("auth");

    return auth ?  JSON.parse(auth) : {};
}

export const AuthProvider = props => {
    const [auth, setAuth] = useState(getInitAuthState);

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    const setCurrentUser = (user) => {
        setAuth({
            isAuthenticated: true,
            role: user.role,
            userId: user.userId,
            profile: user
        });
    };
    
    const removeCurrentUser = () => {
        localStorage.removeItem("auth");
        setAuth({});
    }

    return (
        <AuthContext.Provider value={{auth, setCurrentUser, removeCurrentUser}}>
            {props.children}
        </AuthContext.Provider>
    );
};