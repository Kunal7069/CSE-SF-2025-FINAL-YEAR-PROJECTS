import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointments from './pages/Appointments'
import Myappointments from './pages/MyAppointments'
import Navbar from './components/Navbar'
import MyProfile from './pages/MyProfile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>

<ToastContainer />
      
      <Navbar></Navbar>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/doctors' element={<Doctors></Doctors>}></Route>
        <Route path='/doctors/:speciality' element={<Doctors></Doctors>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/myprofile' element={<MyProfile></MyProfile>}></Route>
        <Route path='/myappointments' element={<Myappointments></Myappointments>}></Route>
        <Route path='/appointment/:docId' element={<Appointments></Appointments>}></Route>


        
      </Routes>
     
      
    </div>
  )
}

export default App
