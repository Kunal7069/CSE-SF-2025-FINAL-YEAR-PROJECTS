import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { assets } from '../../assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {


    const {dToken,dashData,setDashData,getDashData,completeAppointment,cancelAppointment} = useContext(DoctorContext)

    const {slotDate} = useContext(AppContext)

    useEffect(()=>{
        if(dToken){
            getDashData()
        }
    },[dToken])


  return dashData &&  (
    <div className='m-5'>

        <div className='m-5'>
          <div className='flex flex-wrap gap-3'>
            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer'>
              <img className='w-14' src={assets.earning_icon} alt='' />
              <div>
                <p className='text-xl font-semibold'>{dashData.earnings}</p>
                <p className='text-gray-400'>Earnings</p>
              </div>
            </div>
        
            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer'>
              <img className='w-14' src={assets.appointments_icon} alt='' />
              <div>
                <p className='text-xl font-semibold'>{dashData.appointments}</p>
                <p className='text-gray-400'>Appointments</p>
              </div>
            </div>
        
            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer'>
          <img className='w-14' src={assets.patients_icon} alt='' />
          <div>
            <p className='text-xl font-semibold'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
        </div>

        
        

        </div>  

        <div className='bg-white'>
          <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
            <img src={assets.list_icon} alt='' />
            <p className='font-semibold'>Latest Bookings</p>
          </div>
        
          <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 ' key={index}>
              <img className='rounded-full w-10 ' src={item.userData.image} alt='' />
              <div className='flex-1 text-sm'>
        
              <p className='text-gray-800'>{item.userData.name}</p>
              <p className='text-gray-800'>{item.slotDate}</p>
              </div>
                {
                      item.cancelled?
                      <p className='text-red-400 font-medium'>cancelled</p>
                      :item.isCompleted?
                       <p className='text-green-400 font-medium'> completed</p>: 
                        <div>
                       <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon}></img>
                       <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon}></img>
                     </div>
                       
                    }
            </div>
          ))}
        </div>
        
        </div>
        
        
        
        
  
            
    </div>
  )
}

export default DoctorDashboard
