import React, { useEffect, useState } from 'react';
import './admin.css';
// import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import baseUrl from '../../Urls';

//import modules
import NavBar from './navBar'

export default function AdminListTeam () {
    const [ data, setData ] = useState([]);
    const [ teams, setTeams ] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try{
            const responce = await axios.get(`${baseUrl}/api/data`);
            setData(responce.data);
        } catch(err){
            console.error(err);
        }
    }

    const handleDelete = (id) => {
        axios.delete(`${baseUrl}/api/team/${id}`)
      .then(response => {
        console.log(response.data);
        toast.success(response.data + ' Deleted successfully');
        // Update teams state to reflect deletion
        setTeams(teams.filter(team => team._id !== id));
      })
      .catch(error => {
        console.error('Error deleting team:', error);
      });
    }
    return (
      <div className='ad-tm-lt-tm-sct'>
        <NavBar />
        <div className="ad-tm-lt-tm-sb-sct">
            <h1 className="ad-tm-lt-tm-sb-h">List Team</h1>
            <div className="ad-tm-lt-tm-sb-li-div">
                <table>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Place</th>
                            <th>Phone Number</th>
                            <th>Team Maneager</th>
                            <th>Wallet Balance</th>
                            {/* <th>Edit Button</th> */}
                            <th>Delete Button</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((team, index) => (
                        <tr key={index}>
                            <td>{team.Team_name}</td>
                            <td>{team.Place}</td>
                            <td>{team.Phone}</td>
                            <td>{team.Team_manager}</td>
                            <td>{team.Wallet}</td>
                            {/* <td><Link to={`/edit/${team._id}`} className='ad-tm-li-ed-btn'>Edit</Link></td> */}
                            <td><button className='ad-tm-li-dlt-btn' onClick={() => handleDelete(team._id)} >Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        <ToastContainer />
    </div>
    )
  }