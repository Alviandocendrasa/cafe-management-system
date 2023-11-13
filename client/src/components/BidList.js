import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import BidView from "../boundaries/BidView";

const header = ["Start Date", "End Date", "Position", "Status", ""];

const BidList = ({isManager, canSubmit, setCanSubmit}) => {
    const { auth } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const [bids, setBids] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [focusBid, setFocusBid] = useState(null);

    useEffect(()=>{
        if (isManager){
            fetchAllbids();   
        }
        else{
            fetchStaffBids();
        }
    },[]);

    const fetchAllbids = async () => {
        try {
            const bidView = new BidView();
            const res = await bidView.fetchAllBids();

            setBids(res.data);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const fetchStaffBids = async () => {
        try {
            const bidView = new BidView();
            const res = await bidView.fetchBidFromStaffId(auth.userId);

            setBids(res.data);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const handleOpenDialog = (bid) => {
        setOpenDialog(true);
        setFocusBid(bid);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFocusBid(null);
    }

    const handleDeleteBid = async () => {
        try {
            setCanSubmit(false);

            const bidView = new BidView();
            const res = await bidView.deleteBid(focusBid._id);

            toast.success("Bid successfully removed!");            
        } catch(err){
            console.log(err);
            toast.error(err.message);

            setCanSubmit(true);
        }
                 
        handleCloseDialog();
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

    const getCaptilize = (text) => {
        return text?.charAt(0).toUpperCase() + text?.slice(1);
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
            if (isManager){
                return <Button 
                        id="View-button" 
                        variant="contained" 
                        size="small"
                        onClick={() => navigate(`/bids/${bid._id}/`)} 
                        >
                            View
                        </Button>;
            } else {
                return <Button 
                        disabled={!canSubmit} 
                        color="error" 
                        id="bid-button" 
                        variant="contained" 
                        size="small" 
                        onClick={() => handleOpenDialog(bid)}
                        >
                            Cancel
                        </Button>;
            }      
        }
    }

    const renderBidTable = (bids) => {
        return (
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
                                    {getCaptilize(bid.jobTitle)}
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
       );
    }

    const renderSortedBidList = () => {
        if (isManager){
            return renderBidTable(getFilteredBids('pending'));
        } else{
           return (
            <>
                <div className="bids-section">
                    <Typography variant="h6">Pending Bids</Typography>
                    {renderBidTable(getFilteredBids('pending'))}
                </div>
                <div className="bids-section">
                    <Typography variant="h6">Approved Bids</Typography>
                    {renderBidTable(getFilteredBids('approved'))}
                </div>
                <div className="bids-section">
                    <Typography variant="h6">Rejected Bids</Typography>
                    {renderBidTable(getFilteredBids('rejected'))}
                </div>
            </>
           )
        }
    }

    return (
        <>
            {renderSortedBidList()}
            <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            >
                <DialogTitle>
                    Confirm delete?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDeleteBid} color="error">Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default BidList;