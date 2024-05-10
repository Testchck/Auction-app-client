import React, { useState } from 'react';
import './admin.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import baseUrl from '../../Urls';

//import modules
import NavBar from './navBar'


export default function AdRegTeam () {
  const [ teamname, setTeamname ] = useState();
  const [ place, setPlace ] = useState();
  const [ phone, setPhone ] = useState();
  const [ teammanager, setTeammanager ] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamDetails ={
      teamname,
      place,
      phone,
      teammanager
    }
    try{
      const responce = await axios.post(`${baseUrl}/api/team/register`, teamDetails);
      console.log(responce.data.message);
      if(responce.data.message === 'Team register successfully'){
        toast.success(responce.data.message);
        window.location.reload();
      }
    } catch(err){
      toast.error("Something Went Wrong Contact the Developers");
      console.log(err);
    }
  }
    return (
      <div className='ad-tm-reg-min-stc'>
        <NavBar />
        <div className="ad-tm-reg-sb-stc">
            <h1 className="ad-tm-reg-hd">Register Team</h1>
            <p className="ad-tm-reg-p">Register The Genuine Teams</p>
            <form onSubmit={handleSubmit} className="ad-tm-reg-form">
                <input type="text" placeholder="Team Name" value={teamname} onChange={(e) => setTeamname(e.target.value)} className="ad-tm-reg-inp" required />
                <input type="text" placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} className="ad-tm-reg-inp" required />
                <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="ad-tm-reg-inp" required/>
                <input type="text" placeholder="Team Manager Name" value={teammanager} onChange={(e) => setTeammanager(e.target.value)} className="ad-tm-reg-inp" required/>
                {/* <input type="password" placeholder=""/> */}
                <button type='submit' className='ad-tm-reg-stb'>Register</button>
            </form>
        </div>
        <Toaster />
      </div>
    )
  }
