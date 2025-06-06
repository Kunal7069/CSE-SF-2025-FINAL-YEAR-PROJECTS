import React from 'react'
import { useContext,useEffect } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import {AppContext} from '../../context/AppContext'
import { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'

const DoctorProfle = () => {


  const {dToken,profileData,setProfileData,getProfileData,backendUrl} = useContext(DoctorContext)
  

  const [isEdit,setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
        const updateData = {
            address: profileData.address,
            fees: profileData.fees,
            available: profileData.available
        };

        const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData,{headers:{dToken}});

        if (data.success) {
            toast.success(data.message);  
            setIsEdit(false);
            getProfileData();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
      toast.error(error.message)
        console.log(error);
    }
};



  useEffect(()=>{

          if(dToken){
              getProfileData()
              // console.log(profileData)
          }
      },[dToken])



  return profileData &&  (
    <div>
      <div className='flex flex-col gap-4 m-5 '>

        <div>
          <img className='w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg '>
          <p className='flex items-center gap-2 text-3xl font-medium'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 '>
            <p>{profileData.degree}-{profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>

          </div>

          <div>
            <p className='flex items-centergap-1 text-sm font-medium mt-3'>About:</p>
            <p className='text-sm text-gray max-w-[700px] mt-1 '>{profileData.about}</p>

          </div>

          <p className='font-medium mt-4'>Appointment fee:<span className='text-gray-800'>{isEdit? <input type='number' onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees}></input>:profileData.fees}</span></p>

          <div className='flex gap-2 py-2 '>
            <p>Address:</p>
            <p>{isEdit?<input type='text' onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1}></input>:profileData.address.line1}</p>
            <br></br>
            <p>{isEdit?<input type='text' onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}></input>:profileData.address.line2}</p>
          </div>

          <div className='flex gap-1 pt-2 '>
            <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available} type='checkbox'></input>
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit?<button onClick={updateProfile} className='px-4 py-1 border border-blue-600 text-sm rounded-full'>Save</button>:
            <button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-blue-600 text-sm rounded-full'>Edit</button>
          }


    
        </div>
      </div>
      
    </div>
  )
}

export default DoctorProfle
