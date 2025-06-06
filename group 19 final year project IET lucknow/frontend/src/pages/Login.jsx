import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {

  const [state,setState] = useState('Sign Up')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
  const navigate = useNavigate()

  const {backendUrl,token,setToken} = useContext(AppContext)


  const onSubmitHandler = async (event)=>{
     event.preventDefault()

     try {

      if(state == 'Sign Up'){

        const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})

        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)

        }
        else{
          toast.error(data.message)
        }


      }
      else{

        const {data} = await axios.post(backendUrl + '/api/user/login ',{password,email})

        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)

        }
        else{
          toast.error(data.message)
        }

      }
      
     } catch (error) {

      toast.error(error.message)
      console.log(error.message)
      
     }
       
  }

  useEffect(()=>{
    if(token){
      console.log(token)
      navigate('/')

    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler}>
        <div className='flex flex-col gap-4 auto items-start p-8 min-w-[340px] sm:min-w-96  border rounded-xl text-sm shadow-lg '>
        <p className='text-2xl font-bold'>{state==='Sign Up'?"Create Account":"Login"}</p>
        <p>Please {state==='Sign Up'?"Sign Up":"Login"} to book Appointment</p>

        {
          state==='Sign Up' && 
          <div className='w-full'>
          <p>Full Name</p>
          <input type='text' className='border border-zinc-300 rounded w-full p-2 mt-1'  onChange={(e)=>setName(e.target.value)} value={name} required></input>

        </div>
        }

       

        <div className='w-full'>
          <p>Email</p>
          <input type='text' className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setEmail(e.target.value)} value={email} required></input>

        </div>

        <div className='w-full'>
          <p>Password</p>
          <input type='text' className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setPassword(e.target.value)} value={password} required></input>

        </div>

        <button type='submit' className='bg-blue-800 text-white w-full py-2 rounded'>{state==='Sign Up'?"Create Account":"Login"}</button>

        {
          state=='Sign Up'?
          <p>Already have Account? <span onClick={()=>setState('Login')} className='text-blue-700'>Login here</span></p>
          :<p>Create new Account?  <span onClick={()=>setState('Sign Up')} className='text-blue-700'>Click here</span> </p>
        }

        </div>
      
    </form>
  )
}

export default Login
