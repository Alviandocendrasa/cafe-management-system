import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');

  return (
    <div>
        <br></br>
        <div className="profile-container">
          <h1>My Profile</h1>
          <img className="profile-image"
          src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
          alt="new"/>
          
          <p>Name : {name}</p>
          <p>Phone : {number}</p>
          <p>Date Joined : {date}</p>
        </div>
        <br></br>
        <div className="staff-workslots-container">
          <h1>Upcoming Shifts</h1>
        </div>
    </div>
  )
}

export default Profile