import React from "react";

import { Container } from '@mui/material';

import Toast from "../components/Toast";
import UserProfileList from "../components/UserProfileList";

const UserProfilePage = () => {

    return (
        <div className="list-page">
            <Toast />

            <Container className="container">
            <h1>User Profiles</h1>
            <UserProfileList />
            </Container>
        </div>
    )
}

export default UserProfilePage;