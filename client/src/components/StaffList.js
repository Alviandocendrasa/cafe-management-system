import React, { useState, useEffect } from "react";

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { apiCall } from '../services/api';

const header = ["Username", "Available Slot", ""];

const StaffList = ({canSubmit, handleOpenMenu, pendingJobs}) => {
    const [availableStaffs, setAvailableStaffs] = useState([]);

    useEffect(()=>{
        fetchStaffUsers();
    },[])

    const fetchStaffUsers = async () => {
        try {
            const userRes = await apiCall("get", `/api/users/`);
            const bidRes = await apiCall("get", `/api/bids/`);

            const staffs = userRes.data?.filter(el => el.userProfileId?.role === 'staff');
            const arr = [];            
            console.log(staffs);
            console.log(bidRes.data);

            staffs.forEach(staff => {                
                const bids = bidRes.data.filter(bid => bid.cafeStaffId?._id === staff._id && bid.bidStatus == 'approved');
                console.log(bids);

                if(staff.maxBidSlots > bids.length){
                    let availableSlots = staff.maxBidSlots - bids.length;
                    
                    arr.push({...staff, availableSlots});
                }
            });
        
            console.log(arr);
            setAvailableStaffs(arr);
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


    const renderStaffs = (staffs) => {
        if (pendingJobs.length <= 0){
            return(<TableRow>
                <TableCell colSpan={3} align='center'>
                    <Typography variant="button" gutterBottom>
                        There is no pending job to assign
                    </Typography>
                </TableCell>                                   
            </TableRow> )
        }
        
        if (staffs.length <= 0){
            return(<TableRow>
                <TableCell colSpan={3} align='center'>
                    <Typography variant="button" gutterBottom>
                        No available staff users
                    </Typography>
                </TableCell>                                   
            </TableRow> )
        }        

        return sortData(staffs).map((el, i) => {
            return  (<TableRow key={i}>                            
                        <TableCell component="th" scope="row">
                            {el.username}
                        </TableCell>
                        <TableCell>
                            {el.availableSlots}
                        </TableCell>                            
                        <TableCell>
                        <Button 
                        disabled={!canSubmit} 
                        id="offer-button" 
                        variant="contained" 
                        size="small" 
                        onClick={(event) => handleOpenMenu(event, el._id, el.username)}
                        >
                            Assign
                        </Button>
                        </TableCell>
                    </TableRow>)
        })
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
                        {renderStaffs(availableStaffs)}                    
                    </TableBody>               
                </Table>          
            </TableContainer>
        </>
    )
}

export default StaffList;