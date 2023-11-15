import React from "react";

import { Container } from '@mui/material';

import Toast from "../components/Toast";
import StaffList from "../components/StaffList";

const StaffsPage = () => {

    return (
        <div className="list-page">
            <Toast />

            <Container className="container">
                <h1>All Staffs</h1>
                <StaffList />
            </Container>
        </div>
    )
}

export default StaffsPage;