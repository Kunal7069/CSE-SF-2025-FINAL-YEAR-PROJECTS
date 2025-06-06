import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext.jsx'
import { assets } from '../../assets_admin/assets.js'

const AllAppointments = () => {

  const {aToken,appointments,getAllAppointments,cancelAppointment} = useContext(AdminContext)
  const {calculateAge,slotDateFormat} = useContext(AppContext);


  useEffect(()=>{
    if(aToken){
      getAllAppointments()
      
    }
  },[aToken])


  return (
    
  <div className='w-full max-w-6xl m-5'>
  <p className='mb-3 text-lg font-medium'>All Appointments</p>

  <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
    <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col'>
      <p>#</p>
      <p>Patient</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Doctor</p>
      <p>Fees</p>
      <p>Actions</p>
    </div>

    {appointments.map((item, index) => (
      <div className='flex flex-wrap justify-between items-center text-gray-500 py-3 px-6 border max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] ' key={index}>
        <p className='max-sm:hidden'>{index + 1}</p>
        <div className='flex items-center gap-2 '>
        <img className='w-8 rounded-full' src={item.userData.image} alt='' />

        <p>{item.userData.name}</p>
        </div>

        <p> {calculateAge(item.userData.dob)}</p>
        <p>{slotDateFormat(item.slotDate)}, {slotDateFormat(item.slotTime)}</p>

        <div className='flex items-center gap-2'>

          <img className='w-8 rounded-full'src={item.docData.image} ></img>
          <p>{item.docData.name}</p>

        </div>

        <p>{item.amount}</p>
        {
          item.cancelled?
          <p className='text-red-400 text-xs font-medium'>cancelled</p>:item.isCompleted?<p className='text-green-400 font-medium'>Completed</p>:
          <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon}></img>
        }

      </div>
    ))}

    
  </div>
</div>

  )
}

export default AllAppointments
