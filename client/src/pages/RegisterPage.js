import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Paper, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, TextField, Button, Select, MenuItem, Slider, Typography } from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material';

import { register } from '../store/actions';
import Toast from "../components/Toast";

const roles = ["staff", "manager", "owner", "admin"];

const RegisterPage = () => {
    const messages = useSelector(state => state.messages);
    const loading = useSelector(state => state.loading);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        maxBidSlots: 5,
        phoneNumber: ""
    })

    const [showPassword, setShowPassword] = useState(false);  
  
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
    
        dispatch(register(formData, navigate));
    };

    return (
        <div className="form-page">
        <Toast messages={messages} />

        <Paper className="paper" sx={{ minWidth: 325, minHeight: 500 }}>
            <form className="register-form" name="registerForm" onSubmit={handleSubmit}>
            <h1>Create User</h1>
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
                        required
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
                        required

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
                        required
                    />
                </FormControl>
            </div>
            <div>
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
                        required
                        name="maxBidSlots"
                        defaultValue={1}
                        step={1}
                        marks
                        min={1}
                        max={10}
                        valueLabelDisplay="on"                       
                        value={formData.maxBidSlots}
                        onChange={handleChange}
                    />
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

export default RegisterPage;