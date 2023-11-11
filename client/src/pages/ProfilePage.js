import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import { Paper, Typography, Card, CardContent, CardActions, IconButton, Collapse, List, ListItem, ListItemButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { fetchBidsFromStaff } from '../store/actions';
import Toast from "../components/Toast";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;

    return <IconButton {...other} />;
  })

  (({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const ProfilePage = () => {
    const messages = useSelector(state => state.messages);
    const loading = useSelector(state => state.loading);
    const auth = useSelector(state => state.auth);
    const bids = useSelector(state => state.bids);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({});

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setProfile(auth.user);

        const fetchData = async () => {
            await dispatch(fetchBidsFromStaff());
        }

        console.log(auth);
        fetchData();
    },[auth]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await dispatch(fetchBidsFromStaff());
    //     }

    //     console.log(auth);
    //     fetchData();
    // },[auth]);

    const handleBidClick = (bidId) => {
        console.log(bidId);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const sortData = (data) => {
        const compare = (a, b) => {        
            if (a.startTime === null) {
                return 1;
              }
            
              if (b.startTime === null) {
                return -1;
              }
            
              if (a.startTime === b.startTime) {
                return 0;
              }
            
              return a.startTime > b.startTime ? 1 : -1;
        }
        
        data.sort(compare);

        return data;
    }

    return (
        <div className="form-page">
            <Toast messages={messages} />

            <Card className="paper" sx={{ minWidth: 400 }}>
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

                            <div className="profile-group">
                                <Typography sx={{flex: 1}} variant="subtitle1" gutterBottom>
                                    Max Bids For Work Slot :
                                </Typography>
                                <Typography sx={{fontWeight: 'bold'}} variant="subtitle1" gutterBottom>
                                    {profile.maxBidSlots}
                                </Typography>
                            </div>                
                    </CardContent>
                    <CardActions sx={{padding: '16px'}}>
                        <Typography variant="subtitle1" gutterBottom>
                            My Bids
                        </Typography>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>

                    <Collapse  in={expanded} timeout="auto" unmountOnExit>
                        <List>
                           {bids.length > 0 ? sortData(bids).map(bid =>(
                            <ListItem>
                                <ListItemButton onClick={() => handleBidClick(bid._id)}>
                                    {dayjs(bid.workslotId.startTime).format("DD/MM/YYYY") + " " + dayjs(bid.workslotId.startTime).format("HH:mm") + " " + bid.jobTitle}
                                </ListItemButton>
                            </ListItem>
                           )): <></>
                           }
                        </List>
                    </Collapse>
                </div>
            </Card>
        </div>
    )
}

export default ProfilePage;