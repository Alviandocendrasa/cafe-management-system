import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '@mui/material';

import { ROLE } from "../constants";
import Toast from "../components/Toast";
import WorkSlotList from "../components/WorkSlotList";

const WorkSlotsPage = () => {
    const messages = useSelector(state => state.messages);
    const loading = useSelector(state => state.loading);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    return (
        <div className="list-page">
            <Toast messages={messages} />

            <Container className="container">
            <h1>Work Slots</h1>
            <WorkSlotList canBid={auth.user.role = ROLE.staff ? true : false}/>
            </Container>
        </div>
    )
}

export default WorkSlotsPage;