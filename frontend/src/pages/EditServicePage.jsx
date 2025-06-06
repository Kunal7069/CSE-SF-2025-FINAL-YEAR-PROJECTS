import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditServicePage = () => {
  const { id } = useParams(); // service ID
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
    if (!id) {
      toast.error("Invalid service ID.");
      navigate("/some-error-page"); // Optional redirection
      return;
    }

    if (!token) {
      toast.error("Please sign in to fetch service data.");
      navigate(`/signin/expert`);
      return;
    }

    const fetchService = async () => {
      try {
        const res = await axios.get(`https://guidecircle-b.onrender.com/api/service/${id}`);
        const service = res.data; // Assuming response is the service object directly

        setFormData({
          name: service.name || "",
          description: service.description || "",
          price: service.price || "",
          duration: service.duration || "",
          availableTimes: service.availableTimes?.length ? service.availableTimes : [""],
        });
      } catch (err) {
        console.error("Failed to fetch service details", err);
        toast.error("Unable to load service data.");
      }
    };

    fetchService();
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

      const response = await axios.put(
        `https://guidecircle-b.onrender.com/api/service/update/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.service) {
        alert("Service updated successfully!");
        toast.success("Service updated successfully!");
        navigate(`/profileExport/${response.data.service.expert}`);
      }
    } catch (err) {
      console.error("Error updating service:", err);
      toast.error("Failed to update service.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4 sm:px-6 md:px-12 py-8">
      <div className="bg-white p-6 sm:p-8   w-full max-w-4xl rounded-2xl  shadow-lg border border-gray-300 hover:shadow-2xl transition bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1B4242] mb-8 tracking-wide uppercase">
          Edit Service
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
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
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
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block mb-1 font-semibold text-[#1B4242]">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the service in detail"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm h-24"
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
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
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
                      className="p-3 border border-gray-300 rounded-lg shadow-sm w-36"
                    />
                    <button
                      type="button"
                      onClick={() => removeTimeField(index)}
                      className="px-3 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-200"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addTimeField}
                className="bg-[#1B4242] text-white px-4 py-2 rounded-lg hover:bg-[#5F7161] text-sm"
              >
                + Add Time Slot
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1B4242] text-white py-3 mt-6 rounded-lg shadow-md hover:bg-[#5F7161] text-lg font-semibold tracking-wide"
          >
            Update Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditServicePage;
