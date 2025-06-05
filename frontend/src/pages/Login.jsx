import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux';
import { login } from '../operations/authApi';
import { BookOpenIcon } from 'lucide-react';


function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, password } = formData

  const onSubmit = (e)=>{
    // console.log(formData)
    e.preventDefault()
    dispatch(login(email, password, navigate))
    
  }


  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <div className="bg-white min-h-screen bg-opacity-90 flex flex-col justify-center items-center px-16 py-12 max-md:px-5">
        <div className="w-[800px] max-w-full mt-20 mb-16 max-md:my-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 shadow-sm shadow-slate-500 rounded-3xl">
            <div className="flex flex-col items-stretch  w-[48%] max-md:w-full max-md:ml-0 bg-green-600  rounded-l-3xl max-sm:hidden">
              <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-10">
                {/* <img
                  loading="lazy"
                  srcSet=""
                  alt="logo"
                  className="aspect-[3.11] object-contain object-center  self-center w-[300px] overflow-hidden  max-md:max-w-full"
                /> */}
                <BookOpenIcon className="w-16 h-16 text-green-600 mx-auto mt-10 bg-white rounded-lg p-3 " />


                <div className="text-white text-center text-2xl  whitespace-nowrap mt-10 max-md:mt-10">
                  <span className="font-bold text-lg tracking-[2px] ">
                    Welcome Back!
                  </span>
                  <br />
                  <span className="text-2xl font-bold">LOGIN</span>
                </div>
                <div className="text-white text-md  self-center whitespace-nowrap mt-10 max-md:mt-10">
                  <span >Don't have an account?{" "}</span>
                </div>
                <Link
                  to="/signup"
                  className="text-blue-950 text-center text-base font-bold whitespace-nowrap bg-white self-center justify-center items-stretch mt-2 px-12 py-3.5 rounded-[45px] max-md:px-5"
                >
                  Sign up
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[42%] ml-5 max-md:w-full max-md:ml-0">
              <div className="grow max-md:max-w-full max-md:mt-10 ">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 ">
                  <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0 ">
                    <div className="flex-col overflow-hidden relative flex min-h-[48px] grow py-12 max-md:max-w-full max-sm:-mt-10 max-sm:p-4">
                      <div className="relative text-slate-700 text-2xl font-bold leading-10 tracking-normal self-stretch  max-md:max-w-full max-md:mt-10">
                        Login
                      </div>
                      <div className="relative flex flex-col items-stretch self-start  max-md:mt-10 ">
                        <input
                          className="justify-center text-zinc-400 text-base leading-6 mt-10 max-md:mt-10 border border-[#E5E5E5] pr-28 pl-2 py-3 rounded-md w-72"
                          type="text"
                          placeholder="Email *"
                          name="email"
                          onChange={onChange}
                        />

                        <div className="relative">
                          <input
                            className="justify-center text-zinc-400 text-base leading-6 mt-10 max-md:mt-10 border border-[#E5E5E5] pr-40 pl-2 py-3 rounded-md w-72"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password *"
                            name="password"
                          onChange={onChange}
                          />
                          <span
                            className="absolute top-1/2 mt-3 right-4 transform  cursor-pointer"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <svg
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                height="1em"
                                width="1em"
                              >
                                <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                              </svg>
                            ) : (
                              <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                              >
                                <path d="M508 624a112 112 0 00112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 00-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 000 11.31L155.25 889a8 8 0 0011.31 0l712.16-712.12a8 8 0 000-11.32zM332 512a176 176 0 01258.88-155.28l-48.62 48.62a112.08 112.08 0 00-140.92 140.92l-48.62 48.62A175.09 175.09 0 01332 512z" />
                                <path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 01445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5z" />
                              </svg>
                            )}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="relative w-52 text-white text-sm font-bold leading-5 tracking-normal  bg-green-500 hover:bg-[#3b6a46] duration-300 self-stretch justify-center items-stretch mt-6 px-8 py-4 rounded-xl max-md:max-w-full max-md:px-5"
                      onClick={onSubmit}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Login
