import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { Paper, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, TextField, Button, Select, MenuItem, Slider, Typography } from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material';
import { toast } from 'react-toastify';

import Toast from "../components/Toast";
import UserView from "../boundaries/UserView";
import UserProfileView from "../boundaries/UserProfileView";

const roles = ["admin", "owner", "manager", "staff"];

const UserEditPage = () => {  
    const navigate = useNavigate();

    const { id } = useParams();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        maxBidSlots: 0,
        phoneNumber: ""
    })
    const [profileId, setProfileId] = useState("");

    const [showPassword, setShowPassword] = useState(false);  
    const [canSubmit, setCanSubmit] = useState(true); 
  
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            const userView = new UserView();
            const userRes = await userView.fetchUser(id);

            setFormData(prevState => (
                {
                    ...prevState,
                    username: userRes.data.username,                   
                }
            ))
            
            const profileView = new UserProfileView();
            const profileRes = await profileView.fetchUserProfileFromUserId(id);
            
            setFormData(prevState => (
                {
                    ...prevState,
                    role: profileRes.data.role,   
                    phoneNumber: profileRes.data.phoneNumber,
                    maxBidSlots: profileRes.data.maxBidSlots                
                }
            ))

            setProfileId(profileRes.data._id);            
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const handleChange = (event) => {
        setFormData(prevState => (
            {
                ...prevState,
                [event.target.name]: event.target.value
            }
        ))
    }

    const handleSubmit = (event) => { 
        // Prevent page reload
        event.preventDefault();
        
        updateUser(formData);
    };

    const updateUser = async (formData) => {
        try{
            setCanSubmit(false);
            
            const userData = {
                username: formData.username,
                password: formData.password
            }
            
            if (!userData.password){
                delete userData.password;
            }

            const userView = new UserView();
            const userRes = await userView.updateUser(userData, id);

            const profileData = {
                role: formData.role,
                phoneNumber: formData.phoneNumber,
                maxBidSlots: formData.maxBidSlots
            }

            const profileView = new UserProfileView();
            const profileRes = await profileView.updateUserProfile(profileData, profileId);

            toast.success(userRes.message);

            toast.success(profileRes.message);
        } catch(err){
            console.log(err);
            toast.error(err.message);

            setCanSubmit(true);
        }
    };

    return (
        <div className="form-page">
        <Toast onSuccessDone={() => navigate('/users')}/>

        <Paper className="paper" sx={{ minWidth: 325, minHeight: 350 }}>
            <form className="register-form" name="registerForm" onSubmit={handleSubmit}>
            <h1>Edit User Details</h1>
            <div>
                <FormControl
                    sx={{m:'8px', width: '25ch' }}
                >
                    <TextField 
                    id="username"
                    name="username" 
                    label="Username" 
                    variant="outlined" 
                    value={formData.username}
                    onChange={handleChange}
                    />
                </FormControl>

                <FormControl
                    sx={{m:'8px', width: '25ch' }}
                >
                    <InputLabel htmlFor="password" required>Password</InputLabel>
                    <OutlinedInput 
                    id="password"
                    name="password"  
                    label="Password" 
                    value={formData.password}
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(event) => event.preventDefault()}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    />
                </FormControl>
            </div>

            <div>
                <FormControl
                    sx={{m:'8px', width: '25ch' }}
                >
                    <InputLabel htmlFor="role" required>Role</InputLabel>
                    <Select
                    id="role"
                    name="role"
                    label="role"
                    onChange={handleChange}
                    value={formData.role}
                    >
                        {
                            roles.map((role) => {
                                let text = role.charAt(0).toUpperCase() + role.slice(1);

                                return(
                                    <MenuItem key={role} value={role}>{text}</MenuItem>
                                )                
                            })
                        }
                    </Select>
                </FormControl>

                <FormControl
                sx={{m:'8px', width: '25ch' }}
                >
                    <TextField 
                    id="phoneNumber"
                    name="phoneNumber" 
                    label="Phone Number" 
                    variant="outlined" 
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    />
                </FormControl>
            </div>
            <div>
                {formData.role === 'staff' ? 
                    <FormControl
                    sx={{m:'8px', width: '50ch'}}
                    >
                        <Typography 
                            htmlFor="maxBidSlots" 
                            gutterBottom
                            sx={{mt:'16px', mb:'40px', textAlign: 'left'}}
                        >
                            Max Bids For Work Slot
                        </Typography>
                        <Slider
                            name="maxBidSlots"
                            defaultValue={0}
                            step={1}
                            marks
                            min={0}
                            max={10}
                            valueLabelDisplay="on"                       
                            value={formData.maxBidSlots}
                            onChange={handleChange}
                        />
                    </FormControl> : <></>
                }
            </div>

            <div style={{marginTop: '12px'}}>
                <Button disabled={!canSubmit} variant="contained" size="large" type="submit">Update</Button>
            </div>        
            </form>
        </Paper>
        </div>
    )
}

export default UserEditPage;