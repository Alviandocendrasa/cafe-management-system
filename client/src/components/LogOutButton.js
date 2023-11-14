import React, {useContext} from "react";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../contexts";

import { setTokenHeader} from '../services/api';

const LogoutButton = () => {
    const { removeCurrentUser } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        setTokenHeader(false);

        removeCurrentUser();
        navigate('/login');
    }

    return (
            <Button 
            sx={{color: 'white', display: 'block', fontWeight: '900'}} 
            variant="text"
            onClick={handleLogOut}
            >
                Log Out
            </Button>
    )
}

export default LogoutButton;