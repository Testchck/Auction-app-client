import React, { useState, useEffect } from 'react';
import './mainuser.css'
import { Link, useNavigate } from 'react-router-dom';

//import images
import userIcon from './images/user.png'

export default function UserNavbar () {
  const [ userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
    }
}, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');

    alert("Logouting....");

    // Redirect to the login page
    navigate('/login');
  };
    return (
      <div className='user-nav'>
        <Link to="/user-home" className='ur-nav-lg'>
            <h1 className="user-nav-h">AUCTION APP</h1>
        </Link>
        <ul>
            <li><Link className='ur-nav-lnk' href="#">Home</Link></li>
            <li><Link className='ur-nav-lnk' href="#">About Us</Link></li>
            <li><Link className='ur-nav-lnk' href="#">Contact Us</Link></li>
            <li><Link className='ur-nav-lnk' href="#">Home</Link></li>
            <li><button className='ur-nav-lnk-log-lg' onClick={handleLogout}>Logout</button></li>
        </ul>
        <div className="user-dtls">
            <img src={userIcon} alt="icon" className='user-icon' />
            {userData ? userData.username : 'User'}
        </div>
      </div>
    )
}

