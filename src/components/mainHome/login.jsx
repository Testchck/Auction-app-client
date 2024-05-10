import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./auth.css";
import baseUrl from '../../Urls';
import toast, { Toaster } from 'react-hot-toast';


import NavBar from './navBar';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    }
    try{
      const res = await axios.post(`${baseUrl}/api/login`, loginData);
      console.log(res);
      if (res.data.message === 'User Login Successfully'){
        const userResponce = await axios.get(`${baseUrl}/api/users/${email}`);
        const userData = (userResponce.data.users);

        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);

        toast.success(res.data.message);
        navigate('/user-main-home');
      } else if (res.data.message === 'Admin Login Successfully'){
        toast.success(res.data.message);
        navigate('/admin-team-reg');
      } else {
        toast.error("Check your username or Password");
      }
    } catch(e){
      console.log(e);
    }
  };

  return (
    <div className="App">
        <NavBar />
        <div className="lgn-main-stn">
        <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <Link to="/register" className='ur-reg'>Don't Have an Account</Link>
        </form>
      </div>
        </div>
        <Toaster />
    </div>
  );
};

export default App;