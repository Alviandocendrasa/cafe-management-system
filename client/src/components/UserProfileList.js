import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Stack, Button, Menu, MenuItem, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { apiCall } from '../services/api';

const header = ["Role", "Permissions", ""];

const UserProfileList = () => {
    const navigate = useNavigate();
    
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(()=>{
        fetchUserProfileList();
    },[])

    const fetchUserProfileList = async () => {
        try {
            const res = await apiCall("get", `/api/user-profiles/`);

            setUserProfiles(res.data);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const getTableHead = (header) => {    
        return (
            header.map((header) => (
                <TableCell key={header}>{header}</TableCell>
            ))
        )
    }

    const getCaptalize = (text) => {
        if (!text){
            return '-';
        }
        
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const renderPermissions = (permissions) => {
        
        if (permissions.length > 0){
            permissions.sort();
            
            return (
                <Stack direction="row" spacing={1}>
                     {permissions?.map((el) => {                            
                         return (
                             <Chip key={el} label={el} />
                         )
                     })}
                </Stack>
            )
        }

        return (
            <>
                -
            </>
        )
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
                        {userProfiles.length > 0 ? userProfiles.map((up, i) => (
                            <TableRow key={i}>                            
                                <TableCell component="th" scope="row">
                                    {getCaptalize(up.role)}
                                </TableCell>
                                <TableCell>
                                    {renderPermissions(up.permissions)}
                                </TableCell>                            
                                <TableCell>
                                <Button 
                                disabled={false} 
                                id="up-button" 
                                variant="contained" 
                                size="small" 
                                onClick={() => navigate(`/user-profiles/${up._id}/edit`)}
                                >
                                    Edit
                                </Button>
                                </TableCell>
                            </TableRow>
                        )) :
                        <TableRow>
                            <TableCell colSpan={3} align='center'>
                                <Typography variant="button" gutterBottom>
                                    No user profile found
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

export default UserProfileList;