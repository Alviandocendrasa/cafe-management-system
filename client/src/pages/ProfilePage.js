import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { Typography, Card, CardContent } from '@mui/material';

import { AuthContext } from "../contexts";
import Toast from "../components/Toast";
import BidList from "../components/BidList";
import { ROLE } from "../constants";

const ProfilePage = () => {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
        setProfile(auth.profile);
    },[]);

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
                                    {profile.role}
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