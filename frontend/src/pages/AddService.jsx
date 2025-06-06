import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    availableTimes: [""],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id || !token) {
      toast.error("Missing expert ID or token.");
      navigate(`/signin/expert`);
    }
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...formData.availableTimes];
    updatedTimes[index] = value;
    setFormData({ ...formData, availableTimes: updatedTimes });
  };

  const addTimeField = () => {
    setFormData({ ...formData, availableTimes: [...formData.availableTimes, ""] });
  };

  const removeTimeField = (index) => {
    const updatedTimes = formData.availableTimes.filter((_, i) => i !== index);
    setFormData({ ...formData, availableTimes: updatedTimes });
  };

  const validateForm = () => {
    const { name, description, price, duration, availableTimes } = formData;

    if (!name || !description || !price || !duration) {
      toast.error("All required fields must be filled.");
      return false;
    }

    const priceValue = Number(price);
    const durationValue = Number(duration);

    if (isNaN(priceValue) || priceValue <= 0 || priceValue >= 100000) {
      toast.error("Price must be a number between 1 and 100000.");
      return false;
    }

    if (isNaN(durationValue) || durationValue <= 0 || durationValue >= 300) {
      toast.error("Duration must be a number less than 300 minutes.");
      return false;
    }

    for (let time of availableTimes) {
      if (!time || time === "__:__" || time.trim() === "") {
        toast.error("Please remove or update invalid time slots.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { name, description, price, duration, availableTimes } = formData;
      const payload = {
        name,
        description,
        price,
        duration,
        timeSlots: availableTimes,
      };
      const response = await axios.post("https://guidecircle-b.onrender.com/api/service/add", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.service) {
        toast.success("Service added successfully!");
        navigate(`/profileExport/${id}`);
      }
    } catch (err) {
      console.error("Error adding service:", err);
      toast.error("Failed to add service.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10">
      <div className=" p-6 sm:p-8 md:p-10  w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1B4242] mb-8 uppercase tracking-wide">
          Add a New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-semibold text-[#1B4242]">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Service Name"
                className="w-full p-2 border border-gray-300 rounded shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-[#1B4242]">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full p-2 border border-gray-300 rounded shadow-sm"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-1 font-semibold text-[#1B4242]">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the service in detail"
                className="w-full p-2 border border-gray-300 rounded shadow-sm h-24"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-[#1B4242]">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                placeholder="In minutes"
                className="w-full p-2 border border-gray-300 rounded shadow-sm"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 font-semibold text-[#1B4242]">
                Available Time Slots{" "}
                
              </label>

              <div className="flex flex-wrap gap-4 mb-3">
                {formData.availableTimes.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      className="p-2 border border-gray-300 rounded shadow-sm w-32"
                    />
                    <button
                      type="button"
                      onClick={() => removeTimeField(index)}
                      className="px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded shadow-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addTimeField}
                className="bg-[#1B4242] text-white px-3 py-1 rounded hover:bg-[#5F7161] text-sm mt-1"
              >
                + Add Time Slot
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1B4242] text-white py-3 mt-6 rounded shadow-md hover:bg-[#5F7161] text-lg font-semibold tracking-wide"
          >
            Submit Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
