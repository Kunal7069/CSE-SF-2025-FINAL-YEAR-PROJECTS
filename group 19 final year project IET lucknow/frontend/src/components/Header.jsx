import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20 bg-teal-600'>
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw]'>
            <p className='text-3xl md:text-4xl text-white '> Book appointment  <br></br> with trusted doctors </p>
            <div className='flex flex-col md:flex-row items-center gap-4 text-white '>
                <img src={assets.group_profiles} alt="doctorsgroup" className='w-28 '/>
                <p>Schedule your appointment </p>
            </div>
            <a href='#speciality' className='flex items-center gap-3 bg-white px-8 py-3 rounded-full m-auto md:m-0   '>
                Book appointment
                <img src={assets.arrow_icon} alt="arrow" />

            </a>
        </div>

        <div className='w-[400px] h-[350px] relative '>
            <img src={assets.header_img} alt="headerimg" className='w-auto h-auto  md:absolute bottom-0  scale-150 ' />
        </div>
      
    </div>
  )
}

export default Header
