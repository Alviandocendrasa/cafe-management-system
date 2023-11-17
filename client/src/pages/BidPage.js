import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";

import { Toolbar, Paper, Button, Typography, Dialog, DialogActions, DialogTitle } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import Toast from "../components/Toast";
import { apiCall } from '../services/api';
import { ROLE } from "../constants";

const BidPage = () => {
    const { auth } = useContext(AuthContext);

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
        rejectBid();

        setOpenReject(false);
    }

    const handleApprove = () => {
        approveBid();

        setOpenApprove(false);
    }

    const approveBid = async () => {
        try {
            setCanSubmit(false);
            
            const res = await apiCall("patch", `/api/bids/approve/${id}`, {bidStatus: 'approved'});
            toast.success(res.message);
        } catch(err){
            console.log(err);
            toast.error(err.message);

            setCanSubmit(true);
        }
    }

    const rejectBid = async () => {
        try {
            setCanSubmit(false);
            
            const res = await apiCall("patch", `/api/bids/decline/${id}`, {bidStatus: 'rejected'});
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

    const handleBack = () => {
        if (auth.role === ROLE.manager){
            navigate('/bids', {replace: true})
        } else {
            navigate('/profile', {replace: true})
        }
    }

    return (
        <>
            <div className="form-page">
                <Toast onSuccessDone={() => navigate("/bids", { replace: true })} />

                <Paper className="paper" sx={{ minWidth: 500 }}>
                    <div className="profile">
                        <Toolbar sx={{justifyContent: 'space-between'}} disableGutters>
                            <Button sx={{marginLeft: '-16px'}} onClick={handleBack}>
                                <ChevronLeftIcon />
                                {auth.role === ROLE.manager ? 'Back to list' : 'Back'}
                            </Button>
                        </Toolbar>

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
                    
                       {auth.role === ROLE.manager?  
                       <div className="profile-group" style={{marginTop: '40px', justifyContent: 'space-around'}}>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" onClick={() => setOpenReject(true)} color="error">Reject</Button>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" onClick={() => setOpenApprove(true)}>Approve</Button>
                        </div> : 
                        <></>
                       }    

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