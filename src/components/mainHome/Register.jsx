import React, { useState } from 'react'
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../Urls';
import toast, { Toaster } from 'react-hot-toast';

//import pages
import NavBar from './navBar'
import axios from 'axios';

export default function Register () {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const userReg = {
            username : name,
            useremail : email,
            userpassword :  password,
            userconfirmpassword :  confirmPassword
        }

        try{
            if (userReg.userpassword === userReg.userconfirmpassword){
                const response = await axios.post(`${baseUrl}/api/user/register`, userReg);
                console.log(response);
                if (response.status === 200) {
                  if (response.data.message === 'User already exist') {
                      toast.error('User already exists');
                  } else if (response.data.message === 'User register successfully') {
                      toast.success('User registered successfully');
                      setTimeout(() => navigate('/'), 3000);
                  }
              } else {
                    toast.error('Something went wrong....');
                }
            } else {
                toast.error("Password doesn't match!");
            }
        } catch(e){
            console.log(e);
        }
    }
    return (
      <div className='App'>
        <NavBar />
        <div className="lgn-main-stn">
        <div className="login-container">
        <h2>Create an Account</h2>
        <form>
          <div className="input-group">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Create Account
          </button>
          <Link to="/" className='ur-reg'>Already I have an Account</Link>
        </form>
      </div>
        </div>
        <Toaster />
      </div>
    )
}
