import React, { useState, useEffect } from 'react';
import './admin.css';
import axios from 'axios';
import NavBar from './navBar';
import toast, { Toaster } from 'react-hot-toast';
import baseUrl from '../../Urls';

export default function AdminLiveUpdation() {
  const [data, setData] = useState([]);
  const [teamdata, setTeamData] = useState([]);
  const [playername, setPlayername] = useState('');
  const [teamname, setTeamname] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/player/data`);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/team/data`);
      setTeamData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlayerChange = (event) => {
    setPlayername(event.target.value);
  };

  const handleTeamChange = (event) => {
    setTeamname(event.target.value);
  }

  const handlePriceChange = (event) => {
    setUpdatedPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(`${baseUrl}/api/updatePlayerPrice/${playername}`,{
        newPrice: updatedPrice,
        teamName : teamname
      });
      console.log(res);
      toast.success(res.data.Player_Name + ' price updated successfully!');
      // Optionally, you can reset the form fields here
    } catch (err) {
      console.error(err);
      toast.error('Failed to update player price');
    }
  };
  
  const finalBidd = async (e) => {
    e.preventDefault();
    const finalBiddValue ={
      teamName : teamname,
      newPrice : updatedPrice,
      playerName : playername
    } 
    console.log(finalBiddValue);
    const finalresponce = await axios.post(`${baseUrl}/api/final/bidd`, finalBiddValue);
    console.log(finalresponce);
    if (finalresponce.data.message ==='Final Bidd successfully Completed...'){
      toast.success(finalresponce.data.message);
      window.location.reload();
    } else {
      toast.error(finalresponce.data.message);
      window.location.reload();
    }
  }
  return (
    <div className='ad-mn-lv-upd-sct'>
      <NavBar />
      <div className='ad-mn-lv-upd-sb-sct'>
        <h1 className='ad-mn-lv-upd-sb-h'>Admin Live Updation</h1>
        <p className='ad-mn-lv-upd-sb-p'>Admin can change the price of a player by the team bid.</p>
        <form onSubmit={handleSubmit} className='ad-mn-lv-form'>
          <label htmlFor='plyr-name'>Player Name</label>
          <select value={playername} onChange={handlePlayerChange} className='ad-mn-lv-form-slt' name='plyr-name' id='plyr-name'>
            <option value=''>Select a player Name</option>
            {data.map((playerdata, index) => (
              <option key={index} value={playerdata.Player_Name}>
                {playerdata.Player_Name}
              </option>
            ))}
          </select>
          <label htmlFor='team-name'>Team Name</label>
          <select value={teamname} onChange={handleTeamChange} className='ad-mn-lv-form-slt' name='team-name' id='team-name'>
            <option value=''>Select a Team Name</option>
            {teamdata.map((teamData, index) => (
              <option key={index} value={teamData.Team_name}>
                {teamData.Team_name}
              </option>
            ))}
          </select>
          <input type='text' value={updatedPrice} onChange={handlePriceChange} className='ad-mn-lv-form-inp' placeholder='Player Price' />
          <button type='submit' className='ad-mn-lv-form-btn-sbmt'>
            Live Submit
          </button>
          <button className="ad-mn-lv-frm-fnl-btn" onClick={finalBidd}>
            Confirm Bidd
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
