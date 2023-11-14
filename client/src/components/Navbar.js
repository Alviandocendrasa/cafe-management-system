import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { AppBar, Box, Button, Container, IconButton, Toolbar  } from '@mui/material';
import CoffeeIcon from '@mui/icons-material/Coffee';

const pages = [
    {
        title: "Login",
        link: "/login"
    },
    {
        title: "Create User",
        link: "/users/new"
    },
    {
        title: "Users",
        link: "/users"
    },
    {
        title: "New Workslot",
        link: "/workslots/new"
    },
    {
        title: "Workslots",
        link: "/workslots"
    },
    {
        title: "Bids",
        link: "/bids"
    },
    {
        title: "User Profiles",
        link: "/user-profiles"
    },
    {
        title: "New User Profiles",
        link: "/user-profiles/new"
    },
    {
        title: "Profile",
        link: "/profile"
    },
];

const Navbar = () => {

    return (
    <AppBar position='relative'>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <NavLink to="/">
                    <CoffeeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                </NavLink>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button    
                            key={page.title}
                            sx={{ my: 2, color: 'white', display: 'block', fontWeight: '900' }}
                        >
                            <NavLink to={page.link}>{page.title}</NavLink>
                        </Button>
                    ))}
                </Box>                
            </Toolbar>
        </Container>
    </AppBar>
    )
}

export default Navbar
