import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import CoffeeIcon from '@mui/icons-material/Coffee';

import { AuthContext } from '../contexts';
import LogoutButton from './LogOutButton';
import { ROLE } from '../constants';

const adminPages = [
    {
        title: "Users",
        link: "/users"
    },
    {
        title: "Create User",
        link: "/users/new"
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
    }
];

const ownerPages = [
    {
        title: "Workslots",
        link: "/workslots"
    },
    {
        title: "New Workslot",
        link: "/workslots/new"
    },
    {
        title: "Profile",
        link: "/profile"
    }
]

const managerPages = [
    {
        title: "Bids",
        link: "/bids"
    },
    {
        title: "Workslots",
        link: "/workslots"
    },
    {
        title: "Staffs",
        link: "/staffs"
    },
    {
        title: "Profile",
        link: "/profile"
    }
]

const staffPages = [
    {
        title: "Workslots",
        link: "/workslots"
    },
    {
        title: "Profile",
        link: "/profile"
    }
]

const Navbar = () => {
    const { auth } = useContext(AuthContext);

    const switchRoleContent = () => {
        switch (auth.role) {
            case ROLE.admin:
                return renderLinks(adminPages);
            case ROLE.owner:
                return renderLinks(ownerPages);
            case ROLE.manager:
                return renderLinks(managerPages);
            case ROLE.staff:
                return renderLinks(staffPages);
            default:
                return <></>;
        }
    }

    const renderLinks = (arr) => {
        if (arr.length <= 0) return <></>;

        return (
            arr.map((el) => (
                <Button
                    key={el.title}
                    sx={{ my: 2, color: 'white', display: 'block', fontWeight: '900' }}
                >
                    <NavLink to={el.link}>{el.title}</NavLink>
                </Button>
            ))
        )
    }

    return (
        <AppBar position='relative'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CoffeeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    {auth.isAuth ?
                        <>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {switchRoleContent()}
                            </Box>
                            <LogoutButton />
                        </> :
                        <Typography sx={{ fontWeight: '900' }}>
                            Cafe Management System
                        </Typography>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar

