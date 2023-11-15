import React from "react";

import { Container } from '@mui/material';

import Toast from "../components/Toast";
import BidList from "../components/BidList";

const BidsPage = () => {

    return (
        <div className="list-page">
            <Toast />

            <Container className="container">
            <h1>Bid List</h1>
            <BidList />
            </Container>
        </div>
    )
}

export default BidsPage;