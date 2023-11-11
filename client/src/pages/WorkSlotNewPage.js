import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Paper, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, TextField, Button, Select, MenuItem, Stack, Chip, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import dayjs from "dayjs";

import { createNewWorkslot, addError } from '../store/actions';
import Toast from "../components/Toast";

const jobRoles = ['cashier', 'chef', 'barista', 'waiter'];

const WorkSlotNewPage = () => {
    const messages = useSelector(state => state.messages);
    const loading = useSelector(state => state.loading);
    const auth = useSelector(state => state.auth);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentDate = new Date();
    currentDate.setHours(10, 0, 0, 0);

    const [formData, setFormData] = useState({
       pendingJob: [],
       approvedJob: [],
       startTime: currentDate,
       endTime: currentDate,
       cafeManagerId: auth.user.userId
    })

    const [currentJob, setCurrentJob] = useState("");  

    useEffect(() => {
        setFormData(prevState => (
            {
                ...prevState,
                cafeManagerId: auth.user.userId
            }
        ));
    },[auth])
  
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

    const handleStartingTime = (value) => {
        console.log(value.toDate());
        console.log(formData.startTime);
        console.log(dayjs(formData.startTime));
    }

    const handleSubmit = (event) => { 
        // Prevent page reload
        event.preventDefault();

        if (formData.pendingJob.length < 1){
            dispatch(addError({message: "Please add in at least 1 job"}));
            return;
        }

        dispatch(createNewWorkslot(formData, navigate));
    };

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
                        <Chip key={el} label={mapNumber[el] > 1 ?  `${text} x${mapNumber[el]}` : text} />
                    )
                })}
           </Stack>
        )
    }

    return (
        <div className="form-page">
        <Toast messages={messages} />

        <Paper className="paper" sx={{ minWidth: 500, minHeight: 500 }}>
            <form className="register-form" name="registerForm" onSubmit={handleSubmit}>
            <h1>Create Work Slot</h1>
            <div>
                <FormControl
                sx={{m:'8px', width: '25ch' }}
                >
                    <DateTimePicker
                    label="Starting Time"
                    value={dayjs(formData.startTime)}
                    onChange={value => handleStartingTime(value)}
                    />
                </FormControl>

                <FormControl
                sx={{m:'8px', width: '25ch' }}
                >
                    <DateTimePicker
                    label="Ending Time"
                    value={dayjs(formData.startTime)}
                    onChange={value => handleStartingTime(value)}
                    />
                </FormControl>
            </div>

            <div style={{justifyContent:"space-between", alignItems: 'center', display: 'flex'}}>
                <FormControl
                sx={{m:'8px', flex: 1 }}
                >
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

            <div>
                <FormControl
                sx={{m:'8px'}}                    
                >
                    <Typography sx={{m:'16px'}}>
                        Job added:
                    </Typography>
                    {getPendingJobs(formData.pendingJob)}
                </FormControl>
            </div>
        
            <div style={{marginTop: '12px'}}>
                <Button variant="contained" size="large" type="submit">Submit</Button>
            </div>        
            </form>
        </Paper>
        </div>
    )
}

export default WorkSlotNewPage;