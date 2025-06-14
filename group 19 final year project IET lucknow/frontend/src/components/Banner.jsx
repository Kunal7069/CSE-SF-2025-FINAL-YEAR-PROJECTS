import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

  return (
    <div className='flex bg-teal-800 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10  '> 
    
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-25 lg:pl-5'>   
            <div className='text-3xl font-semibold'>
                <p>Book Appointment</p>
                <p className='mt-4'>With 100+ Docotrs</p>
            </div>
            <button onClick={()=>navigate('/login')} className='bg-white text-sm text-gray-800 px-8 py-3 rounded-full mt-6 hover:scale-110'>Create Account</button>
        </div>

        <div className='hidden md:block md:w-1/2 lg:w-[370] relative '>
            <img src={assets.appointment_img} alt='appointmentimage' className='w-full absolute bottom-0 right-0 max-w-md h-96 '></img>
        </div>
      
    </div>
  )
}

export default Banner
