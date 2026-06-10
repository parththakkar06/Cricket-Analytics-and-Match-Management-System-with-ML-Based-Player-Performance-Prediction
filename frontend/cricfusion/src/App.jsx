import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/common/Signup'
import Login from './components/common/Login'
import { UserFeature } from './components/user/UserFeature'

import { Tounament } from './components/user/Tounament'

import Start from './components/layouts/Start'
import { CreateTournament } from './components/tournaments/CreateTournament'
import { About } from './components/common/About'

import { AllTournament } from './components/tournaments/AllTournament'
import { CreateTeam } from './components/teams/CreateTeam'
import { UserProfile } from './components/user/UserProfile'
import { Logout } from './components/common/Logout'


import CricketMatchLineup from './components/score/CricketMatchLineup'

import { AdminDashboar } from './components/admin/AdminDashboar'
import { UserList } from './components/admin/UserList'
import { Adminmatch } from './components/admin/Adminmatch'
import { AdminTeam } from './components/admin/AdminTeam'
import PrivateRoutes from './components/hook/PrivateRoutes'
// import CricFusionLanding from './components/common/CricFusionLanding'
import { Adminplyaer } from './components/admin/Adminplyaer'
import TournamentDetails from './components/tournaments/TournamentDetails'
import { TeamList } from './components/tournaments/TeamList'
import { PlayerList } from './components/tournaments/PlayerList'
import SelectTeam from './components/match/SelectTeam'

import CricketScoreCalculator from './components/score/CricketScoreCalculator'
import { Feature } from './components/common/Feature'
import { MatchSet } from './components/match/Matchset'

import CricketToss from './components/common/Coin'
import Highlights from './components/common/Highlights'
import ListMatch from './components/match/ListMatch'
import { SquadList } from './components/teams/SquadList'
// import LandingPage from './components/LandingPage'
import {  TournamentListAdmin } from './components/admin/TournamentListAdmin'
import { UserStatsList } from './components/admin/UserStatsList'
import LandingPage from './components/common/LandingPage'
import MyMatches from './components/UserData/MyMatches'
import MyStats from './components/UserData/MyStats'
import UserTournament from './components/UserData/UserTournament'
import UserTeams from './components/UserData/UserTeams'
import Summary from './components/score/Summary'
import { UserDashboard } from './components/user/UserDashboard'
// import UserStats from './components/UserData/UserStats'
// import PlayerMatchHistory from './components/UserData/PlayerMatchHistory'
// import PlayerTeams from './components/UserData/PlayerTeams'
// import PlayerTournaments from './components/UserData/PlayerTournaments'

// import SquadList from './components/teams/SquadList'







// import './assets/css/sb-admin-2.min.css'
// import './assets/css/all.min.css'
// import './assets/css/all.css'

// import { ListTeam } from './components/teams/ListTeam'

// import './App.css'

function App() {
 

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/dashboard" element={<UserDashboard />} />

{/*-------------------------------------- user main page-------------------------------------- */}z
        <Route path="/user" element={<UserFeature />}></Route>
        <Route path='/' element={<LandingPage/>}></Route>


{/* -----------------------------private router to add admin page -------------------------------- */}
        <Route path='' element={<PrivateRoutes />}>
          <Route path='/admin' element={<AdminDashboar />}></Route>
          <Route path='/match' element={<Adminmatch />}></Route>
          <Route path='/userstats' element={<UserStatsList/>}></Route>
          <Route path='/userlist' element={<UserList />}></Route>
      <Route path='/admintour' element={<TournamentListAdmin/>}></Route>
          <Route path='/adminteam' element={<AdminTeam />}></Route>
        </Route>
{/* -----------------------------private router to add admin page end  -------------------------------- */}

      
    
        <Route path="/toument" element={<Tounament />}></Route>

        <Route path='/start' element={<Start />}></Route>
        <Route path='/createtournament' element={<CreateTournament />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/score/:matchId' element={<CricketScoreCalculator />}></Route>
        <Route path='/lineup' element={<CricketMatchLineup />}></Route>
        {/* <Route path='/admin' element={<AdminNavbar/>}></Route> */}
       <Route path='/tour' element={<AllTournament />}></Route>
      <Route path="/tournament-details/:tournamentId" element={<TournamentDetails/>}></Route>
      <Route path="/players/:teamId" element={<PlayerList />}></Route>
      <Route path="/team/tour/team/:touranmentId" element={<TeamList  />} />
      <Route path='/team/:tournamentId' element={<CreateTeam />}></Route>
  
    {/* <Route path='/matchsetup' element={<MatchSet/>}></Route> */}
        {/* <Route path='/match' element={<ListTeam/>}></Route> */}
        <Route path='/userprofile' element={<UserProfile />}></Route>
        <Route path='/match/match/tour/:tournamentId' element={<ListMatch/>}></Route>

        <Route path='/matchsetup' element={<MatchSet/>}></Route>
        {/* <Route path='/landing' element={<CricFusionLanding/>}></Route> */}
        <Route path = '/adminplayer' element ={<Adminplyaer/>}></Route>
         <Route path='/selectteam/:tournamentId' element={<SelectTeam/>}></Route>
         <Route path='/highlights' element={<Highlights/>}></Route>
         <Route path='/feature' element={<Feature/>}></Route>
         <Route path='/squad/:teamId' element={<SquadList/>}></Route>
          <Route path='/mymatchs/:userId' element={<MyMatches/>}></Route>
        
        <Route path='/mystats/:userId' element={<MyStats/>}></Route>
        {/* <Route path='/userplayermatch' element={<PlayerMatchHistory/>}></Route> */}
        {/* <Route path='/userteams' element={<PlayerTeams/>}></Route> */}
        {/* <Route path='/usertournamet' element={<PlayerTournaments/>}></Route> */}
        {/* <Route path='/usertournament/:userId' element={<UserStats/>}></Route> */}
        <Route path='/usertournament/:userId' element={<UserTournament/>}></Route>
        <Route path='/userteams/:userId' element={<UserTeams/>}></Route>
        <Route path='/matchsummary/:matchId' element={<Summary/>}></Route>
        
          <Route path='/coin/:tournamentId' element={<CricketToss/>}></Route>
        <Route path='/logout' element={<Logout />}></Route>
      </Routes>


    </>
  )
}

export default App
