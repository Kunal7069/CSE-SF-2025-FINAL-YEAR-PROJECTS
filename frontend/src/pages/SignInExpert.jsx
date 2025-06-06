import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const SignInExpert = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://guidecircle-b.onrender.com/api/expert/signin", formData);
      localStorage.setItem("user", JSON.stringify({ ...res.data.user, type: "expert" }));
      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("userChanged"));
      toast.success("Signed in successfully!");
      navigate(`/profileExport/${res.data.user._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4 ">
      <div className="bg-white p-6 sm:p-8  w-full max-w-sm sm:max-w-md text-center rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1B4242] mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-md w-full text-sm"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md pr-10 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#1B4242]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#1B4242] text-white py-3 rounded-md hover:bg-[#092635] transition-all font-semibold"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs sm:text-sm text-[#5F7161] mt-4">
          Don’t have an account?{" "}
          <Link to="/signup/expert" className="text-[#1B4242] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInExpert;
