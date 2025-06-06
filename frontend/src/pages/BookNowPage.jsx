import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, StarHalf, StarOff, ChevronLeft, ChevronRight } from "lucide-react";
import defaultPhoto from "../assets/ghibli.jpg";

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

const BookNowPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");
    // const [selectedTimes, setSelectedTimes] = useState([]);
    const [customTime, setCustomTime] = useState("");
    const [userMessage, setUserMessage] = useState("");


    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await axios.get(`https://guidecircle-b.onrender.com/api/service/${id}`);
                setService(res.data);
            } catch (err) {
                console.error("Failed to fetch service details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please sign in first.");
            navigate("/signin/expert");
            return;
        }

        if (!selectedDate) {
            alert("Please select a date.");
            return;
        }

        if (!customTime) {
            alert("Please select a custom time.");
            return;
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const expertIdFromToken = decodedToken?.id;

        if (expertIdFromToken === service.expert._id) {
            alert("You cannot book your own service.");
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                serviceId: id,
                date: selectedDate,
                times: [customTime],
                message: userMessage,
            };

            await axios.post("https://guidecircle-b.onrender.com/api/booking/confirm", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Booking confirmed successfully!");
            navigate(`/service/${id}?booking=success`);
        } catch (err) {
            console.error("Booking error:", {
                status: err.response?.status,
                data: err.response?.data,
                headers: err.response?.headers
            });
            alert(`Booking failed: ${err.response?.data?.message || err.message}`);
        } finally {
            setSubmitting(false);
        }
    };


    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!service) return <div className="text-center mt-10">Service not found.</div>;

    return (
        <div className="min-h-screen  p-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start ">
                {/* Service & Expert Info */}
                <div className=" p-6 md:p-10 flex flex-col md:flex-row gap-8 rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition bg-white">
                    <div className="flex flex-col items-center text-center md:w-1/3 border-r md:pr-6 border-[#A9BDAE]">
                        <img
                            src={service.expert?.photo || defaultPhoto}
                            alt="Expert"
                            className="w-28 h-28 rounded-full border-4 border-[#1B4242] shadow-md mb-4"
                        />
                        <p className="text-xl font-semibold text-[#1B4242]">{service.expert?.name}</p>
                        <p className="text-sm text-gray-600 mt-2 px-2 italic">
                            {service.expert?.aboutMe || "No bio provided."}
                        </p>
                    </div>
                    <div className="md:w-2/3 text-[#1B4242] space-y-3">
                        <h2 className="text-3xl font-bold border-b pb-2 border-[#A9BDAE]">{service.name}</h2>
                        <p className="text-base leading-relaxed text-justify">{service.description}</p>
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
                        <div className="flex items-center gap-2 mt-4">
                            {renderStars(service.rating)}
                            <span className="text-sm text-[#092635] font-medium">
                                ({service.reviews?.length || 0} reviews)
                            </span>
                        </div>
                        <button
                            onClick={() => navigate(`/service/${service._id}`)}
                            className="mt-4  w-fit bg-[#C1D3D8] hover:bg-[#A6B7C2] text-[#1B4242] px-4 py-2 rounded-lg text-sm font-semibold transition shadow-lg border border-[#B1C4D0]"
                        >
                            See Reviews
                        </button>
                    </div>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition bg-white p-8 flex flex-col gap-6">
                    <h3 className="text-2xl font-bold text-[#1B4242]">Book Now</h3>

                    {/* Select Date */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700">Select Date <span className="text-red-500">*</span></label>
                        <div className="relative w-full">
                            <button
                                type="button"
                                onClick={() =>
                                    document.getElementById("dayScroller").scrollBy({ left: -150, behavior: "smooth" })
                                }
                                className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white border rounded-full shadow p-1 z-10"
                            >
                                <ChevronLeft className="w-5 h-5 text-[#1B4242]" />
                            </button>

                            <div
                                id="dayScroller"
                                className="flex gap-3 px-6 py-2 border rounded-md overflow-hidden pointer-events-none"
                            >
                                {Array.from({ length: 31 }, (_, i) => {
                                    const date = new Date();
                                    date.setDate(date.getDate() + i);
                                    const formatted = date.toISOString().split("T")[0];
                                    const label = date.toLocaleDateString(undefined, {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                    });

                                    return (
                                        <button
                                            key={formatted}
                                            type="button"
                                            onClick={() => setSelectedDate(formatted)}
                                            className={`min-w-max px-4 py-2 rounded-lg border text-sm font-medium ${selectedDate === formatted
                                                ? "bg-[#1B4242] text-white border-[#1B4242]"
                                                : "bg-white text-[#1B4242] border-gray-300"
                                                } pointer-events-auto`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    document.getElementById("dayScroller").scrollBy({ left: 150, behavior: "smooth" })
                                }
                                className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white border rounded-full shadow p-1 z-10"
                            >
                                <ChevronRight className="w-5 h-5 text-[#1B4242]" />
                            </button>
                        </div>
                    </div>

                    {/* Available Time (Only if Present) */}
                    {service.timeSlots?.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">Available Times</label>
                            <div className="flex flex-wrap gap-2">
                                {service.timeSlots.map((raw) => {
                                    const date = new Date(raw);
                                    const formatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    return (
                                        <div

                                            key={raw}
                                            className={`px-4 py-2 text-sm font-medium rounded-lg border  `}
                                        >
                                            {formatted}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Custom Time */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700">
                            Select Custom Time <span className="text-red-500">*</span>
                        </label>

                        <p className="text-xs text-gray-500 mb-1 italic">
                            {service.timeSlots?.length > 0
                                ? "Preferably near available times."
                                : "Pick any time that suits you."}
                        </p>

                        <input
                            type="time"
                            value={customTime}
                            onChange={(e) => setCustomTime(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-xl border border-[#1B4242] text-[#1B4242] font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-[#1B4242] focus:border-[#1B4242] transition-all"
                        />
                    </div>


                    {/* Message */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700">Remarks <span className="text-red-500">*</span></label>
                        <textarea
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            rows={4}
                            required
                            placeholder="Write your message or requirements here..."
                            className="border px-3 py-2 rounded-md"
                        />
                    </div>

                    {/* Submit */}



                    <button
                        type="submit"
                        disabled={submitting}
                        className={`py-3 bg-[#1B4242] text-white rounded-md shadow-lg hover:scale-105 hover:bg-[#092635] transition-all font-semibold
        ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#1B4242] hover:bg-[#092635] text-white"}
    `}
                    >
                        {submitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Confirm Booking"
                        )}
                    </button>




                </form>
            </div>
        </div>
    );
};

export default BookNowPage;
