import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const TopDoctors = () => {

    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)


  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>

        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center '> Simply Browse through our List of trusted Doctors</p>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 gap-y-6 '>
            {
                doctors.slice(0,10).map((item,index)=>(
                    <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer ' key={index}>
                        <img src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available?'text-green-500':'text-gray-500'} `}>
                                <p className={`${item.available?'bg-green-500':'bg-gray-500'} rounded-full w-2 h-2`}></p><p>{item.available?'Available':'Not Available'}</p>
                            </div>
                            <p className='text-lg font-medium'>{item.name}</p>
                            <p>{item.speciality}</p>

                        </div>
                    </div>
                ))
            }
        </div>
        <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
      
    </div>
  )
}

export default TopDoctors
