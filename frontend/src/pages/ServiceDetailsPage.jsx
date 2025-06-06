import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import defaultPhoto from "../assets/ghibli.jpg";
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

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchService = async () => {
    try {
      const res = await axios.get(`https://guidecircle-b.onrender.com/api/service/${id}`);
      setService(res.data);
      const myReview = res.data.reviews.find((r) => r.expert?._id === user._id);
      setUserReview(myReview || null);
    } catch (err) {
      console.error("Failed to fetch service details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  const handleReviewSubmit = async () => {
    try {
      await axios.post(
        "https://guidecircle-b.onrender.com/api/review/add",
        {
          serviceId: id,
          rating: reviewRating,
          comment: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviewText("");
      setReviewRating(5);
      fetchService();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding review.");
    }
  };

  const handleDeleteReview = async () => {
    try {
      await axios.delete(`https://guidecircle-b.onrender.com/api/review/delete/${userReview._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserReview(null);
      fetchService();
    } catch (err) {
      alert("Error deleting review.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!service) return <div className="text-center mt-10">Service not found.</div>;

  return (
    <div className="min-h-screen  p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left: Service Info */}
        <div className=" p-6 sm:p-8 flex flex-col gap-6 rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition bg-white">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#1B4242]">{service.name}</h2>
          <p className="text-[#5F7161] text-base sm:text-lg leading-relaxed">
            {service.description}
          </p>

          <div className="space-y-2 text-[#092635]">
            <div className="flex flex-wrap gap-4 items-start mb-4">
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm w-full sm:w-auto">
                <span className="text-lg">📅</span>
                <div>
                  <p className="font-medium text-[#1B4242]">{service.duration} Minute</p>
                  <p className="text-xs text-gray-500">Video Meeting</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm w-full sm:w-auto">
                <span className="text-xl text-[#1B4242]">₹</span>
                <p className="font-bold text-[#1B4242]">{service.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <strong>Rating:</strong>
              {renderStars(service.rating)}
              <span className="text-[#1B4242] font-medium text-sm">
                ({service.reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="bg-[#E8F0E8] p-4 rounded-xl flex items-center gap-4 flex-wrap">
            <img
              src={service.expert?.photo || defaultPhoto}
              className="w-16 h-16 rounded-full border-2 border-[#1B4242]"
              alt="Expert"
            />
            <div>
              <p className="text-[#1B4242] font-semibold">
                Expert: {service.expert?.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/book/${service._id}`)}
            className="mt-6 w-full w-fit px-6 py-3 bg-[#1B4242] text-white rounded-xl shadow-lg hover:scale-105 hover:bg-[#092635] transition-all font-semibold"
          >
            Book Now
          </button>
        </div>

        {/* Right: Reviews */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1B4242] text-center">Reviews</h3>
          {service.reviews?.length > 0 ? (
            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 ">
              {service.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-4 rounded-xl shadow border relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:shadow-2xl transition bg-white"
                >
                  <div className="flex-1 pr-0 sm:pr-4 ">
                    <div className="flex items-center gap-4 mb-2">
                      <img
                        src={review.expert?.photo || defaultPhoto}
                        className="w-10 h-10 rounded-full border border-[#1B4242]"
                        alt={review.expert?.name}
                      />
                      <div>
                        <p className="font-semibold text-[#1B4242]">{review.expert?.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-2">{renderStars(review.rating)}</div>
                    <p className="text-gray-800">{review.comment}</p>
                  </div>

                  {review.expert?._id === user._id && (
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md text-sm shadow hover:scale-105 hover:brightness-110 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No reviews yet.</p>
          )}

          {!userReview && user.type === "expert" && (
            <div className="mt-6 border-t pt-4">
              <h4 className="text-lg font-semibold text-[#1B4242] mb-2">Leave a Review</h4>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full border p-2 rounded-lg mb-2"
              />

              <div className="flex items-center gap-2 mb-4">
                <label className="text-sm text-gray-600">Rating:</label>
                <div className="flex gap-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`text-xl ${star <= reviewRating ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleReviewSubmit}
                className="bg-[#1B4242] text-white px-4 py-2 rounded-md hover:bg-[#092635] transition"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
