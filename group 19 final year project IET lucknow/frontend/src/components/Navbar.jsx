import React, { useState } from 'react'
import {assets} from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const navigate = useNavigate();


  const {token,setToken,userData} = useContext(AppContext)

  const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b'>
      <img src={assets.logo} alt="logo" style={{width: '100px'}}/>
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li>Home</li>
        </NavLink>
        <NavLink to='/doctors'>
          <li>All Doctors</li>
        </NavLink>
        <NavLink to='/about'>
          <li>About</li>
        </NavLink>
        <NavLink to='contact'>
          <li>Contact</li>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token && userData ?
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img src={userData.image} alt="profile" className='w-8 rounded-full' />
            <img src={assets.dropdown_icon} alt="dropdown_icon" className='w-2.5'/>
            <div className='absolute top-0 right-0 pt-14 text-base font-medium  z-20  hidden group-hover:block'> 
              <div className='flex flex-col min-w-40 bg-slate-500 rounded-full p-4'>
                <p onClick={()=>navigate('/myprofile')} className='cursor-pointer'>My Profile</p>
                <p onClick={()=>navigate('/myappointments')} className='cursor-pointer'>My Appointment</p>
                <p onClick={logout} className='cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
          :<button onClick={()=>navigate('/login')} className='bg-slate-950 text-white px-8 py-3 rounded-md hidden md:block'>Create Account</button>
        }
        
      </div>
      
    </div>
  )
}

export default Navbar
