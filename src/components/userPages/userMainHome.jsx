import React, { useState, useEffect } from 'react';
import './mainuser.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../Urls';


//import images
import userIcon from './images/user.png'
import Grd from '../images/gradient.png';


export default function UserMainHome() {
    const [playerData, setPlayerData] = useState([]);
    const [hisplayerData, setHisPlayerData] = useState([]);
    const [ userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        navigate('/');
    };

    const defaultNavigation = () => {
        navigate('/');
    };

    useEffect(() => {
        fetchData();
        historyData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/player/data`);
            setPlayerData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const historyData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/all/player/data`);
            setHisPlayerData(res.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    

    return (
        <div className='usr-plyr-dtl-mn-scts'>
        <div className="profile-section">
            <img src={userIcon} alt="icon" className='user-icon' />
            {userData ? userData.username : 'User'}
            <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
            <div className="usr-plyr-sct-one">
            {playerData.map((player, index) => (
                <div className="usr-main-ctr" key={index}>
                    <div style={{width: "30vw", height: "80vh", backgroundImage: `url(${player.Player_Image})`, backgroundSize: "cover", overflow: "hidden", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px"}}></div>
                    <div className="user-ctr-two">
                        <h1 className="player-name">{player.Player_Name}</h1>
                        <p className="player-position">{player.Player_Position}</p>
                        <p className="player-description">
                        {player.Player_Description}
                        </p>
                        <p className="player-owner">
                            Owner is <br />
                            <span className="owner">{player.Owner_Name}</span>
                        </p>
                        <h2 className="now-bidd-value">₹{player.Player_Price}</h2>
                    </div>
                </div>
                ))}
            </div>
            <div className="usr-plyr-sct-two">
                <div className="usr-scroll-sectn">
                <div className="scroller">
                    <div className="plyr-main-ctr">
                    {hisplayerData.map((Hisplayer, index) => (
                        <div className="player-div" key={index} style={{width: "300px", height: "400px", backgroundImage: `url(${Hisplayer.Player_Image})`, backgroundSize: "cover", overflow: "hidden", borderRadius: "20px"}}>
                            <div className="plyr-div">
                                {/* <img src={player.Player_Image} alt="imag" className='usr-plyr-img'/> */}
                                <img src={Grd} alt="gradient" className="plyr-grd" />
                                    <div className="plyr-txt-ctn">
                                        <h1 className="plyr-nme">{Hisplayer.Player_Name}</h1>
                                        <p className="plyr-pos">{Hisplayer.Player_Position} Position</p>
                                        <div className="plyr-btn">
                                            <button className="ply-price">₹{Hisplayer.Player_Price} </button>
                                            <Link to={`/user-player-dtils/${Hisplayer._id}`} onClick={defaultNavigation} className="ply-add-to-crt">Player Details</Link>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

