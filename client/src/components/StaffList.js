import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Autocomplete, TextField, Toolbar, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { apiCall } from '../services/api';

const header = ["Username", "Max Bid Slot", "Available Slot", ""];

const StaffList = ({canSubmit, handleOpenMenu, pendingJobs, shouldAssign}) => {
    const [allStaffs, setAllStaffs] = useState([]);
    const [availableStaffs, setAvailableStaffs] = useState([]);
    const [filterAvailable, setFilterAvailable] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        fetchStaffUsers();
    },[])

    const fetchStaffUsers = async () => {
        try {
            const userRes = await apiCall("get", `/api/users/`);
            const bidRes = await apiCall("get", `/api/bids/`);

            const staffs = userRes.data?.filter(el => el.userProfileId?.role === 'staff');
            const availArr = [];   
            const allArr = [];         

            // get available slot for each staff
            staffs.forEach(staff => {                
                const bids = bidRes.data.filter(bid => bid.cafeStaffId?._id === staff._id && bid.bidStatus == 'approved');

                if(staff.maxBidSlots > bids.length){
                    let availableSlots = staff.maxBidSlots - bids.length;
                    
                    availArr.push({...staff, availableSlots});
                } 

                let availableSlots = staff.maxBidSlots - bids.length;
                
                allArr.push({...staff, availableSlots: availableSlots > 0 ? availableSlots : 0});
            });

            setAllStaffs(allArr);
            setAvailableStaffs(availArr);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }
    
    const handleSearchClick = (event, value) => {
        if (!value){
            toast.error("No value from search.");
            return;
        }
        
        const id = getIdByName(value);

        navigate(`/users/${id}`, {replace: true});
    }
    
    const getIdByName = (name) => {
        const staff = allStaffs.find(el => el.username === name);

        return staff._id;
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
        if (pendingJobs?.length <= 0){
            return(<TableRow>
                <TableCell colSpan={3} align='center'>
                    <Typography variant="button" gutterBottom>
                        There is no pending job to assign
                    </Typography>
                </TableCell>                                   
            </TableRow> )
        }
        
        if (shouldAssign && staffs.length <= 0){
            return(<TableRow>
                <TableCell colSpan={3} align='center'>
                    <Typography variant="button" gutterBottom>
                        No available staff users
                    </Typography>
                </TableCell>                                   
            </TableRow> )
        }
        
        if (staffs.length <= 0){
            return(<TableRow>
                <TableCell colSpan={3} align='center'>
                    <Typography variant="button" gutterBottom>
                        No staff users
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
                            {el.maxBidSlots}
                        </TableCell> 
                        <TableCell>
                            {el.availableSlots}
                        </TableCell>
                        <TableCell> 
                            {shouldAssign ?
                            <Button 
                            disabled={!canSubmit} 
                            id="offer-button" 
                            variant="contained" 
                            size="small" 
                            onClick={(event) => handleOpenMenu(event, el._id, el.username)}
                            >
                                Assign
                            </Button>:
                            <Button 
                            id="offer-button" 
                            variant="contained" 
                            size="small" 
                            onClick={() => navigate(`/users/${el._id}`, {replace: true})}
                            >
                                View
                            </Button>
                            }                                                 
                        </TableCell>
                    </TableRow>)
        })
    }

    return (
        <>
            <Toolbar sx={{justifyContent: 'space-between', margin: '32px 0'}} disableGutters>
                <Autocomplete
                sx={{width: '50ch'}}
                options={shouldAssign ? sortData(availableStaffs).map(el=>el.username) : sortData(allStaffs).map(el=>el.username)}
                renderInput={params => <TextField {...params} label="Search Staff"/>}
                onChange={handleSearchClick}
                />
                <Button
                variant="outlined"
                onClick={() =>  setFilterAvailable(!filterAvailable)}
                >
                    {filterAvailable ? 'Unfilter Staff' : 'Filter Staff'}
                </Button>
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth:650 }}>
                    <TableHead>
                        <TableRow>
                            {getTableHead(header)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {renderStaffs(shouldAssign || filterAvailable ? availableStaffs : allStaffs)}                    
                    </TableBody>               
                </Table>          
            </TableContainer>
        </>
    )
}

export default StaffList;