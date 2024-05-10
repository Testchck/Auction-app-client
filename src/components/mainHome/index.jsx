import React, { useState, useEffect } from 'react'
import './user.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import baseUrl from '../../Urls';

//import images
import Grd from '../images/gradient.png'

//module.exports 
import NabBar from './navBar'

export default function Index () {
  const [playerData, setPlayerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/all/player/data`);
      setPlayerData(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const defaultNavigation = () => {
    alert("Please Login Your Account. If you don't have Login, Please contact Admin")
    navigate('/login');
  }

    return (
      <div>
        <div className="main-section">
          <NabBar />
          <h1 className="main-txt">
            HERO <br /> COMES AND GO, <br /> BUT <span className="ur-h1-hl">LEGENDS</span> <br /> ARE FOREVER...
          </h1>
        </div>
        <div className="section-two">
        <div className="plyr-main-ctr">
          {playerData.map((player, index) => (
            <div className="player-div" key={index} style={{width: "300px", height: "400px", backgroundImage: `url(${player.Player_Image})`, backgroundSize: "cover", overflow: "hidden", borderRadius: "20px"}}>
              <div className="plyr-div">
                {/* <img src={player.Player_Image} alt="imag" className='usr-plyr-img'/> */}
                <img src={Grd} alt="gradient" className="plyr-grd" />
                <div className="plyr-txt-ctn">
                  <h1 className="plyr-nme">{player.Player_Name}</h1>
                  <p className="plyr-pos">{player.Player_Position} Position</p>
                  <div className="plyr-btn">
                    <button onClick={defaultNavigation} className="ply-price">₹{player.Player_Price} </button>
                    <button onClick={defaultNavigation} className="ply-add-to-crt">Player Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    )
}


