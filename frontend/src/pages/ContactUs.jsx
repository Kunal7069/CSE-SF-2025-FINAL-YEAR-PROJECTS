import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const logo =
    "https://ik.imagekit.io/mcxbnqee6/ChatGPT%20Image%20Apr%2017,%202025,%2002_49_25%20PM.png?updatedAt=1744881620804";

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await axios.post("https://guidecircle-b.onrender.com/api/contact", formData);
      if (res.data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const renderStatusMessage = () => {
    switch (status) {
      case "sending":
        return <p className="mt-4 text-gray-600 text-sm sm:text-base">⏳ Sending...</p>;
      case "success":
        return <p className="mt-4 text-green-600 text-sm sm:text-base">✅ Message sent successfully!</p>;
      case "error":
        return <p className="mt-4 text-red-600 text-sm sm:text-base">❌ Failed to send message. Please try again.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4 sm:px-6 md:px-12 py-8">
      <div className="bg-white shadow-lg  p-6 sm:p-8 w-full max-w-xl text-center rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition bg-white">
        {/* Logo */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <img src={logo} alt="GuideCircle Logo" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1B4242]">Contact Us</h1>
        <p className="text-base sm:text-lg text-[#5F7161] mt-2">
          Have questions? Need support? We’re here to help!
        </p>

        {/* Status messages */}
        {renderStatusMessage()}

        {/* Contact Info */}
        <div className="mt-6 space-y-3 text-[#092635] text-sm sm:text-base text-left sm:text-center">
          <p>
            Email: <span className="font-semibold text-[#1B4242]">GuidCircle.24x7@gmail.com</span>
          </p>
          <p>
            Phone: <span className="font-semibold text-[#1B4242]">+91 XXXXXX8583</span>
          </p>
          <p>
            Address:{" "}
            <span className="font-semibold text-[#1B4242]">
              GuideCircle Pvt Ltd, Jankipuram Sector-F, Lucknow 226021
            </span>
          </p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4 w-full" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C8374] text-sm sm:text-base"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C8374] text-sm sm:text-base"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C8374] text-sm sm:text-base"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#6D8B74] disabled:opacity-50 text-white px-6 py-2 rounded-lg hover:bg-[#5F7161] transition text-sm sm:text-base"
            disabled={status === "sending"}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
