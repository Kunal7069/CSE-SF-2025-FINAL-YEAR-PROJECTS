// import React, { useEffect, useState } from 'react';
// import {jwtDecode} from 'jwt-decode';
// import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../operations/authApi';
// import LogoutPopup from './LogoutPopup';

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [showLogoutPopup, setShowLogoutPopup] = useState(false);

//   // Get token and user information from Redux store
//   const { token } = useSelector(state => state.auth);
//   const { user } = useSelector(state => state.profile);

 

//   const handleLogoutpopup = () => {
//     setShowLogoutPopup(true);
//   };

//   const closeLogoutPopup = () => {
//     setShowLogoutPopup(false);
//   };

//   const confirmLogout = () => {
//     dispatch(logout(navigate)); 
//     setShowLogoutPopup(false);
//   };


//   useEffect(() => {
//     if (!token) return;

//     const decodedToken = jwtDecode(token);
//     const expirationTime = decodedToken.exp * 1000; 

//     if (Date.now() >= expirationTime) {
//       dispatch(logout(navigate)); 
//       return;
//     }

//     const remainingTime = expirationTime - Date.now();
//     const timer = setTimeout(() => {
//       dispatch(logout(navigate)); 
//     }, remainingTime);

//     return () => clearTimeout(timer);
//   }, [token, dispatch, navigate]);

//   return (
//     <div className='shadow-md w-full fixed top-0 left-0 z-50 bg-green-600 text-white h-[64px] mb-10'>
//       <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
//         {/* Logo section */}
//         <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
//           <BookOpenIcon className='w-7 h-7 text-white' />
//           <span>BackendVerse</span>
//         </div>

//         {/* Menu icon */}
//         <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7 text-white'>
//           {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
//         </div>

//         {/* Link items */}
//         <ul className={`bg-green-600 md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-10 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
//           <li className='md:ml-8 md:my-0 my-7 font-semibold text-white hover:text-[#2e5454] duration-300'>
//             <Link to="/">HOME</Link>
//           </li>

//           {!token && (
//             <li className='md:ml-8 md:my-0 my-7 font-semibold'>
//               <Link to="/login">
//                 <button className='bg-[#52bc6a] text-white hover:bg-white hover:text-[#447d7d] font-semibold px-3 py-1 rounded duration-300'>
//                   LOGIN
//                 </button>
//               </Link>
//             </li>
//           )}

//           {token && (user?.role === "Admin" || user?.role === "Publisher") && (
//             <>
//               <li className='md:ml-8 md:my-0 my-7 text-white hover:text-[#2e5454] duration-300 font-semibold'>
//                 <Link to="/create-blog">
//                   <div className="cursor-pointer flex items-center">
//                     CREATE BLOG
//                   </div>
//                 </Link>
//               </li>
//               <li className='md:ml-8 md:my-0 my-7 text-white hover:text-[#2e5454] duration-300 font-semibold'>
//                 <Link to="/dashboard">
//                   <div className="cursor-pointer flex items-center">
//                     DASHBOARD
//                   </div>
//                 </Link>
//               </li>
//             </>
//           )}

//           {token && (
//             <li className='md:ml-8 md:my-0 my-7 font-semibold duration-300'>
//               <button className='bg-[#4f8f5e] text-white hover:bg-white hover:text-[#447d7d] font-semibold px-3 py-1 rounded duration-500'
//                 onClick={handleLogoutpopup}>
//                 LOGOUT
//               </button>
//             </li>
//           )}
//         </ul>
//       </div>

//       {showLogoutPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <LogoutPopup onClose={closeLogoutPopup} onConfirm={confirmLogout} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;



import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../operations/authApi';
import LogoutPopup from './LogoutPopup';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [challengeDropdownOpen, setChallengeDropdownOpen] = useState(false); // New state for challenges dropdown

  // Get token and user information from Redux store
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);

  const handleLogoutpopup = () => {
    setShowLogoutPopup(true);
  };

  const closeLogoutPopup = () => {
    setShowLogoutPopup(false);
  };

  const confirmLogout = () => {
    dispatch(logout(navigate));
    setShowLogoutPopup(false);
  };

  useEffect(() => {
    if (!token) return;

    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;

    if (Date.now() >= expirationTime) {
      dispatch(logout(navigate));
      return;
    }

    const remainingTime = expirationTime - Date.now();
    const timer = setTimeout(() => {
      dispatch(logout(navigate));
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [token, dispatch, navigate]);

  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-50 bg-green-600 text-white h-[64px] mb-10'>
      <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
        {/* Logo section */}
        <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
          <BookOpenIcon className='w-7 h-7 text-white' />
          <span>BackendVerse</span>
        </div>

        {/* Menu icon */}
        <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7 text-white'>
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        {/* Link items */}
        <ul className={`bg-green-600 md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-10 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
          <li className='md:ml-8 md:my-0 my-7 font-semibold text-white hover:text-[#2e5454] duration-300'>
            <Link to="/">HOME</Link>
          </li>

          {!token && (
            <li className='md:ml-8 md:my-0 my-7 font-semibold'>
              <Link to="/login">
                <button className='bg-[#50bd69] text-white hover:bg-white hover:text-[#447d7d] font-semibold px-3 py-1 rounded duration-300'>
                  LOGIN
                </button>
              </Link>
            </li>
          )}

          {token && (user?.role === "Admin" || user?.role === "Publisher") && (
            <>
              <li className='md:ml-8 md:my-0 my-7 text-white hover:text-[#2e5454] duration-300 font-semibold'>
                <Link to="/create-blog">
                  <div className="cursor-pointer flex items-center">
                    CREATE BLOG
                  </div>
                </Link>
              </li>
              <li className='md:ml-8 md:my-0 my-7 text-white hover:text-[#2e5454] duration-300 font-semibold'>
                <Link to="/dashboard">
                  <div className="cursor-pointer flex items-center">
                    DASHBOARD
                  </div>
                </Link>
              </li>
            </>
          )}

          {/* Challenges dropdown for Visitor */}
          {token && user?.role === "Visitor" && (
            <li
              className='md:ml-8 md:my-0 my-7 font-semibold text-white hover:text-[#2e5454] duration-300 relative'
              onMouseEnter={() => setChallengeDropdownOpen(true)}
              onMouseLeave={() => setChallengeDropdownOpen(false)}
            >
              <button className='flex items-center'>
                CHALLENGES <ChevronDownIcon className='w-4 h-4 ml-1' />
              </button>
              {challengeDropdownOpen && (
                <ul className='absolute w-44 left-0 bg-white shadow-md rounded mt-1 py-2'>
                  <li className='px-4 py-2 hover:bg-[#4f8f5e]'>
                    <Link to="/daily-challenge">Daily Challenge</Link>
                  </li>
                  <hr />
                  <li className='px-4 py-2  hover:bg-[#4f8f5e]'>
                    <Link to="/weekly-challenges">Weekly Challenge</Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {token && (
            <li className='md:ml-8 md:my-0 my-7 font-semibold duration-300'>
              <button
                className='bg-[#50bd69] text-white hover:bg-white hover:text-[#447d7d] font-semibold px-3 py-1 rounded duration-500'
                onClick={handleLogoutpopup}
              >
                LOGOUT
              </button>
            </li>
          )}
        </ul>
      </div>

      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <LogoutPopup onClose={closeLogoutPopup} onConfirm={confirmLogout} />
        </div>
      )}
    </div>
  );
};

export default Header;