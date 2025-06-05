import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signUp } from "../operations/authApi";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setOtp(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const role = "Visitor";

    if (signupData) {
      const { name, email, username, password } = signupData;
      dispatch(signUp(name, username, email, password, role, otp, navigate));
    } else {
      toast.error("Signup data missing. Please sign up again.");
      navigate("/signup");
    }
  };

  useEffect(() => {
    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          toast.error("OTP expired. Please sign up again.");
          navigate("/signup");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [navigate]);

  // Format time left in mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Verify Your OTP
        </h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={onChange}
            required
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-[#4f8f5e] text-white py-3 rounded-md hover:bg-green-600 transition"
          >
            Verify & Sign Up
          </button>
        </form>
        <div className="text-center mt-4 text-red-500">
          OTP expires in: {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
