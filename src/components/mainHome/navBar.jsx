import React, { Component } from 'react';
import './user.css'
import { Link } from 'react-router-dom';

export default class navBar extends Component {
  render() {
    return (
      <div className='user-nav'>
        <Link to="/" className='ur-nav-lg'>
            <h1 className="user-nav-h">AUCTION APP</h1>
        </Link>
        <ul>
            <li><Link className='ur-nav-lnk' href="#">Home</Link></li>
            <li><Link className='ur-nav-lnk' href="#">About Us</Link></li>
            <li><Link className='ur-nav-lnk' href="#">Contact Us</Link></li>
        </ul>
        <Link to="/" className='ur-lgn-btn'>
            Login
        </Link>
      </div>
    )
  }
}
