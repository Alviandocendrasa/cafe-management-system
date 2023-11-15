import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";

import { Toolbar, Card, CardContent, Menu, MenuItem, Button, Chip, Stack, Typography, Dialog, DialogActions, DialogTitle } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import Toast from "../components/Toast";
import StaffList from "../components/StaffList";

import { apiCall } from '../services/api';

const WorkSlotAssignPage = () => {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const { id } = useParams();

    const currentDate = new Date();
    currentDate.setHours(10, 0, 0, 0);

    const [workslotData, setWorkslotData] = useState({
        startTime: currentDate,
        endTime: currentDate,
        cafeManagerId: auth.userId,
        pendingJob: [],
        approvedJob: []
    });

    const [currentJobTitle, setCurrentJobTitle] = useState("");
    const [currentStaff, setCurrentStaff] = useState({
        staffId: "",
        staffName: ""
    }); 
    const [canSubmit, setCanSubmit] = useState(true); 
    const [openDialog, setOpenDialog] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);

    const shouldOpenMenu = Boolean(menuAnchor);

    useEffect(() => {
        fetchWorkSlotData();
    },[])

    const fetchWorkSlotData = async () => {
        try {
            const res = await apiCall("get", `/api/workslots/${id}`);

            setWorkslotData(res.data);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }
  
    const handleOpenMenu = (event, staffId, staffName) => {
        const staff = {
            staffId,
            staffName
        }
        
        setMenuAnchor(event.currentTarget);
        setCurrentStaff(staff);    
    }

    const handleClose = () => {
        setCurrentStaff({});
        setCurrentJobTitle("");
        setMenuAnchor(null);
        setOpenDialog(false);
    }

    const handleCancelDialog = () => {
        setOpenDialog(false);
        setCurrentJobTitle("");
    }

    const handleAssignment = (jobTitle) => {
        setOpenDialog(true);
        setCurrentJobTitle(jobTitle);
    }

    const handleSubmit = (event) => { 
        // Prevent page reload
        event.preventDefault();

        const bidData = {
            cafeStaffId: currentStaff.staffId,
            jobTitle: currentJobTitle,
            bidStatus: 'approved',
            workslotId: id
        }

        assignJob(bidData);
    };

    const assignJob = async (bidData) => {
        try {
            handleClose();
            setCanSubmit(false);
            
            const bidRes = await apiCall("post", `/api/bids`, bidData); 

            await apiCall("patch", `/api/bids/approve/${bidRes.data._id}`, bidData);  
            
            toast.success('Successfully assign job.');
        } catch(err){
            console.log(err);
            toast.error(err.message);

            setCanSubmit(true);
        }
    }

    const getUniqueJobs = (jobs) => {
        let uniqueJobs = [];

        jobs.forEach((el) => {        
            if(!uniqueJobs.includes(el))
            {
                uniqueJobs.push(el);            
            }
        });
        
        uniqueJobs.sort();

        return uniqueJobs;
    }

    const getTime = (time) => {
        return dayjs(time).format("DD-MM-YYYY") + " " + dayjs(time).format("hh:mm A");
    }

    const getCaptalize = (text) => {
        if (!text){
            return '-';
        }
        
        return text.charAt(0).toUpperCase() + text.slice(1);
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

    return (
        <>
            <div className="form-page">
                <Toast onSuccessDone={() => navigate(0, { replace: true })} />

                <Card className="paper" sx={{ minWidth: 720 }}>
                    <div className="profile">
                        <CardContent>
                            <Toolbar sx={{justifyContent: 'space-between'}} disableGutters>
                                <Button sx={{marginLeft: '-16px'}} onClick={() => navigate('/workslots', {replace: true})}>
                                    <ChevronLeftIcon />
                                    {'Back to list'}
                                </Button>
                            </Toolbar>

                            <h1>Assign Work Slot</h1>

                            <div className="profile-group">
                                <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                    Start Time::
                                </Typography>
                                <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                    {getTime(workslotData?.workId?.startTime)}
                                </Typography>
                            </div>

                            <div className="profile-group">
                                <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                    End Time:
                                </Typography>
                                <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                    {getTime(workslotData?.workId?.endTime)}
                                </Typography>
                            </div>

                            <div className="profile-group" style={{margin: "16px 0"}}>
                                <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                    Pending Jobs:
                                </Typography>                               
                                {getPositions(workslotData.pendingJob)}
                            </div>
                            <div>
                            </div>
                        </CardContent>
                        <StaffList shouldAssign={true} pendingJobs={workslotData.pendingJob} canSubmit={canSubmit} handleOpenMenu={handleOpenMenu}/>                      
                    </div>
                </Card>
            </div>

            {currentStaff ? 
             <Menu
             onClose={handleClose}
             anchorEl={menuAnchor}
             open={shouldOpenMenu}
             >
                {getUniqueJobs(workslotData.pendingJob).map((job, i) => (
                        <MenuItem key={i} onClick={() => handleAssignment(job)}>{getCaptalize(job)}</MenuItem>
                    )
                )}
             </Menu>:
             null
            }


            <Dialog
            open={openDialog}
            onClose={handleClose}
            >
                <DialogTitle>
                    {currentJobTitle && currentStaff ? 
                    `Confirm assign ${currentJobTitle} to ${currentStaff.staffName}?`: 
                    `Confirm assign this job to this staff?`
                    }
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCancelDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} color="error">Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
        
    )
}

export default WorkSlotAssignPage;