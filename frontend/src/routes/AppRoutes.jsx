import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import EventDashboard from '../pages/EventDashboard'
import TeamDashboard from '../pages/TeamDashboard'
import Auth from '../pages/Auth'
import CreateTeam from '../pages/CreateTeam'
import TeamDisplay from '../pages/TeamDisplay'
import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile'
import TeamRequests from '../pages/TeamRequests'
import EventDisplay from '../pages/EventDisplay'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/events' element={<EventDashboard />} />
        <Route path='/event/:id' element={<EventDisplay />} />
        <Route path='/create-team' element={<CreateTeam />} />
        <Route path='/teams' element={<TeamDashboard />} />
        <Route path='/team/:id' element={<TeamDisplay />} />
        <Route path='/team/:id/edit' element={<TeamDisplay />} />
        <Route path='/team/:id/requests' element={<TeamRequests />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/profile/:id/edit-profile' element={<EditProfile />} />
    </Routes>
  )
}

export default AppRoutes
