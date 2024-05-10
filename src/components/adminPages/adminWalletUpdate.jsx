import React, { useState, useEffect } from 'react'
import './admin.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import baseUrl from '../../Urls';

//import Modules
import NavBar from './navBar';

export default function AdminWalletUpdate () {
    const [ data, setData ] = useState([]);
    const [ walletupdate, setWalletUpdate ] = useState('');
    const [ teamName, setTeamName ] = useState('');

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        try{
            const response = await axios.get(`${baseUrl}/api/team/data`);
            console.log(response);
            setData(response.data);
        } catch(e){
            console.log(e);
        }
    }

    const handleTeamName = (event) => {
        setTeamName(event.target.value);
      }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(walletupdate);
        console.log(teamName);
        
        try{
            const responce = await axios.put(`${baseUrl}/api/wallet/update/${teamName}`,{
                walletupdate: walletupdate
            });
            console.log(responce);
            if(responce.data.message === "Wallet is empty"){
                toast.error("team Wallet is empty");
                console.log(responce.data);
            } else if (responce.data.message === "Team Wallet updated successfully"){
                toast.success(responce.data.message);
                console.log(responce.data);
                window.location.reload();
            } else{
                toast.error("Something went wrong");
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
      <div className='ad-mn-wlt-mn-sct'>
        <NavBar />
        <div className="ad-mn-sb-ctr">
            <h1 className="ad-mn-wlt-h1">
                Team Wallet Updation
            </h1>
            <p>Please Upload the Wallet after a team winning a bidd</p>
            <form onSubmit={handleSubmit} action="" className='ad-mn-wlt-frm'>
                <label htmlFor="team-name">Select Team</label>
                <select name="team-name" value={teamName} onChange={handleTeamName} id="team-name" className='ad-mn-wlt-slt'>
                    <option value="">Select a Team</option>
                    {data.map((teamData, index) => (
                        <option key={index} value={teamData.Team_name}>
                            {teamData.Team_name}
                        </option>
                    ))}
                </select>
                <input
                 type="text"
                 className="ad-mn-wlt-input"
                 placeholder='Enter The Update Value'
                 value={walletupdate}
                 onChange={(e) => setWalletUpdate(e.target.value)}
                 required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
        <Toaster />
      </div>
    )
}
