import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

import { Paper, FormControl, InputLabel, IconButton, Button, Select, MenuItem, Stack, Chip, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import Toast from "../components/Toast";
import WorkslotView from "../boundaries/WorkslotView";


const jobRoles = ['barista', 'cashier', 'chef', 'waiter'];

const WorkSlotNewPage = () => {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const currentDate = new Date();
    currentDate.setHours(10, 0, 0, 0);

    const [formData, setFormData] = useState({
       pendingJob: [],
       approvedJob: [],
       startTime: currentDate,
       endTime: currentDate,
       cafeManagerId: auth.userId
    })

    const [currentJob, setCurrentJob] = useState(""); 
    const [canSubmit, setCanSubmit] = useState(true); 

    useEffect(() => {
        setFormData(prevState => (
            {
                ...prevState,
                cafeManagerId: auth.userId
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


    const handleSubmit = (event) => { 
        // Prevent page reload
        event.preventDefault();

        if (formData.pendingJob.length < 1){
            toast.error("Please add in at least 1 job");
            return;
        }

        createWorkSlot(formData);
    };

    const createWorkSlot = async (formData) => {
        try {
            setCanSubmit(false);
            
            const workslotView = new WorkslotView();
            const res = await workslotView.createNewWorkslot(formData);

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
        <div className="form-page">
        <Toast onSuccessDone={() => navigate(0)} />

        <Paper className="paper" sx={{ minWidth: 500 }}>
            <form className="register-form" name="registerForm" onSubmit={handleSubmit}>
            <h1>Create Work Slot</h1>
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
                <Button disabled={!canSubmit} variant="contained" size="large" type="submit">Submit</Button>
            </div>        
            </form>
        </Paper>
        </div>
    )
}

export default WorkSlotNewPage;