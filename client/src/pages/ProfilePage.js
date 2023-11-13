import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { Typography, Card, CardContent } from '@mui/material';
import { toast } from 'react-toastify';

import { AuthContext } from "../contexts";
import Toast from "../components/Toast";
import BidList from "../components/BidList";
import UserProfileView from "../boundaries/UserProfileView";
import UserView from "../boundaries/UserView";
import { ROLE } from "../constants";

const ProfilePage = () => {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        username: "",
        role: "",
        maxBidSlots: 0,
        phoneNumber: ""
    });
    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        try {
            const userView = new UserView();
            const userRes = await userView.fetchUser(auth.userId);

            setProfile(prevState => (
                {
                    ...prevState,
                    username: userRes.data.username
                }
            ))

            const profileView = new UserProfileView();
            const profileRes = await profileView.fetchUserProfileFromUserId(auth.userId);

            setProfile(prevState => (
                {
                    ...prevState,
                    ...profileRes.data
                }
            ))
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const getCaptilize = (text) => {
        return text?.charAt(0).toUpperCase() + text?.slice(1);
    }


    return (
        <div className="form-page">
            <Toast onSuccessDone={() => navigate(0)} />

            <Card className="paper" sx={{ minWidth: 720 }}>
                <div className="profile">
                    <CardContent>
                        <h1>Profile</h1>

                        <div className="profile-group">
                            <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                Username :
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                {profile.username}
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

                    {auth.role === ROLE.staff ? 
                    <>
                        <BidList canSubmit={canSubmit} setCanSubmit={setCanSubmit}/>
                    </> : <></>    
                    }                                                             
                </div>
            </Card>
        </div>
    )
}

export default ProfilePage;