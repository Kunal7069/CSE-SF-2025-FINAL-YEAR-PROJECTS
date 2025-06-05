import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import { DoctorContext } from './context/doctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfle'

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-white'>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <div className='flex items-start'>
        <Sidebar></Sidebar>
        <Routes>
  <Route path='/' element={<></>} />
  <Route path='/admin-dashboard' element={<Dashboard />} />
  <Route path='/all-appointments' element={<AllAppointments />} />
  <Route path='/add-doctor' element={<AddDoctor />} />
  <Route path='/doctor-list' element={<DoctorsList />} />
  <Route path='/doctor-dashboard' element={<DoctorDashboard></DoctorDashboard>}></Route>
  <Route path='/doctor-appointments' element={<DoctorAppointments></DoctorAppointments>}></Route>
  <Route path='/doctor-profile' element={<DoctorProfile></DoctorProfile>}></Route>

</Routes>
      </div>
    </div>
  ):(
    <>
    <Login></Login>
    <ToastContainer></ToastContainer>
    
    </>
  )
}

export default App
