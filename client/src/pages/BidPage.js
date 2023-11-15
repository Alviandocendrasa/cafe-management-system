import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";

import { Paper, Button, Typography, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { toast } from 'react-toastify';

import Toast from "../components/Toast";
import { apiCall } from '../services/api';

const BidPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [bidData, setBidData] = useState({});

    const [canSubmit, setCanSubmit] = useState(true); 
    const [openApprove, setOpenApprove] = useState(false);
    const [openReject, setOpenReject] = useState(false);

    useEffect(() => {
        fetchBidData();
    },[])

    const fetchBidData = async () => {
        try {
            const res = await apiCall("get", `/api/bids/${id}`);

            setBidData(res.data);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const handleReject = () => {
        updateBid({ bidStatus: 'rejected' });

        setOpenReject(false);
    }

    const handleApprove = () => {
        updateBid({ bidStatus: 'approved' });

        setOpenApprove(false);
    }

    const updateBid = async (bidData) => {
        try {
            setCanSubmit(false);
            
            const res = await apiCall("patch", `/api/bids/${id}`, bidData);
            toast.success(res.message);
        } catch(err){
            console.log(err);
            toast.error(err.message);

            setCanSubmit(true);
        }
    }

    const getTime = (time) => {
        return dayjs(time).format("DD-MM-YYYY") + " " + dayjs(time).format("hh:mm A");
    }

    return (
        <>
            <div className="form-page">
                <Toast onSuccessDone={() => navigate("/bids", { replace: true })} />

                <Paper className="paper" sx={{ minWidth: 500 }}>
                    <div className="profile">
                        <h1>Bid</h1>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Status:
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {bidData.bidStatus}
                            </Typography>
                        </div>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Start Time:
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {getTime(bidData?.workslotId?.startTime)}
                            </Typography>
                        </div>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                End Time:
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {getTime(bidData?.workslotId?.endTime)}
                            </Typography>
                        </div>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Applicant:
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {bidData?.cafeStaffId?.username}
                            </Typography>
                        </div>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Job:
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {bidData?.jobTitle}
                            </Typography>
                        </div>
                    
                        <div className="profile-group" style={{marginTop: '40px', justifyContent: 'space-around'}}>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" onClick={() => setOpenReject(true)} color="error">Reject</Button>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" onClick={() => setOpenApprove(true)}>Approve</Button>
                        </div>        

                    </div>
                </Paper>
            </div>
            <Dialog
            open={openReject}
            onClose={() => setOpenReject(false)}
            >
                <DialogTitle>
                    Confirm reject?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenReject(false)}>Cancel</Button>
                    <Button onClick={handleReject} color="error">Confirm</Button>
                </DialogActions>
            </Dialog>

            <Dialog
            open={openApprove}
            onClose={() => setOpenApprove(false)}
            >
                <DialogTitle>
                    Confirm approve?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenApprove(false)}>Cancel</Button>
                    <Button onClick={handleApprove} color="error">Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
        
    )
}

export default BidPage;