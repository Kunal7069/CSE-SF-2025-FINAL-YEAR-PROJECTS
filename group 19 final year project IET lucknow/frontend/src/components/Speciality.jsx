import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const Speciality = () => {
  return (
    <div className='flex flex-col items-center py-20' id='speciality'>
      <h1 className='font-medium text-3xl '> Find by Speciality </h1>
      <p>Search through our list of specialist doctors and book your appointment  </p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {
          specialityData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center cursor-pointer' key={index} to={`/doctors/${item.speciality}`}>
              <img src={item.image} alt="" className='w-16 sm:w-24 mb-2 ' />
              <p>{item.speciality}</p>
            </Link>
          ))
        }
      </div>
      
    </div>
  )
}

export default Speciality
