import React from "react";

import { Container } from '@mui/material';

import Toast from "../components/Toast";
import UserList from "../components/UserList";

const UsersPage = () => {

    return (
        <div className="list-page">
            <Toast />

            <Container className="container">
            <h1>All Users</h1>
            <UserList />
            </Container>
        </div>
    )
}

export default UsersPage;