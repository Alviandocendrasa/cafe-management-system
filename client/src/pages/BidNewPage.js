import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";

import { Paper, Button, Typography, Dialog, DialogActions, DialogTitle, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import Toast from "../components/Toast";
import { apiCall } from '../services/api';

const BidNewPage = () => {
    const { auth } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const { id } = useParams();

    const [jobTitle, setJobtitle] = useState("");
    const [workslotData, setWorkslotData] = useState({});
    const [canSubmit, setCanSubmit] = useState(true); 
    const [openConfirm, setOpenConfirm] = useState(false);

    useEffect(() => {
        fetchBidData();
    },[])

    const fetchBidData = async () => {
        try {
            const res = await apiCall("get", `/api/workslots/${id}`);

            setWorkslotData(res.data);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const handleJobChange = (event) => {
        setJobtitle(event.target.value);
    }

    const handleSubmitBid = () => {
        setOpenConfirm(false);

        const bidData = {
            jobTitle,
            workslotId: id,
            cafeStaffId: auth.userId,
            bidStatus: "pending"
        }

        createBid(bidData);
    }

    const createBid = async (bidData) => {
        try {
            setCanSubmit(false);
            
            const res = await apiCall("post", `/api/bids`, bidData);

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
                <Toast onSuccessDone={() => navigate("/workslots", { replace: true })} />

                <Paper className="paper" sx={{ minWidth: 500 }}>
                    <div className="profile">
                        <h1>Make Bid</h1>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Start Time:
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {getTime(workslotData.startTime)}
                            </Typography>
                        </div>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                End Time:
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {getTime(workslotData.endTime)}
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
                            value={jobTitle}                            
                            >
                                {getUniqueJobs(workslotData?.pendingJob)?.map((jobTitle, i) => {
                                    let text = jobTitle.charAt(0).toUpperCase() + jobTitle.slice(1);
                                    
                                    return (
                                        <MenuItem key={i} value={jobTitle}>{text}</MenuItem>
                                    )
                                })}
                            </Select>
                        </div>
                    
                        <div className="profile-group" style={{marginTop: '40px', justifyContent: 'space-around'}}>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" onClick={() => navigate('/workslots', {replace: true})} color="secondary">Back</Button>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" onClick={() => setOpenConfirm(true)}>Submit</Button>
                        </div>        

                    </div>
                </Paper>
            </div>
            <Dialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            >
                <DialogTitle>
                    Confirm make bid?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
                    <Button onClick={handleSubmitBid} color="error">Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
        
    )
}

export default BidNewPage;