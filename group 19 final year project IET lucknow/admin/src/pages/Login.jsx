import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/doctorContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const url = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
      if (state === 'Admin') {
        const { data } = await axios.post(url + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          navigate('/admin/dashboard');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(url + '/api/doctor/login', { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          navigate('/doctor/dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-4 auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm shadow-lg'>
        <p className='text-2xl font-bold'>{state === 'Admin' ? 'Admin Login' : 'Doctor Login'}</p>

        <div className='w-full'>
          <p>Email</p>
          <input
            type='text'
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            type='password'
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button className='bg-blue-800 text-white w-full py-2 rounded'>Login</button>

        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span onClick={() => setState('Doctor')} className='text-blue-700 cursor-pointer'>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span onClick={() => setState('Admin')} className='text-blue-700 cursor-pointer'>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
