import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import defaultPhoto from "../assets/ghibli.jpg";
import { UserRound, Star, StarHalf, StarOff } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cur from "../assets/cur.jpg";
import x from "../assets/x.jpg";
import z from "../assets/z.jpg";
import p from "../assets/p.jpg";
import y from "../assets/xx.jpg";

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

const Hero = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const servicesPerPage = 15;
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const carouselImages = [y, z, x, p, cur];
  const carouselImages2 = [cur, x, z, y, p];
  const quotes = [
    "Unlock your potential with expert guidance.",
    "Meet the masters, then become one.",
    "Know the greats. Grow greater.",
    "Follow the footsteps of the greats — then make your own path.",
    "Learn from the legends, then write your own story.",
    "Every skill begins with the right mentor.",
    "Grow. Learn. Achieve.",
  ];

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const url = searchQuery
          ? `https://guidecircle-b.onrender.com/api/service/all?search=${encodeURIComponent(searchQuery)}`
          : "https://guidecircle-b.onrender.com/api/service/all";
        const res = await axios.get(url);
        setServices(res.data || []);
        setCurrentPage(1);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, [searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const totalPages = Math.ceil(services.length / servicesPerPage);
  const visibleServices = services.slice((currentPage - 1) * servicesPerPage, currentPage * servicesPerPage);

  return (
    <section className="min-h-screen px-4 sm:px-6 py-10 text-[#5F7161]">
      <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg relative mb-12">
        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
          style={{ backgroundImage: `url(${cur})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl text-white font-bold text-center drop-shadow-lg animate-pulse px-4">
            {quotes[carouselIndex]}
          </h2>
        </div>
      </div>

      <div className="text-center mb-10 px-2">
        <h3 className="text-3xl md:text-5xl font-bold text-[#1B4242] tracking-wide relative inline-block">
          Discover Timeless Expertise
          <span className="block mt-2 w-24 h-1 bg-gradient-to-r from-[#1B4242] to-[#A6C3B3] mx-auto rounded-full"></span>
        </h3>
        <p className="mt-4 text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock insights from seasoned professionals across fields — curated, rated, and ready to guide you forward.
        </p>
      </div>

      {searchQuery && (
        <p className="text-center text-sm text-gray-500 mb-6">
          Showing results for: <span className="font-medium text-[#1B4242]">{searchQuery}</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleServices.map((service) => (
          <div
            key={service._id}
            className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition bg-white"
          >
            <div className="md:w-1/3 w-full bg-[#f3f4f6] p-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
              <img
                src={service.expert?.photo || defaultPhoto}
                alt="Expert"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#1B4242] mb-3 shadow-md"
              />
              <h3 className="text-lg font-semibold text-[#1B4242] text-center">{service.expert?.name || "Unknown"}</h3>
              <p className="text-xs text-center text-gray-600 mt-1 px-2">
                {service.expert?.aboutMe || "No bio provided."}
              </p>
              <button
                onClick={() => {
                  if (user && user._id === service.expert._id) {
                    navigate(`/profileExport/${user._id}`);
                  } else {
                    navigate(`/expert-details/${service.expert._id}`);
                  }
                }}
                className="mt-3 px-2 py-2 text-sm flex items-center gap-2 bg-[#5C8374] text-white rounded-md shadow-md hover:bg-[#3E5C54] transition"
              >
                <UserRound size={16} />
                See Profile
              </button>
            </div>

            <div className="md:w-2/3 w-full bg-[#F8FBF8] flex flex-col justify-between">
              <div className="w-full bg-[#E1EFE6] px-4 py-3 text-center shadow-sm">
                <h2 className="text-[#1B4242] text-base md:text-lg font-semibold tracking-wide drop-shadow-sm">
                  {service.name}
                </h2>
              </div>

              <div className="px-4 py-4 flex flex-col justify-between h-full">
                <p className="text-gray-700 text-sm mb-4 leading-relaxed break-words">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-4 items-start mb-4">
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

                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <button
                    onClick={() => navigate(`/service/${service._id}`)}
                    className="bg-[#C1D3D8] hover:bg-[#A6B7C2] text-[#1B4242]  px-3 py-2 rounded-md text-xs font-medium transition shadow-sm"
                  >
                    📝 See Reviews
                  </button>
                  <button
                    onClick={() => navigate(`/book/${service._id}`)}
                    className="px-6 py-2 text-sm bg-[#1B4242] text-white rounded-md shadow-lg hover:scale-105 hover:bg-[#092635] transition-all font-semibold"
                  >
                    🚀 Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-6 py-2 rounded-md transition ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#1B4242] text-white hover:bg-[#092635]"}`}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-6 py-2 rounded-md transition ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#1B4242] text-white hover:bg-[#092635]"}`}
        >
          Next
        </button>
      </div>

      <div className="mt-20 mb-16 flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-[500px] h-[280px] relative">
            {carouselImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`carousel-${idx}`}
                className={`absolute w-full h-full object-cover rounded-xl shadow-md transition-transform duration-700 ease-in-out ${idx === carouselIndex ? "scale-100 z-20 opacity-100" : "scale-95 opacity-0 z-0"}`}
                style={{ transform: `rotateY(${(idx - carouselIndex) * 60}deg)` }}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-bold text-[#1B4242] mb-4">Empower Your Journey</h3>
          <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Every expert was once a beginner. Our platform connects you with mentors who once stood where you are.
            Learn, grow, and reach your full potential with personalized guidance and expert insight.
          </p>
        </div>
      </div>

      <div className="mt-10 mb-20 flex flex-col-reverse md:flex-row items-center justify-center gap-12">
        <div className="w-full md:w-1/2 px-4 text-center md:text-lg">
          <h3 className="text-2xl md:text-4xl font-bold text-[#1B4242] mb-4 ">For the Curious Minds</h3>
          <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-md mx-auto md:ml-auto">
            Curiosity is the spark behind every discovery. Explore tailored services, dive deep into new skills, and
            fuel your ambitions — all in one place, designed for learners like you.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-[500px] h-[280px] relative">
            {carouselImages2.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`carousel-${idx}`}
                className={`absolute w-full h-full object-cover rounded-xl shadow-md transition-transform duration-700 ease-in-out ${idx === carouselIndex ? "scale-100 z-20 opacity-100" : "scale-95 opacity-0 z-0"}`}
                style={{ transform: `rotateY(${(idx - carouselIndex) * 60}deg)` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;