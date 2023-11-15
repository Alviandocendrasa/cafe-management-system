import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

import { Autocomplete, TextField, Toolbar, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import { apiCall } from '../services/api';
import { ROLE } from "../constants";

const header = ["Start Date", "End Date", "Job", "Status", ""];

const BidList = () => {
    const { auth } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const [bids, setBids] = useState([]);

    useEffect(()=>{
        if (auth.role === ROLE.manager){
            fetchAllbids();   
        }
        else{
            fetchStaffBids();
        }
    },[]);

    const fetchAllbids = async () => {
        try {
            const res = await apiCall("get", `/api/bids/`);

            setBids(res.data);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const fetchStaffBids = async () => {
        try {
            const res = await apiCall("get", `/api/bids/cafe-staff-id/${auth.userId}`);

            setBids(res.data);
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
                navigate(`/bids/${id}`, {replace: true});
                break;
            case ROLE.staff:
                if(value.bidStatus === 'pending')
                {
                    navigate(`/bids/${id}/edit`, {replace: true});
                } else {
                    navigate(`/bids/${id}/`, {replace: true});
                }   

                break;
            default:
                break;
        }
    }

    const getTime = (time) => {
        return dayjs(time).format("DD-MM-YYYY") + " " + dayjs(time).format("hh:mm A");
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

    const getPendingBids = () => {
        return bids.filter(b => (b.bidStatus === 'pending'));
    }

    const getApprovedBids = () => {
        return bids.filter(b => (b.bidStatus === 'approved'));
    }

    const getRejectedBids = () => {
        return bids.filter(b => (b.bidStatus === 'rejected'));
    }

    const getFilteredBids = (type) => {
        switch(type){
            case 'pending':
                return sortData(getPendingBids());
            case 'approved':
                return sortData(getApprovedBids());
            case 'rejected':
                return sortData(getRejectedBids());
            default:
                return sortData(bids);
        }
    }

    const renderButton = (bid) => {
        if (bid.bidStatus === 'pending'){
            if (auth.role === ROLE.manager){
                return <Button 
                        id="view-button" 
                        variant="contained" 
                        size="small"
                        onClick={() => navigate(`/bids/${bid._id}/`)} 
                        >
                            View
                        </Button>;
            } else {
                return <Button 
                        id="bid-button" 
                        variant="contained" 
                        size="small" 
                        // onClick={() => handleOpenDialog(bid)}
                        onClick={() => navigate(`/bids/${bid._id}/edit`)}
                        >
                            Edit
                        </Button>;
            }      
        }
    }

    const renderBidTable = (bids) => {
        return (
            <>
                <Toolbar sx={{justifyContent: 'space-between', margin: '32px 0'}} disableGutters>
                    <Autocomplete
                    sx={{width: '50ch'}}
                    options={bids}
                    getOptionLabel={option => getTime(option.workslotId?.startTime)}
                    renderOption={(props, option) => {                
                        return (
                            <li {...props} key={option._id}>                       
                            {getTime(option.workslotId?.startTime)}
                            </li>
                        );
                    }}

                    renderInput={params => <TextField {...params} label="Search bid by start time"/>}
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
                            {bids.length > 0 ? 
                            bids.map((bid, i) => (
                                <TableRow key={i}>                            
                                    <TableCell component="th" scope="row">
                                        {getTime(bid?.workslotId?.startTime)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {getTime(bid?.workslotId?.endTime)}
                                    </TableCell>
                                    <TableCell>
                                        {getCaptalize(bid.jobTitle)}
                                    </TableCell>
                                    <TableCell>
                                        {bid.bidStatus}
                                    </TableCell>
                                    <TableCell>
                                    {renderButton(bid)}
                                    </TableCell>                                                                       
                                </TableRow>
                            )): 
                            <TableRow>
                                <TableCell colSpan={4} align='center'>
                                    <Typography variant="button" gutterBottom>
                                        No Bid
                                    </Typography>
                                </TableCell>                                   
                            </TableRow>
                            }                    
                        </TableBody>                 
                    </Table>          
                </TableContainer>            
            </>
       );
    }

    const renderSortedBidList = () => {
        if (auth.role === ROLE.manager){
            return renderBidTable(getFilteredBids('pending'));
        } else{
           return (
            <>
                <div className="bids-section">
                    <Typography variant="h6">Pending Work Slots</Typography>
                    {renderBidTable(getFilteredBids('pending'))}
                </div>
                <div className="bids-section">
                    <Typography variant="h6">Approved Work Slots</Typography>
                    {renderBidTable(getFilteredBids('approved'))}
                </div>
                <div className="bids-section">
                    <Typography variant="h6">Rejected Work Slots</Typography>
                    {renderBidTable(getFilteredBids('rejected'))}
                </div>
            </>
           )
        }
    }

    return (
        <>
            {renderSortedBidList()}        
        </>
    )
}

export default BidList;