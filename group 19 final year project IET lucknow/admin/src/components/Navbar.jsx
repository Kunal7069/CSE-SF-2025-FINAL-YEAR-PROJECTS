import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/doctorContext';

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const {dToken,setDToken} = useContext(DoctorContext)

    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    };

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'></p>
            </div>
            <button onClick={logout} className='text-sm px-10 py-2 rounded'>
                Logout
            </button>
        </div>
    );
};

export default Navbar;
