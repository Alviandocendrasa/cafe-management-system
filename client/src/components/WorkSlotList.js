import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Autocomplete, TextField, Toolbar, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Stack, Button, Menu, MenuItem, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import { apiCall } from '../services/api';
import { ROLE } from "../constants";

const header = ["Start Date", "End Date", "Pending Jobs", ""];

const WorkSlotList = () => {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();
    
    const [workslots, setWorkslots] = useState([]);
    const [focusWorkslot, setFocusWorkslot] = useState(null);
    const [anchor, setAnchor] = useState(null);

    const shouldOpen = Boolean(anchor);

    useEffect(()=>{
        fetchWorkslotList();
    },[])

    const fetchWorkslotList = async () => {
        try {
            const res = await apiCall("get", `/api/workslots`);

            setWorkslots(res.data);
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

        const id = value._id;

        switch(auth.role){
            case ROLE.manager:
                navigate(`/workslots/${id}/assign`, {replace: true});
                break;
            case ROLE.owner:
                navigate(`/workslots/${id}/edit`, {replace: true});
                break;
            case ROLE.staff:
                navigate(`/bids/${id}/new`, {replace: true});
                break;
            default:
                break;
        }
    }


    const handleOpenBid = (event, workslot) => {
        setAnchor(event.currentTarget);
        setFocusWorkslot(workslot);
    }

    const handleClose = () => {
        setAnchor(null);
        setFocusWorkslot(null);
    }

    const handleSubmitBid = (workslotId, jobTitle) => {
        const bidData = {
            jobTitle,
            workslotId,
            cafeStaffId: auth.userId,
            bidStatus: "pending"
        }

        createBid(bidData);

        handleClose();
    }

    const createBid = async (bidData) => {
        try {
            const res = await apiCall("post", `/api/bids`, bidData);

            toast.success(res.message);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const getTime = (time) => {
        return dayjs(time).format("DD-MM-YYYY") + " " + dayjs(time).format("hh:mm A");
    }

    const getUniqueJobs = (jobTitle) => {
        if (!jobTitle) return;
        
        let uniqueJobs = [];

        jobTitle.forEach((el) => {        
            if(!uniqueJobs.includes(el))
            {
                uniqueJobs.push(el);            
            }
        });
        
        uniqueJobs.sort();

        return uniqueJobs;
    }

    const getPositions = (jobTitle) => {
        let uniqueJobs = [];
        let mapNumber = {};

        jobTitle.forEach((el) => {        
            if(!uniqueJobs.includes(el))
            {
                uniqueJobs.push(el);
                mapNumber[el] = 1;
            }
            else
            {
                mapNumber[el]++;
            }
        });
        
        uniqueJobs.sort();

        return (
           <Stack direction="row" spacing={1}>
                {uniqueJobs?.map((el) => {
                    let text = el.charAt(0).toUpperCase() + el.slice(1);

                    return (
                        <Chip key={el} label={mapNumber[el] > 1 ?  `${text} x${mapNumber[el]}` : text} />
                    )
                })}
           </Stack>
        )
    }

    const getTableHead = (header) => {    
        return (
            header.map((header) => (
                <TableCell key={header}>{header}</TableCell>
            ))
        )
    }

    const sortData = (data) => {
        const compare = (a, b) => {        
            if (a.startTime === null) {
                return 1;
              }
            
              if (b.startTime === null) {
                return -1;
              }
            
              if (a.startTime === b.startTime) {
                return 0;
              }
            
              return a.startTime > b.startTime ? 1 : -1;
        }
        
        data.sort(compare);

        return data;
    }

    
    const getWorkSlots = (workslots) => {
        switch(auth.role){
            case ROLE.owner:
                return workslots;
            case ROLE.manager:
                return workslots.filter(el => el.pendingJob?.length > 0);
            case ROLE.staff:
                return workslots.filter(el => el.pendingJob?.length > 0);
            default:
                return workslots;
        }
    }

    const renderWorkSlots = (arr) => {
        if (arr.length <= 0){
            return(<TableRow>
                <TableCell colSpan={4} align='center'>
                    <Typography variant="button" gutterBottom>
                        No Workslot found
                    </Typography>
                </TableCell>                                   
            </TableRow> )
        }
        
        return sortData(arr).map((el, i) => {
            return  (<TableRow key={i}>                            
                        <TableCell component="th" scope="row">
                            {getTime(el.startTime)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {getTime(el.endTime)}
                        </TableCell>
                        <TableCell>
                            {getPositions(el.pendingJob)}
                        </TableCell>
                        <TableCell>
                            {renderButton(el)}
                        </TableCell>
                    </TableRow>)
        })
    }

    const renderButton = (workslot) => {
        switch(auth.role){
            case ROLE.owner:
                return <Button 
                        disabled={false} 
                        id="bid-button" 
                        variant="contained" 
                        size="small" 
                        onClick={() => navigate(`/workslots/${workslot._id}/edit`)}
                        >
                            Edit
                        </Button>
            case ROLE.staff:
                return <Button 
                        disabled={false} 
                        id="bid-button" 
                        variant="contained" 
                        size="small" 
                        onClick={(event) => handleOpenBid(event, workslot)}
                        >
                            Bid
                        </Button>
            case ROLE.manager:
                return <Button 
                        disabled={false} 
                        id="bid-button" 
                        variant="contained" 
                        size="small" 
                        onClick={() => navigate(`/workslots/${workslot._id}/assign`)}
                        >
                            Assign
                        </Button>
            default:
                return <></>
        }
    }

    return (
        <>
            <Toolbar sx={{justifyContent: 'space-between', margin: '32px 0'}} disableGutters>
                <Autocomplete
                sx={{width: '50ch'}}
                options={getWorkSlots(workslots)}
                getOptionLabel={option => getTime(option.startTime)}
                renderOption={(props, option) => {                
                    return (
                      <li {...props} key={option._id}>                       
                        {getTime(option.startTime)}
                      </li>
                    );
                }}

                renderInput={params => <TextField {...params} label="Search work slot by start time"/>}
                onChange={handleSearchClick}
                />              
            </Toolbar>  
            <TableContainer>
                <Table sx={{ minWidth:650 }}>
                    <TableHead>
                        <TableRow>
                        {getTableHead(header)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {renderWorkSlots(getWorkSlots(workslots))}                    
                    </TableBody>               
                </Table>          
            </TableContainer>

            {focusWorkslot ? 
             <Menu
             onClose={handleClose}
             anchorEl={anchor}
             open={shouldOpen}
             >
                {getUniqueJobs(focusWorkslot.pendingJob)?.map((jobTitle, i) => {
                        let text = jobTitle.charAt(0).toUpperCase() + jobTitle.slice(1);
                    
                    return (
                        <MenuItem key={i} onClick={() => handleSubmitBid(focusWorkslot._id, jobTitle)}>{text}</MenuItem>
                    )
                })}
             </Menu>:
             null
            }
        </>
    )
}

export default WorkSlotList;