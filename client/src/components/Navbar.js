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
        title: "Register",
        link: "/register"
    },
    {
        title: "Workslots",
        link: "/workslots"
    },
    {
        title: "New Workslot",
        link: "/workslot/new"
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
