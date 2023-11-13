import React from "react";

import { Container } from '@mui/material';

import Toast from "../components/Toast";
import WorkSlotList from "../components/WorkSlotList";

const WorkSlotsPage = () => {

    return (
        <div className="list-page">
            <Toast />

            <Container className="container">
            <h1>Work Slots</h1>
            <WorkSlotList />
            </Container>
        </div>
    )
}

export default WorkSlotsPage;