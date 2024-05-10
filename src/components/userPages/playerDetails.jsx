import React, { useState, useEffect } from 'react';
import './mainuser.css';
import { Link, useParams } from 'react-router-dom';
import modelImages from './images/model-img.jpg';
import Close from './images/cancel.png';
import axios from 'axios';
import baseUrl from '../../Urls';

export default function PlayerDetails() {
  const { id } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/playerDetails/${id}`);
      setPlayerData(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="usr-plyr-dtl-mn-sct">
      <div className="usr-plyr-dtl-mn-ctr">
        <div className="usr-sub-ctr-img">
          <Link to="/user-main-home">
            <img src={Close} alt="icon" className="close-icon" />
          </Link>
          <img src={playerData.Player_Image} alt="model" className="usr-mdl-img" />
        </div>
        <div className="user-sub-ctr-cnt">
          <h1 className="usr-plyr-dtl-name">{playerData.Player_Name}</h1>
          <p className="usr-plyr-dtl-pos">{playerData.Player_Position}</p>
          <p className="usr-plyr-dtl-desc">{playerData.Player_Description}</p>
          <p className="usr-plyr-dtl-own">
            Owner is <br />
            <span className="owner">{playerData.Owner_Name}</span>
          </p>
          <h2 className="now-bidd-value">₹{playerData.Player_Price}</h2>
        </div>
      </div>
    </div>
  );
}
