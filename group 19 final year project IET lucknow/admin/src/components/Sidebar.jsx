import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import {NavLink} from 'react-router-dom'
import { DoctorContext } from '../context/doctorContext'

const Sidebar = () => {

   const { aToken,setToken }   =  useContext(AdminContext)
   const {dToken,setDToken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r shadow-2xl'>
      {

      aToken && <ul className='mt-5'>

      <NavLink to={'/admin-dashboard'}>
  <p>Dashboard</p>
</NavLink>

<NavLink to={'/all-appointments'}>
  <p>Appointments</p>
</NavLink>

<NavLink to={'/add-doctor'}>
  <p>Add Doctor</p>
</NavLink>

<NavLink to={'/doctor-list'}>
  <p>Doctors List</p>
</NavLink>



      </ul>

}
      
{

dToken && <ul className='mt-5'>

<NavLink to={'/doctor-dashboard'}>
<p>Dashboard</p>
</NavLink>

<NavLink to={'/doctor-appointments'}>
<p>Appointments</p>
</NavLink>

<NavLink to={'/doctor-profile'}>
<p>Profile</p>
</NavLink>



</ul>

}
    </div>
  )
}

export default Sidebar
