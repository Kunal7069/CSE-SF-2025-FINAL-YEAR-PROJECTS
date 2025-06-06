import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import defaultPhoto from "../assets/ghibli.jpg";
import { useNavigate } from "react-router-dom";
import { Star, StarHalf, StarOff } from "lucide-react";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={"full" + i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
      ))}
      {halfStar && <StarHalf className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={"off" + i} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  );
};

const ExportDetails = () => {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const SERVICES_PER_PAGE = 4;

  useEffect(() => {
    const fetchExpertDetails = async () => {
      try {
        const res = await axios.get(`https://guidecircle-b.onrender.com/api/expert/${id}`);
        setExpert(res.data.user);
      } catch (err) {
        setError("Failed to load expert details.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpertDetails();
  }, [id]);

  const handleNext = () => {
    const totalPages = Math.ceil((expert?.services?.length || 0) / SERVICES_PER_PAGE);
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const paginatedServices = expert?.services?.slice(
    page * SERVICES_PER_PAGE,
    (page + 1) * SERVICES_PER_PAGE
  );

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen  p-6">
      {/* Expert Info Section */}
      <div className="bg-white border border-gray-300 rounded-3xl shadow-lg max-w-5xl mx-auto mb-12 p-8 flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl transition bg-white">
        {/* Photo Section */}
        <div className="flex-shrink-0">
          <img
            src={expert?.photo || defaultPhoto}
            alt={expert?.name}
            className="w-44 h-44 md:w-52 md:h-52 object-cover rounded-2xl border-4 border-[#1B4242] shadow-md"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-[#1B4242]">{expert?.name}</h2>
          <p className="text-[#5F7161] text-lg leading-relaxed">
            {expert?.aboutMe || "No bio available for this expert."}
          </p>
          <p className="text-base text-[#092635]">
            Services Offered:{" "}
            <span className="font-semibold text-[#1B4242]">
              {expert?.services?.length || 0}
            </span>
          </p>
        </div>
      </div>

      {/* Services Header */}
      <h3 className="text-2xl font-bold text-[#1B4242] mb-6 text-center">
        Services by {expert?.name}
      </h3>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {paginatedServices?.map((service) => (
          <div
            key={service._id}
            className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition-all duration-300 bg-white"
          >
            {/* Expert Info */}
            <div className="md:w-1/3 bg-[#f3f4f6] p-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200  ">
              <img
                src={expert?.photo || defaultPhoto}
                alt="Expert"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#1B4242] mb-3 shadow-md"
              />
              <h3 className="text-lg font-semibold text-[#1B4242]">
                {expert?.name || "Unknown"}
              </h3>
              <p className="text-xs text-center text-gray-600 mt-1 px-2">
                {expert?.aboutMe || "No bio provided."}
              </p>
            </div>

            {/* Service Info */}
            <div className="md:w-2/3 bg-[#F8FBF8] flex flex-col">
              <div className="w-full bg-[#E1EFE6] px-6 py-3 text-center shadow-sm">
                <h2 className="text-[#1B4242] text-lg font-semibold tracking-wide drop-shadow-sm">
                  {service.name}
                </h2>
              </div>

              <div className="px-6 py-4 flex flex-col gap-4">
                <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>

                <div className="flex flex-wrap gap-4 items-start">
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm">
                    <span className="text-lg">📅</span>
                    <div>
                      <p className="font-medium text-[#1B4242]">{service.duration} Minute</p>
                      <p className="text-xs text-gray-500">Video Meeting</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm">
                    <span className="text-xl text-[#1B4242]">₹</span>
                    <p className="font-bold text-[#1B4242]">{service.price}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#1B4242]">Rating:</span>
                    <span className="text-[#1B4242] font-medium">
                      {service.rating ? service.rating.toFixed(1) : "0.0"}
                    </span>
                    {renderStars(service.rating)}
                  </div>
                  <p>
                    <span className="font-semibold text-[#1B4242]">Reviews:</span> {service.reviews?.length || 0}
                  </p>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/service/${service._id}`)}
                    className=" bg-[#C1D3D8] hover:bg-[#A6B7C2] text-[#1B4242] px-3 py-1 rounded-lg text-sm font-semibold transition shadow-lg border border-[#B1C4D0]"
                  >
                    See Reviews
                  </button>

                  <button
                    onClick={() => navigate(`/book/${service._id}`)}
                    className="px-6 py-2 text-sm bg-[#1B4242] text-white rounded-md shadow-lg hover:scale-105 hover:bg-[#092635] transition-all font-semibold"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-10 text-center flex justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className={`px-6 py-2 rounded-md transition ${page === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#1B4242] text-white hover:bg-[#092635]"}` 
          }
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={(page + 1) * SERVICES_PER_PAGE >= (expert?.services?.length || 0)}
          className={`px-6 py-2 rounded-md transition ${(page + 1) * SERVICES_PER_PAGE >= (expert?.services?.length || 0)
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#1B4242] text-white hover:bg-[#092635]"}` 
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExportDetails;
