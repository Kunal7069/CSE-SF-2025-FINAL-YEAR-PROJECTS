import React, { useContext, useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Doctors = () => {

  const {speciality} = useParams()
  const {doctors} =  useContext(AppContext)

  const [filterDoc,setfilterDoc] = useState([])

  const navigate = useNavigate()


  const applyfilter = () => {
    if(speciality){
      setfilterDoc(doctors.filter(doc => doc.speciality===speciality))
    }
    else{
      setfilterDoc(doctors)
    }
  }

 useEffect(()=>{

  applyfilter()

 },[doctors,speciality])




  return (
    <div>

      <p className='text-gray-600'>Browse through doctors based on speciality</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 '>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={()=>speciality==='General physician'?navigate('/doctors'):navigate('/doctors/General physician')}>General Physician</p>
          <p onClick={()=>speciality==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')}>Gynecologist</p>
          <p onClick={()=>speciality==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')}>Dermatologist</p>
          <p onClick={()=>speciality==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')}>Pediatricians</p>
          <p onClick={()=>speciality==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')}>Neurologist</p>
          <p onClick={()=>speciality==='Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist')}>Gastroenterologist</p>
        </div>


        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 gap-y-6 '>
          {
            filterDoc.map((item,index)=>(
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
      </div>
      
    </div>
  )
}

export default Doctors
