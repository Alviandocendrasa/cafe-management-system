import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";

import { Paper, FormControl, InputLabel, IconButton, Button, Select, MenuItem, Stack, Chip, Typography, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import Toast from "../components/Toast";
import { apiCall } from '../services/api';

const jobRoles = ['barista', 'cashier', 'chef', 'waiter'];

const WorkSlotEditPage = () => {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const { id } = useParams();

    const currentDate = new Date();
    currentDate.setHours(10, 0, 0, 0);

    const [formData, setFormData] = useState({
        pendingJob: [],
        approvedJob: [],
        startTime: currentDate,
        endTime: currentDate,
        cafeManagerId: auth.userId
    });

    const [currentJob, setCurrentJob] = useState(""); 
    const [canSubmit, setCanSubmit] = useState(true); 
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchWorkslotData();
    },[])

    const fetchWorkslotData = async () => {
        try {
            const res = await apiCall("get", `/api/workslots/${id}`);

            setFormData({
                pendingJob: res.data.pendingJob,
                approvedJob: res.data.approvedJob,
                startTime: res.data.startTime,
                endTime: res.data.endTime,
                cafeManagerId: res.data.cafeManagerId
            });
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }
  
    const handleAddJob = () => {
        if (!currentJob) return; 

        setFormData(prevState => (
            {
                ...prevState,
                pendingJob: [...prevState.pendingJob, currentJob]
            }
        ));

        setCurrentJob("");
    }

    const handleRemoveJob = (el) => {
        const arr = formData.pendingJob;
        const index = arr.indexOf(el);
        arr.splice(index, 1);
        
        setFormData(prevState => (
            {
                ...prevState,
                pendingJob: arr
            }
        ));
    }

    const handleStartingTime = (value) => {
        setFormData(prevState => (
            {
                ...prevState,
                startTime: value.toDate()
            }
        ));
    }

    const handleEndingTime = (value) => {
        setFormData(prevState => (
            {
                ...prevState,
                endTime: value.toDate()
            }
        ));
    }

    const handleDelete = (event) => {
        // Prevent page reload
        event.preventDefault();
        
        setOpenDialog(false);

        deleteWorkslot();
    }

    const deleteWorkslot = async () => {
        try {
            setCanSubmit(false);
            
            const res = await apiCall("delete", `/api/workslots/${id}`);

            toast.success(res.message);
        } catch(err){
            console.log(err);
            toast.error(err.message);

            setCanSubmit(true);
        }
    }

    const handleSubmit = (event) => { 
        // Prevent page reload
        event.preventDefault();

        if (formData.pendingJob.length < 1){
            toast.error("Please add in at least 1 job");
            return;
        }

        updateWorkslot(formData);
    };

    const updateWorkslot = async (workslotData) => {
        try {
            setCanSubmit(false);

            const res = await apiCall("patch", `/api/workslots/${id}`, workslotData);

            toast.success(res.message);
        } catch(err){
            console.log(err);
            toast.error(err.message);

            setCanSubmit(true);
        }
    }

    const getPendingJobs = (jobTitle) => {
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
           <Stack sx={{m:'8px'}} direction="row" spacing={1}>
                {uniqueRoles?.map((el) => {
                    let text = el.charAt(0).toUpperCase() + el.slice(1);

                    return (
                        <Chip onDelete={()=>handleRemoveJob(el)} key={el} label={mapNumber[el] > 1 ?  `${text} x${mapNumber[el]}` : text} />
                    )
                })}
           </Stack>
        )
    }

    return (
        <>
            <div className="form-page">
                <Toast onSuccessDone={() => navigate('/workslots', { replace: true })} />

                <Paper className="paper" sx={{ minWidth: 500 }}>
                    <form className="register-form" name="registerForm" onSubmit={handleSubmit}>
                        <h1>Edit Work Slot</h1>
                        <div>
                            <FormControl sx={{m:'8px', width: '25ch' }}>
                                <DateTimePicker
                                label="Starting Time"
                                value={dayjs(formData.startTime)}
                                onChange={value => handleStartingTime(value)}
                                format="DD-MM-YY hh:mm A"
                                />
                            </FormControl>

                            <FormControl sx={{m:'8px', width: '25ch' }} >
                                <DateTimePicker
                                label="Ending Time"
                                value={dayjs(formData.endTime)}
                                onChange={value => handleEndingTime(value)}
                                format="DD-MM-YY hh:mm A"
                                />
                            </FormControl>
                        </div>

                        <div style={{justifyContent:"space-between", alignItems: 'center', display: 'flex'}}>
                            <FormControl sx={{m:'8px', flex: 1 }}>
                                <InputLabel htmlFor="role" required>Job</InputLabel>
                                <Select
                                id="currentJob"
                                name="currentJob"
                                label="currentJob"
                                onChange={event => setCurrentJob(event.target.value)}
                                value={currentJob}
                                >
                                    {
                                        jobRoles.map((role) => {
                                            let text = role.charAt(0).toUpperCase() + role.slice(1);

                                            return(
                                                <MenuItem key={role} value={role}>{text}</MenuItem>
                                            )                
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <IconButton size="large" onClick={handleAddJob}>
                                    <AddCircleIcon fontSize="40"/>
                                </IconButton>
                            </FormControl>
                        </div>

                        <div style={{textAlign: 'left',  minHeight: '120px'}}>
                            <FormControl sx={{m:'8px'}}>
                                <Typography sx={{m:'16px'}}>
                                    Job added:
                                </Typography>
                                {getPendingJobs(formData.pendingJob)}
                            </FormControl>
                        </div>
                    
                        <div style={{marginTop: '12px'}}>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" onClick={() => setOpenDialog(true)} color="error">Delete</Button>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" type="submit">Update</Button>
                        </div>        
                    </form>
                </Paper>
            </div>
            <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>
                    Confirm delete?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={event => handleDelete(event)} color="error">Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
        
    )
}

export default WorkSlotEditPage;