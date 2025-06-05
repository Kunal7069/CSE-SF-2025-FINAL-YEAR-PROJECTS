import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../operations/authApi";
import Navbar from "../components/Navbar";
import { BookOpenIcon } from "lucide-react";



function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Password length validation
    if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        setLoading(false); // Stop loading since there's an error
        return;
    }

    try {
        dispatch(setSignupData(formData));
        await dispatch(sendOtp(formData.email, navigate));
    } catch (error) {
        // console.log("Error during signup:", error);
    } finally {
        setLoading(false); // Stop loading after the operation
    }

    // Reset form data
    setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
    });
};

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <div className="bg-white bg-opacity-90 flex flex-col justify-center items-center px-16 py-12 max-md:px-5 mt-8">
        <div className="w-[929px] max-w-full mt-8 mb-16 max-md:my-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 shadow-sm shadow-slate-500 rounded-3xl">
            <div className="flex flex-col items-stretch w-[48%] max-md:w-full max-md:ml-0 bg-green-600 rounded-l-3xl max-sm:hidden">
              <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-10">
                {/* <img
                  srcSet=""
                  alt="logo"
                  className="aspect-[3.11] object-contain object-center self-center w-[300px] overflow-hidden  max-md:max-w-full"
                /> */}
                <BookOpenIcon className="w-16 h-16 text-green-600 mx-auto mt-10 bg-white rounded-lg p-3 " />
                <div className="text-white text-center text-lg font-semibold tracking-[3px] uppercase self-center max-w-[200px] mt-5 max-md:text-4xl max-md:mt-10">
                  <span className="font-[475] text-2xl">Join, Read, Code, Succeed!</span>
                  <br />
                  {/* <span className="font-bold text-lg tracking-[5.2px] uppercase">
                    {"Depends"}
                  </span> */}
                </div>
                <div className="text-white text-md font-semibold self-center whitespace-nowrap mt-10 max-md:mt-10">
                  <span className="">Existing User</span>
                  <span className="text-xl ">?</span>
                </div>
                <Link
                  to="/login"
                  className="text-blue-950 text-center text-base font-bold whitespace-nowrap bg-white self-center justify-center items-stretch mt-2 px-12 py-3.5 rounded-[45px] max-md:px-5"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[52%] max-sm:-mt-24 ml-5 max-md:w-full max-md:ml-0 p-3">
              <div className="grow max-md:max-w-full max-md:mt-10">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
                    <div className="flex-col overflow-hidden relative flex min-h-[300px] grow py-12 max-md:max-w-full">
                      <div className="relative text-slate-700 text-xl font-bold leading-10 tracking-normal self-stretch mt-12 max-md:max-w-full max-sm: items-center max-md:mt-10">
                        Create an Account
                      </div>
                      <div className="relative flex flex-col items-stretch self-start max-md:mt-10">
                        <input
                          className="justify-center w-72 text-zinc-400 text-base leading-6 mt-5 max-md:mt-10 border border-[#E5E5E5] pl-2 py-3 rounded-md"
                          onChange={onChange}
                          type="text"
                          placeholder="Name"
                          name="name"
                        />
                        <input
                          className="justify-center w-72 text-zinc-400 text-base leading-6 mt-5 max-md:mt-10 border border-[#E5E5E5] pl-2 py-3 rounded-md"
                          onChange={onChange}
                          type="email"
                          placeholder="Email"
                          name="email"
                        />
                        <input
                          className="justify-center w-72 text-zinc-400 text-base leading-6 mt-5 max-md:mt-10 border border-[#E5E5E5] pl-2 py-3 rounded-md"
                          onChange={onChange}
                          type="text"
                          placeholder="Username"
                          name="username"
                        />
                        <div className="relative">
                          <input
                            className="justify-center text-zinc-400 text-base leading-6 mt-5 max-md:mt-10 border border-[#E5E5E5] pr-40 pl-2 py-3 rounded-md w-72"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password *"
                            name="password"
                            onChange={onChange}
                          />
                          <span
                            className="absolute top-1/2 right-4 transform cursor-pointer"
                            onClick={togglePasswordVisibility}
                          >
                            {/* Password visibility toggle */}
                          </span>
                        </div>

                        {!loading && (
                          <button
                            className="relative w-52 text-white text-sm font-bold tracking-normal bg-green-600 hover:bg-[#3b6a46] duration-300 self-stretch justify-center items-stretch mt-6 px-7 py-4 rounded-xl max-md:max-w-full max-md:px-5"
                            onClick={onSubmit}
                          >
                            Submit & Register
                          </button>
                        )}

                        {/* Conditionally render the loading spinner */}
                        {loading && (
                          <div className="mt-4">
                            Loading...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;



