import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {

  const {userData,setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)


  const [isEdit,setIsEdit] = useState(false)
  const [image,setImage] = useState(false)

  const updateUserProfileData = async()=>{

    try {

      const formData = new FormData();

formData.append('name', userData.name);
formData.append('phone', userData.phone);
formData.append('address', JSON.stringify(userData.address));
formData.append('gender', userData.gender);
formData.append('dob', userData.dob);

image && formData.append('image', image);

const {data} = await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})

if(data.success){
  toast.success(data.message)
  await loadUserProfileData()
  setIsEdit(false)


}
else{

  toast.error(data.message)

}
      
    } catch (error) {

      console.log(error)
      toast.error(error)
      
    }

  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

{
  isEdit ? (
    <label htmlFor="image">
      <div className="inline-block relative cursor-pointer">
        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
        <img className='w-10 absolute bottom-12 right-12 ' src={image ? "" : assets.upload_icon} alt="" />
      </div>
      <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
    </label>
  ) : (
    <img className="w-36 rounded" src={userData.image} alt="" />
  )
}

{/* <img className='w-36 rounded ' src={userData.image}></img> */}
    
      {
        isEdit? 
        <input className='bg-gray-50  max-w-60 text-3xl font-medium ' type='text' value={userData.name} onChange={e=> setUserData(prev=>({...prev,name:e.target.value}))}></input>
        :<p className='font-medium  mt-4 text-3xl '>{userData.name}</p>
      }

      <hr></hr>

      <div>
        <p className=' underline text-neutral-500 mt-4 '>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 '>
          <p className='font-medium'>Email id:</p>
          <p>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
        isEdit? 
        <input className='bg-gray-50  max-w-60  ' type='text' value={userData.phone} onChange={e=> setUserData(prev=>({...prev,name:e.target.value}))}></input>:<p>{userData.phone}</p>
      }
      <p className='font-medium'>Address</p>
      {
        isEdit? <p>
        <input className='bg-gray-50  max-w-60  ' type="text" onChange={e=> setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))}  value={userData.address.line1}/>
        <br></br>
        <input className='bg-gray-50  max-w-60  ' type="text" onChange={e=> setUserData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))}  value={userData.address.line2}/>
        </p>:<p>{userData.address.line1}
          <br></br>
          {userData.address.line2}
        </p>
      }
        </div>
      </div>

      <div>
      <p className='underline mt-3 text-neutral-500'>BASIC INFORMATION</p>
<div className='grid grid-cols-[1fr_3fr]  gap-y-3 mt-3' >
  <p className='font-medium'>Gender:</p>
  {
    isEdit
    ? <select onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}> 
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    : <p>{userData.gender}</p>
  }
  <p>Birthday:</p>
  {
    isEdit
    ? <input type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}  value={userData.dob}/>
    : <p>{userData.dob}</p>
  }
</div>
      </div>

      <div className='mt-10'>
        {
          isEdit?
          <button className='bg-blue-900 border-blue-800 px-8 py-2 rounded-full' onClick={updateUserProfileData}>Save Information</button>:
          <button className='bg-blue-900 border-blue-800 px-8 py-2 rounded-full' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
       
    </div>
  )
}

export default MyProfile
