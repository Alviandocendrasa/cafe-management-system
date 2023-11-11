import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Stack, Button, Menu, MenuItem, Typography } from '@mui/material';

import { fetchWorkslots, createBid } from '../store/actions';

const header = ["Start Date", "End Date", "Positions"];

const WorkSlotList = ({data, canBid, handleBid}) => {
    const loading = useSelector(state => state.loading);
    const auth = useSelector(state => state.auth);
    const workslots = useSelector(state => state.workslots);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [anchor, setAnchor] = useState(null);
    const [forcusWorkslot, setFocusWorkslot] = useState(null);

    const shouldOpen = Boolean(anchor);

    useEffect(()=>{
        const fetchData = async () => {
            await dispatch(fetchWorkslots());
        }

        fetchData();
    },[])

    const handleOpen = (event, workslot) => {
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
            cafeStaffId: auth.user.userId,
            bidStatus: "pending"
        }

        dispatch(createBid(bidData, navigate));

        handleClose();
    }

    const getTime = (time) => {
        return dayjs(time).format("DD/MM/YYYY") + " " + dayjs(time).format("HH:mm");
    }

    const getUniqueRoles = (jobTitle) => {
        let uniqueRoles = [];

        jobTitle.forEach((el) => {        
            if(!uniqueRoles.includes(el))
            {
                uniqueRoles.push(el);            
            }
        });
        
        uniqueRoles.sort();

        return uniqueRoles;
    }

    const getPositions = (jobTitle) => {
        let uniqueRoles = [];
        let mapNumber = {};

        jobTitle.forEach((el) => {        
            if(!uniqueRoles.includes(el))
            {
                uniqueRoles.push(el);
                mapNumber[el] = 1;
            }
            else
            {
                mapNumber[el]++;
            }
        });
        
        uniqueRoles.sort();

        return (
           <Stack direction="row" spacing={1}>
                {uniqueRoles?.map((el) => {
                    let text = el.charAt(0).toUpperCase() + el.slice(1);

                    return (
                        <Chip key={el} label={mapNumber[el] > 1 ?  `${text} x${mapNumber[el]}` : text} />
                    )
                })}
           </Stack>
        )
    }

    const getTableHead = (header) => {    
        if (canBid && !header.includes("")) {
            header.push("");
        }

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
                        {workslots.length > 0 ? sortData(workslots).map((workslot, i) => (
                            <TableRow key={i}>                            
                                <TableCell component="th" scope="row">
                                    {getTime(workslot.startTime)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {getTime(workslot.endTime)}
                                </TableCell>
                                <TableCell>
                                    {getPositions(workslot.pendingJob)}
                                </TableCell>
                                {canBid ? 
                                    <>
                                        <TableCell>
                                            <Button disabled={false} id="bid-button" variant="contained" size="small" onClick={(event) => handleOpen(event, workslot)} >Bid</Button>
                                        </TableCell>                                                                       
                                    </> :
                                    null                              
                                }
                            </TableRow>
                        )) : <></>
                        }                    
                    </TableBody>               
                </Table>          
            </TableContainer>
            {forcusWorkslot ? 
             <Menu
             onClose={handleClose}
             anchorEl={anchor}
             open={shouldOpen}
             >
                {getUniqueRoles(forcusWorkslot.pendingJob)?.map((jobTitle, i) => {
                        let text = jobTitle.charAt(0).toUpperCase() + jobTitle.slice(1);
                    
                    return (
                        <MenuItem key={i} onClick={() => handleSubmitBid(forcusWorkslot._id, jobTitle)}>{text}</MenuItem>
                    )
                })}
             </Menu>:
             null
            }
        </>
    )
}

export default WorkSlotList;