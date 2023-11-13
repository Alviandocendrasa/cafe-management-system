import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { Typography, Card, CardContent, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { toast } from 'react-toastify';

import Toast from "../components/Toast";
import UserView from "../boundaries/UserView";
import UserProfileView from "../boundaries/UserProfileView";
import { ROLE } from "../constants";


const UserPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({
        role: '',
        phoneNumber: '',
        maxBidSlots: 0
    });

    const [canSubmit, setCanSubmit] = useState(true); 
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        try {
            const userView = new UserView();
            const userRes = await userView.fetchUser(id);

            setUser(userRes.data);

            const profileView = new UserProfileView();
            const profileRes = await profileView.fetchUserProfileFromUserId(id);


            setProfile(profileRes.data);
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const handleDelete = (event) => {
        // Prevent page reload
        event.preventDefault();
        
        setOpenDialog(false);

        deleteUser();
    }

    const deleteUser = async () => {
        try {
            setCanSubmit(false);
            
            const userView = new UserView();
            const userRes = await userView.deleteUser(id);

            console.log(profile);
            const profileView = new UserProfileView();
            const profileRes = await profileView.deleteUserProfile(profile._id);

            toast.success(userRes.message);
            toast.success(profileRes.message);
        } catch(err){
            console.log(err);
            toast.error(err.message);

            setCanSubmit(true);
        }
    }

    const getCaptilize = (text) => {
        return text?.charAt(0).toUpperCase() + text?.slice(1);
    }


    return (
        <div className="form-page">
            <Toast onSuccessDone={() => navigate('/users')} />

            <Card className="paper" sx={{ minWidth: 720 }}>
                <div className="profile">
                    <CardContent>
                        <h1>User Details</h1>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Username :
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {user.username}
                            </Typography>
                        </div>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Role :
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {getCaptilize(profile.role)}
                            </Typography>
                        </div>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Phone Number :
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {profile.phoneNumber}
                            </Typography>
                        </div>

                        {profile.role === ROLE.staff ?
                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Max Bids For Work Slot :
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {profile.maxBidSlots}
                            </Typography>
                        </div> : <></>   
                        }       
                    </CardContent>

                    <div style={{marginTop: '12px', textAlign: 'center'}}>                          
                        <Button 
                        sx={{margin: "0 8px"}}
                        disabled={!canSubmit} 
                        id="delete-button" 
                        variant="contained" 
                        size="small" 
                        onClick={() => setOpenDialog(true)}
                        color="error"
                        >
                            Delete
                        </Button>   
                        <Button 
                        sx={{margin: "0 8px"}}
                        disabled={!canSubmit} 
                        id="edit-button" 
                        variant="contained" 
                        size="small" 
                        onClick={() => navigate(`/users/${user._id}/edit`)}
                        >
                            Edit
                        </Button>             
                    </div>                                                          
                </div>
            </Card>
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
        </div>
    )
}

export default UserPage;