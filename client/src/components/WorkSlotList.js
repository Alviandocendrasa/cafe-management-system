import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Stack, Button, Menu, MenuItem, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import { apiCall } from '../services/api';
import { ROLE } from "../constants";

const header = ["Start Date", "End Date", "Positions", ""];

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

    const renderWorkSlots = (workslots) => {
        const arr = workslots.filter(el => el.pendingJob?.length > 0);

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
            <TableContainer>
                <Table sx={{ minWidth:650 }}>
                    <TableHead>
                        <TableRow>
                            {getTableHead(header)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {renderWorkSlots(workslots)}                    
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