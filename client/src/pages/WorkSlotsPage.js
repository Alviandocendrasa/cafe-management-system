import React, { useContext } from "react";

import { Container } from '@mui/material';

import Toast from "../components/Toast";
import WorkSlotList from "../components/WorkSlotList";
import { AuthContext } from "../contexts";
import { ROLE } from "../constants";

const WorkSlotsPage = () => {
    const { auth } = useContext(AuthContext); 

    return (
        <div className="list-page">
            <Toast />

            <Container className="container">
            <h1>Work Slots</h1>
            <WorkSlotList isOwner={auth.role === ROLE.owner}/>
            </Container>
        </div>
    )
}

export default WorkSlotsPage;