import React, { useEffect, useState } from 'react';
import './admin.css';
import baseUrl from '../../Urls';

// Import modules
import NavBar from './navBar';
import axios from 'axios';

export default function AdminListPlayer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/all/player/data`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${baseUrl}/api/player/${id}`)
      .then(response => {
        console.log(response.data);
        alert(response.data + ' Deleted successfully');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting team:', error);
      });
  };

  return (
    <div className='ad-mn-li-plyr-sct'>
      <NavBar />
      <div className='ad-tm-lt-tm-sb-sct'>
        <h1 className='ad-tm-lt-tm-sb-h'>List Player</h1>
        <div className='ad-tm-lt-tm-sb-li-div'>
          <table>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Player Description</th>
                <th>Player Position</th>
                <th>Player Price</th>
                <th>Owned Team</th>
                <th>Delete Button</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((playerdata, index) => (
                  <tr key={index}>
                    <td>{playerdata.Player_Name}</td>
                    <td>{playerdata.Player_Description}</td>
                    <td>{playerdata.Player_Position}</td>
                    <td>{playerdata.Player_Price}</td>
                    <td>{playerdata.Owner_Name}</td>
                    <td>
                      <button
                        className='ad-tm-li-dlt-btn'
                        onClick={() => handleDelete(playerdata._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
