import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import Toast from "../components/Toast";
import WorkSlotList from "../components/WorkSlotList";
import { AuthContext } from "../contexts";
import { ROLE } from "../constants";

const WorkSlotsPage = () => {
    const { auth } = useContext(AuthContext); 

    const navigate = useNavigate();

    return (
        <div className="list-page">
            <Toast onSuccessDone={() => navigate("/profile", { replace: true})} />

            <Container className="container">
                <h1>Work Slots</h1>
                <WorkSlotList isOwner={auth.role === ROLE.owner}/>
            </Container>
        </div>
    )
}

export default WorkSlotsPage;