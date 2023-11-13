import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Paper, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, TextField, Button, Select, MenuItem, Slider, Typography } from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material';
import { toast } from 'react-toastify';


import Toast from "../components/Toast";
import AuthView from "../boundaries/AuthView";

const roles = ["admin", "owner", "manager", "staff"];

const RegisterPage = () => {  
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        maxBidSlots: 0,
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
        
        register(formData);
    };

    const register = async (formData) => {
        try {
            const authView = new AuthView();
            const res = await authView.register(formData);

            toast.success(res.message);
          } catch(err){
            console.log(err);
            toast.error(err.message);
          }
    }

    return (
        <div className="form-page">
        <Toast onSuccessDone={() => navigate(0)}/>

        <Paper className="paper" sx={{ minWidth: 325, minHeight: 350 }}>
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
                            required
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
                <Button variant="contained" size="large" type="submit">Submit</Button>
            </div>        
            </form>
        </Paper>
        </div>
    )
}

export default RegisterPage;