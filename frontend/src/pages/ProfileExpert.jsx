import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logo from "../assets/ghibli.jpg";

const ProfileExpert = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editAboutMe, setEditAboutMe] = useState("");
  const [editPhoto, setEditPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  const token = localStorage.getItem("token");

  const SERVICES_PER_PAGE = 6;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(services.length / SERVICES_PER_PAGE);

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const paginatedServices = services.slice(
    page * SERVICES_PER_PAGE,
    (page + 1) * SERVICES_PER_PAGE
  );

  useEffect(() => {
    if (!id || !token) {
      setError("Missing authentication. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchExpert = async () => {
      try {
        const res = await axios.get(`https://guidecircle-b.onrender.com/api/expert/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.user;
        setUser(userData);
        setEditName(userData.name || "");
        setEditEmail(userData.email || "");
        setEditAboutMe(userData.aboutMe || "");
        setEditPassword("");
        setPreview(userData.photo);
        setServices(userData.services || []);
      } catch (err) {
        setError("Failed to fetch expert data.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [id, token]);

  const handleDelete = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`https://guidecircle-b.onrender.com/api/service/delete/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices((prev) => prev.filter((s) => s._id !== serviceId));
    } catch {
      alert("Failed to delete service.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditPhoto(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("email", editEmail);
      formData.append("password", editPassword);
      formData.append("aboutMe", editAboutMe);
      if (editPhoto) formData.append("photo", editPhoto);

      const res = await axios.put(
        `https://guidecircle-b.onrender.com/api/expert/update-profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user || res.data.updatedUser);
      setShowEdit(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Profile update failed.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className=" min-h-screen py-10 px-4 sm:px-6 md:px-10">
      {/* Expert Info Card */}
      <div className="bg-white border border-gray-300 rounded-3xl shadow-lg max-w-6xl mx-auto mb-12 p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-10 hover:shadow-2xl transition bg-white">
        <div className="flex-shrink-0">
          <img
            src={user?.photo || logo}
            alt={user?.name}
            className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-2xl border-4 border-[#1B4242] shadow-md"
          />
        </div>
        <div className="flex-1 space-y-3 text-center lg:text-left w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B4242]">{user?.name}</h2>
          <p className="text-[#5F7161] text-base sm:text-lg">{user?.email}</p>
          <p className="text-sm sm:text-base text-[#092635]">
            About Me: {user?.aboutMe || "N/A"}
          </p>
          <p className="text-sm sm:text-base text-[#092635]">
            Total Services:{" "}
            <span className="font-semibold text-[#1B4242]">{services.length}</span>
          </p>
          <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={() => setShowEdit(true)}
              className="bg-[#1B4242] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#092635] transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate(`/createService/${user._id}`)}
              className="bg-[#5C8374] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#3E5C54] transition"
            >
              Add Service
            </button>
          </div>
        </div>
      </div>





      {showEdit && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
    <div className="p-6 max-w-md w-full relative rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition bg-white">
      <button
        onClick={() => setShowEdit(false)}
        className="absolute top-2 right-2 text-red-500 text-xl font-bold"
      >
        ✕
      </button>
      <h3 className="text-xl font-bold text-[#1B4242] mb-4 text-center">Edit Profile</h3>

      {/* Validation Errors */}
      <div className="text-sm text-red-500 space-y-1 mb-3">
        {!editEmail && <p>Email is required.</p>}
        {editEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail) && <p>Invalid email format.</p>}
        {!editPassword && <p>Password is required.</p>}
        {editPassword && editPassword.length < 6 && <p>Password must be at least 6 characters.</p>}
      </div>

      {/* Name */}
      <div className="mb-3">
        <label className="block mb-1 text-sm font-semibold text-gray-600">Name</label>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="block mb-1 text-sm font-semibold text-gray-600">Email</label>
        <input
          type="email"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Password + Eye Toggle */}
      <div className="mb-3 relative">
        <label className="block mb-1 text-sm font-semibold text-gray-600">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={editPassword}
          onChange={(e) => setEditPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded pr-10"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-8 right-3 cursor-pointer text-gray-600"
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>

      {/* About Me */}
      <label className="block mb-1 text-sm font-semibold text-gray-600">About Me</label>
      <textarea
        value={editAboutMe}
        onChange={(e) => setEditAboutMe(e.target.value)}
        placeholder="Brief description..."
        className="w-full p-2 border rounded mb-3"
      />

      {/* Image Upload */}
      <label className="block mb-1 text-sm font-semibold text-gray-600">Photo (Optional)</label>
      <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded mb-3" />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-[#1B4242]"
        />
      )}

      {/* Submit Button */}
      <button
        onClick={() => {
          if (
            editEmail &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail) &&
            editPassword &&
            editPassword.length >= 6
          ) {
            handleUpdateProfile();
          }
        }}
        className="bg-[#1B4242] text-white px-6 py-2 rounded-md w-full hover:bg-[#092635] transition"
      >
        Submit
      </button>
    </div>
  </div>
)}






      {/* Services */}
      <h3 className={`text-2xl font-bold mb-6 text-center ${services.length > 0 ? "text-[#1B4242]" : "text-gray-600"}`}>
        {services.length > 0 ? "Services Offered" : (
          <>
            No services offered.{" "}
            <span
              className="text-[#1B4242] underline cursor-pointer"
              onClick={() => navigate(`/createService/${user._id}`)}
            >
              Add Service
            </span>
          </>
        )}
      </h3>

      <div className={`grid gap-8 ${paginatedServices.length < 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {paginatedServices.map((service) => (
          <div
            key={service._id}
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition-all duration-300"
          >
            <div className="bg-[#E1EFE6] px-6 py-3 text-center shadow-sm">
              <h2 className="text-[#1B4242] text-lg font-semibold tracking-wide">{service.name}</h2>
            </div>
            <div className="px-6 py-4 flex flex-col gap-4">
              <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>

              <div className="flex flex-wrap gap-4 items-start">
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm">
                  <span className="text-lg">📅</span>
                  <div>
                    <p className="font-medium text-[#1B4242]">{service.duration}</p>
                    <p className="text-xs text-gray-500">Video Meeting</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm">
                  <span className="text-xl text-[#1B4242]">₹</span>
                  <p className="font-bold text-[#1B4242]">{service.price}</p>
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-semibold text-[#1B4242]">Rating:</span> {service.rating || 0} ⭐</p>
                <p><span className="font-semibold text-[#1B4242]">Reviews:</span> {service.reviews?.length || 0}</p>
              </div>

              <div className="flex flex-wrap justify-between items-center mt-6 gap-2">
                <button onClick={() => navigate(`/service/${service._id}`)}
                  className="bg-[#C1D3D8] hover:bg-[#A6B7C2] text-[#1B4242] px-4 py-2 rounded-lg text-sm font-semibold transition shadow-lg border border-[#B1C4D0]">
                  See Reviews
                </button>

                <button onClick={() => navigate(`/service/update/${service._id}`)}
                  className="bg-[#1B4242] hover:bg-[#5F7161] text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-lg border border-[#2C6A6C]">
                  ✏️ Edit
                </button>

                <button onClick={() => handleDelete(service._id)}
                  className="bg-[#D64B4B] hover:bg-[#D23A3A] text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-lg border border-[#9E3535]">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length > SERVICES_PER_PAGE && (
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${page === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#1B4242] text-white hover:bg-[#092635] shadow-md"
              }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages - 1}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${page === totalPages - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#1B4242] text-white hover:bg-[#092635] shadow-md"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileExpert;
