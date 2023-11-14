import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { Paper, FormControl, InputLabel, IconButton, Button, TextField, Stack, Chip, Typography, Select, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { toast } from 'react-toastify';

import Toast from "../components/Toast";
import UserProfileView from "../boundaries/UserProfileView";

const permissions = ['user', 'user-profile', 'workslot', 'bid'];

const UserProfileNewPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [formData, setFormData] = useState({
        role: "",
        permissions: []
    })

    const [currentPermission, setCurrentPermission] = useState(""); 
    const [canSubmit, setCanSubmit] = useState(true); 


    const handleRoleChange = (event) => {
        setFormData(prevState => (
            {
                ...prevState,
                role: event.target.value
            }
        ))
    }

    const handlePermissionChange = (event) => {
        setCurrentPermission(event.target.value);
    }
  
    const handleAddPermissions = () => {
        if (!currentPermission) return;
        
        if (formData.permissions.includes(currentPermission)) return;

        setFormData(prevState => (
            {
                ...prevState,
                permissions: [...prevState.permissions, currentPermission]
            }
        ));

        setCurrentPermission("");
    }

    const handleRemovePermission = (el) => {
        const arr = formData.permissions;
        const index = arr.indexOf(el);
        arr.splice(index, 1);
        
        setFormData(prevState => (
            {
                ...prevState,
                permissions: arr
            }
        ));
    }


    const handleSubmit = (event) => { 
        // Prevent page reload
        event.preventDefault();

        if (formData.permissions.length < 1){
            toast.error("Please add in at least 1 permission.");
            return;
        }

        createUserProfile(formData);
    };

    const createUserProfile = async (formData) => {
        try {
            setCanSubmit(false);
            
            const userProfileView = new UserProfileView();
            const res = await userProfileView.createUserProfile(formData);

            toast.success(res.message);
        } catch(err){
            console.log(err);
            toast.error(err.message);

            setCanSubmit(true);
        }
    }

    const getPermissionss = (permissions) => {
       
        return (
           <Stack sx={{m:'8px'}} direction="row" spacing={1}>
                {permissions?.map((el) => {
                    return (
                        <Chip onDelete={()=>handleRemovePermission(el)} key={el} label={el} />
                    )
                })}
           </Stack>
        )
    }

    return (
        <>
            <div className="form-page">
                <Toast onSuccessDone={() => navigate('/user-profiles')} />

                <Paper className="paper" sx={{ minWidth: 500 }}>
                    <form className="register-form" name="registerForm" onSubmit={handleSubmit}>
                        <h1>Create User Profile</h1>
                        <div>
                            <FormControl sx={{m:'8px', width: '50ch' }}>
                            <TextField 
                            id="role"
                            name="role" 
                            label="Role" 
                            variant="outlined" 
                            value={formData.role}
                            onChange={handleRoleChange}
                            required
                            />
                            </FormControl>
                        </div>

                        <div style={{justifyContent:"space-between", alignItems: 'center', display: 'flex'}}>
                            <FormControl sx={{m:'8px', flex: 1 }}>
                                <InputLabel htmlFor="role" required>Permissions</InputLabel>
                                <Select
                                id="permissions"
                                name="permissions" 
                                label="Permissions" 
                                value={currentPermission}
                                onChange={handlePermissionChange}
                                >
                                    {
                                        permissions.map((el) => {                                       
                                            return(
                                                <MenuItem key={el} value={el}>{el}</MenuItem>
                                            )                
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <IconButton size="large" onClick={handleAddPermissions}>
                                    <AddCircleIcon fontSize="40"/>
                                </IconButton>
                            </FormControl>
                        </div>

                        <div style={{textAlign: 'left',  minHeight: '120px'}}>
                            <FormControl sx={{m:'8px'}}>
                                <Typography sx={{m:'16px'}}>
                                    Permissions added:
                                </Typography>
                                {getPermissionss(formData.permissions)}
                            </FormControl>
                        </div>
                    
                        <div style={{marginTop: '12px'}}>
                            <Button sx={{margin: "0 8px"}} disabled={!canSubmit} variant="contained" size="large" type="submit">Submit</Button>
                        </div>        
                    </form>
                </Paper>
            </div>        
        </>
    )
}

export default UserProfileNewPage;