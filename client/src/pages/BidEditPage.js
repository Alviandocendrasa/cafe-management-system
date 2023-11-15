import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";

import { Paper, Button, Typography, Dialog, DialogActions, DialogTitle, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

import Toast from "../components/Toast";
import { apiCall } from '../services/api';

const BidEditPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [bidData, setBidData] = useState({});
    const [canSubmit, setCanSubmit] = useState(true); 
    const [openApprove, setOpenApprove] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);

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

    const handleJobChange = (event) => {        
        setBidData(prevState => (
            {
                ...prevState,
                jobTitle: event.target.value
            }
        ));
    }

    const handleUpdate = () => {
        setOpenApprove(false);

        updateBid({ jobTitle: bidData.jobTitle });
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

    const handleRemove = () => {
        setOpenRemove(false);

        cancelBid();
    }

    const cancelBid = async () => {
        try {
            setCanSubmit(false);

            const res = await apiCall("delete", `/api/bids/${id}`);
         
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

    const getUniqueJobs = (jobTitle) => {
        let uniqueJobs = [];

        jobTitle?.forEach((el) => {        
            if(!uniqueJobs.includes(el))
            {
                uniqueJobs.push(el);            
            }
        });
        
        uniqueJobs.sort();

        return uniqueJobs;
    }

    return (
        <>
            <div className="form-page">
                <Toast onSuccessDone={() => navigate("/profile", { replace: true })} />

                <Paper className="paper" sx={{ minWidth: 500 }}>
                    <div className="profile">
                        <h1>Edit Bid</h1>

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

                        <div className="profile-group" style={{marginTop: '16px'}}>
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Job:
                            </Typography>
                            <Select
                            sx={{ width: '20ch' }}
                            id="jobTitle"
                            name="jobTitle"
                            onChange={handleJobChange}
                            value={bidData.jobTitle ? bidData.jobTitle : ""}                            
                            >
                                {getUniqueJobs(bidData.workslotId?.pendingJob)?.map((jobTitle, i) => {
                                    let text = jobTitle.charAt(0).toUpperCase() + jobTitle.slice(1);
                                    
                                    return (
                                        <MenuItem key={i} value={jobTitle}>{text}</MenuItem>
                                    )
                                })}
                            </Select>
                        </div>
                    
                        <div className="profile-group" style={{marginTop: '40px', justifyContent: 'space-around'}}>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" onClick={() => setOpenRemove(true)} color="error">Remove</Button>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" onClick={() => setOpenApprove(true)}>Update</Button>
                        </div>        

                    </div>
                </Paper>
            </div>
            <Dialog
            open={openRemove}
            onClose={() => setOpenRemove(false)}
            >
                <DialogTitle>
                    Confirm remove bid?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenRemove(false)}>Cancel</Button>
                    <Button onClick={handleRemove} color="error">Confirm</Button>
                </DialogActions>
            </Dialog>

            <Dialog
            open={openApprove}
            onClose={() => setOpenApprove(false)}
            >
                <DialogTitle>
                    Confirm update bid?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenApprove(false)}>Cancel</Button>
                    <Button onClick={handleUpdate} color="error">Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
        
    )
}

export default BidEditPage;