import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 sm:px-6 lg:px-8   ">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-3xl text-center rounded-2xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition bg-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1B4242]">
          About GuideCircle
        </h1>
        <p className="text-base sm:text-lg text-[#5F7161] mt-4 leading-relaxed">
          GuideCircle is a free, open-source platform where anyone can register as an expert and offer help,
          or seek guidance from others at minimal prices. It's a space where people share knowledge in various
          fields like education, IT, AI, stock markets, design, and all types of verbal services—such as career
          consultation and mentorship.
        </p>

        {/* Mission Section */}
        <div className="mt-8 text-[#092635] text-left sm:text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#1B4242]">Our Mission</h2>
          <p className="mt-2 leading-relaxed">
            Our mission is to empower individuals by providing a platform where knowledge is shared freely,
            and everyone can connect with experts in real-time. We aim to create a supportive ecosystem for
            learners and professionals to grow together through meaningful conversations and affordable expert sessions.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mt-8 text-[#092635] text-left sm:text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#1B4242]">Our Vision</h2>
          <p className="mt-2 leading-relaxed">
            Our vision is to scale globally and build a community where people are passionate about
            connecting with others in the real world. We believe that expert knowledge should be
            accessible to everyone, and our platform acts as the bridge to make that possible across
            all industries and interests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
