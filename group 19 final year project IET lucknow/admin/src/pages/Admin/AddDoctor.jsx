import React from "react";
import { assets } from "../../assets_admin/assets";
import { useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { useContext } from "react";
import axios from "axios";

const AddDoctor = () => {

const [docImg, setDocImg] = useState(false);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [experience, setExperience] = useState('1 Year');
const [fees, setFees] = useState('');
const [about, setAbout] = useState('');
const [speciality, setSpeciality] = useState('General physician');
const [degree, setDegree] = useState('');
const [address1, setAddress1] = useState('');
const [address2, setAddress2] = useState('');

const {backendUrl,aToken} = useContext(AdminContext)


const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
      if (!docImg) {
          return toast.error('Image Not Selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));



      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
        
      }
      else{
          toast.error(data.message)
      }

  } catch (error) {
      // error handling here
      toast.error(error)
      console.log(error)
  }
}








  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-3xl font-medium">Add Doctor</p>

      <div className="px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-400">
        <label htmlFor="doc-img">
          <img className="cursor-pointer" src={docImg? URL.createObjectURL(docImg):assets.upload_area} alt="" />
        </label>
        <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
        <p>
          Upload doctor <br /> picture
        </p>
      </div>

      <div className="flex flex-col items-start gap-10 ">
        <div className="w-full lg:flex-1 flex flex-col gap-4">
          <div>
            <p>Doctor name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Name" required />
          </div>

          <div>
            <p>Doctor Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="email" required />
          </div>

          <div>
            <p>Doctor Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
          </div>

          <div>
            <p>Experience</p>
            <select onChange={(e)=>setExperience(e.target.value)} value={experience} name="" id="">
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
            </select>
          </div>

          <div>
            <p>Fees</p>
            <input onChange={(e)=>setFees(e.target.value)} value={fees} type="number" placeholder="fees" required />
          </div>

          <div>
            <p>Speciality</p>
            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} name="" id="">
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <p>Education</p>
            <input onChange={(e)=>setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required />
          </div>

          <div>
            <p>Address</p>
            <input onChange={(e)=>setAddress1(e.target.value)} value={address1} type="text" placeholder="address 1" required />
            <input onChange={(e)=>setAddress2(e.target.value)} value={address2} type="text" placeholder="address 2" required />
          </div>

          <div className="mt-4 mb-2">
            <p>About Doctor</p>
            <textarea
            onChange={(e)=>setAbout(e.target.value)} value={about}
              className="w-full px-4 pt-2 border-rounded"
              placeholder="write about doctor"
              rows={5}
              required
            ></textarea>
          </div>

          <button type="submit" className="bg-blue-800 px-10 py-3 mt-4 text-white ">Add Doctor</button>
        </div>
      </div>
      </div>
    </form>
  );
};

export default AddDoctor;
