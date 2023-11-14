import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import UserView from "../boundaries/UserView";

const header = ["Username", "Role", ""];

const UserList = () => {
    const navigate = useNavigate();
    
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            const userView = new UserView();
            const res = await userView.fetchAllUsers();

            setUsers(res.data);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const sortData = (data) => {
        const compare = (a, b) => {        
            if (a.username === null) {
                return 1;
              }
            
              if (b.username === null) {
                return -1;
              }
            
              if (a.username === b.username) {
                return 0;
              }
            
              return a.username > b.username ? 1 : -1;
        }
        
        data.sort(compare);

        return data;
    }

    const getTableHead = (header) => {    
        return (
            header.map((header) => (
                <TableCell key={header}>{header}</TableCell>
            ))
        )
    }

    const getCaptilize = (text) => {
        if (!text){
            return 'Unknown';
        }
        
        return text?.charAt(0).toUpperCase() + text?.slice(1);
    }

    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth:650 }}>
                    <TableHead>
                        <TableRow>
                            {getTableHead(header)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.length > 0 ? sortData(users).map((user, i) => (
                            <TableRow key={i}>                            
                                <TableCell component="th" scope="row">
                                    {user.username}
                                </TableCell>
                                <TableCell>
                                    {getCaptilize(user?.userProfileId?.role)}
                                </TableCell>                            
                                <TableCell>
                                <Button 
                                disabled={false} 
                                id="bid-button" 
                                variant="contained" 
                                size="small" 
                                onClick={() => navigate(`/users/${user._id}`)}
                                >
                                    View
                                </Button>
                                </TableCell>
                            </TableRow>
                        )) :
                        <TableRow>
                            <TableCell colSpan={3} align='center'>
                                <Typography variant="button" gutterBottom>
                                    No user found
                                </Typography>
                            </TableCell>                                   
                        </TableRow> 
                        }                    
                    </TableBody>               
                </Table>          
            </TableContainer>
        </>
    )
}

export default UserList;