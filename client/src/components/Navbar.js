import React from 'react';

import { NavLink, Link, useNavigate } from 'react-router-dom';

import navbarIcon from '../images/coffee-icon.png';

const NavBar = () => {

    /* let authToken = sessionStorage.getItem('Auth Token');

    let navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/')
    } */

    return (
    <>
        <img className='navbar-icon' src={navbarIcon}/>
        <h className="navbar-header">Cafe Staff Management System</h> 
            <nav>
                <div className='menuitem'>

                        <NavLink to='/Test'>Test</NavLink>
                        <NavLink to='/Login'>Login</NavLink>
                        <NavLink to='/Staff'>Staff</NavLink>
                        <NavLink to='/Work'>Work</NavLink>
                        <NavLink to='/Profile'>Profile</NavLink>
                        {/* {authToken === null ? (<NavLink to='/Login'>Login</NavLink>):(<NavLink to='/Profile'>Profile</NavLink>)}
                        {authToken === null ? "" :(<Link onClick={handleLogout}>Logout</Link>)} */}
                        <hr></hr>
                </div>
            </nav>
    </>
    )
}

export default NavBar
