import React, { Component } from 'react'
import './admin.css';
import { Link } from 'react-router-dom';

export default class navBar extends Component {
  render() {
    return (
      <div className='ad-nb-mn-stn'>
        <Link to='' className='ad-nb-lnk'>
            <h1 className="ad-min-hd">
                AUCTION APP
            </h1>
        </Link>
        <nav className='ad-nb-links'>
          <li className='ad-nb-li'><Link className='ad-nb-link' to='/admin-team-reg'>Register Team</Link></li>
          <li className='ad-nb-li'><Link className='ad-nb-link' to='/admin-list-team'>List Team</Link></li>
          <li className='ad-nb-li'><Link className='ad-nb-link' to='/admin-add-plyr'>Add Player</Link></li>
          <li className='ad-nb-li'><Link className='ad-nb-link' to='/admin-live-updation'>Live Updation</Link></li>
          <li className='ad-nb-li'><Link className='ad-nb-link' to='/admin-plyr-list'>List Player</Link></li>
          {/* <li className='ad-nb-li'><Link className='ad-nb-link' to='/admin-wallet-updation'>Update Team Wallet</Link></li> */}
        </nav>
          <li className="ad-nb-lgo"><Link className="ad-nb-lgo-btn" to='/'>Logout</Link></li>
      </div>
    )
  }
}
