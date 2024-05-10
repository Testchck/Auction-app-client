import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./components/mainHome/login"
import RegisterUser from './components/mainHome/Register';

//user Panel
import UserHome from "./components/userPages/userPages"
import UserPlayerDisplay from './components/userPages/playerDetails'
import UserMainHome from './components/userPages/userMainHome';

//admin panel
import AdminTeamReg from "./components/adminPages/adRegTeam"
import AdminListTeam from './components/adminPages/adminListTeam'
import AdminAddPlayer from "./components/adminPages/adminAddPlayer"
import AdminLive from "./components/adminPages/adminLiveUpdation"
import AdminPlyrList from "./components/adminPages/adminListPlayer"
import EditTeam from "./components/adminPages/editTeam"
import AdminWalletUpdate from "./components/adminPages/adminWalletUpdate"


const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* userPages */}
        <Route path='/user-home' element={<UserHome />} />
        <Route path='/user-main-home' element={<UserMainHome />} />
        <Route path='/user-player-dtils/:id' element={<UserPlayerDisplay />} />

        {/* adminPages */}
        <Route path='/admin-team-reg' element={<AdminTeamReg />} />
        <Route path='/admin-list-team' element={<AdminListTeam />} />
        <Route path='/admin-add-plyr' element={<AdminAddPlayer />} />
        <Route path='/admin-live-updation' element={<AdminLive />} />
        <Route path='/admin-plyr-list' element={<AdminPlyrList />} />
        <Route path='/edit/:id  ' element={<EditTeam />} />
        <Route path='/admin-wallet-updation' element={<AdminWalletUpdate />} />
      </Routes>
    </Router>
  );
};

export default Main;