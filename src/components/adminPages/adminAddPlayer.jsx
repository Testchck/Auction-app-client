import React, { useState } from 'react';
import './admin.css';
import toast, { Toaster } from 'react-hot-toast';
import baseUrl from '../../Urls';

//import modules
import NavBar from './navBar'
import axios from 'axios';

export default function AdminAddPlayer () {
  const [ playername, setPlayername ] = useState() ;
  const [ playerdescription, setPlayerDescription ] = useState() ;
  const [ playerpos, setPlayerpos ] = useState() ;
  const [ playerprice, setPlayerprice ] = useState() ;
  const [ playerimage, setPlayerimage ] = useState() ;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Read the image file as a base64 encoded string
      setPlayerimage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const PlayerDetails = {
      playername,
      playerdescription,
      playerpos,
      playerprice,
      playerimage,
    }

    console.log(PlayerDetails);
    try{
      const responce =await axios.post(`${baseUrl}/api/player/register`, PlayerDetails);
      console.log(responce);
      if(responce.data.message === 'Player register successfully' ){
        toast.success(responce.data.message);
        window.location.reload();
      }
    } catch(err){
      toast.error("Something Went Wrong Contact the Developers");
      console.log(err);
    }
  }
    return (
      <div className='ad-mn-add-plyr-sct'>
        <NavBar />
        <div className="ad-mn-add-plyr-sb-sct">
            <h1 className="ad-mn-add-plyr-sb-h">ADD PLAYER</h1>
            <p className="ad-mn-add-plyr-sb-p">
                Add The Genuine Player
            </p>
                {playerimage && (
                  <img src={playerimage} alt="Product Preview" className='ad-mn-add-ply-img' />
                )}
            <form onSubmit={handleSubmit} className="ad-mn-add-plyr-form">
                <input type="text" placeholder="Player Name" className="ad-mn-add-plyr-inp" value={playername} onChange={(e) => setPlayername(e.target.value)} required/>
                <input type="text" placeholder="Player Description" className="ad-mn-add-plyr-inp" value={playerdescription} onChange={(e) => setPlayerDescription(e.target.value)} required/>
                <input type="text" placeholder="Player Position" className="ad-mn-add-plyr-inp" value={playerpos} onChange={(e) => setPlayerpos(e.target.value)} required/>
                <input type="text" placeholder="Player Price" className="ad-mn-add-plyr-inp" value={playerprice} onChange={(e) => setPlayerprice(e.target.value)} required />
                <input type="file" accept='image/*' onChange={handleImageChange} required />
                <button type='submit' className="ad-mn-add-plyr-btn">ADD PLAYER</button>
            </form>
        </div>
        <Toaster />
      </div>
    )
}
