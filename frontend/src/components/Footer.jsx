import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const linkdn =
    "https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGKMGxS4GKQBQAAAZY_BSVAzZf3nREqG1mkL399xb0Nhk_4kbc3ef0mtcEDXf_1G85IqhS-SUR-AGJofNmmLecS2hc1Qi-DUKbDDqiyL8zYgcK1TIdEf-cWxK1m-vbnIthYb80=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fsurajchauhan1729";

  const logo = "https://ik.imagekit.io/mcxbnqee6/ChatGPT%20Image%20Apr%2017,%202025,%2002_49_25%20PM.png?updatedAt=1744881620804";

  return (
    <footer className="bg-[#1B4242] text-[#9EC8B9] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={logo}
              alt="GuideCircle Logo"
              className="w-12 h-12 rounded-xl object-cover border-2 border-[#9EC8B9]"
            />
            <h2 className="text-2xl font-bold">GuideCircle</h2>
          </div>
          <p className="text-sm mb-4">
            Connecting experts & learners globally through guided support and shared knowledge.
          </p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} GuideCircle. All rights reserved.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-[#EFEAD8] transition">About Us</Link></li>
            <li><Link to="#" className="hover:text-[#EFEAD8] transition">Our Services</Link></li>
            <li><Link to="#" className="hover:text-[#EFEAD8] transition">Find Experts</Link></li>
            <li><Link to="#" className="hover:text-[#EFEAD8] transition">Blog</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-[#EFEAD8] transition">Contact</Link></li>
            <li><Link to="#" className="hover:text-[#EFEAD8] transition">FAQ</Link></li>
            <li><Link to="/policy" className="hover:text-[#EFEAD8] transition">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-[#EFEAD8] transition">Terms of Use</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Community</h3>
          <p className="text-sm mb-3">Join our online community and stay connected!</p>
          <div className="flex flex-wrap gap-4">
            <a href={linkdn} className="hover:text-[#EFEAD8] transition"><FaFacebook size={20} /></a>
            <a href={linkdn} className="hover:text-[#EFEAD8] transition"><FaTwitter size={20} /></a>
            <a href={linkdn} className="hover:text-[#EFEAD8] transition"><FaLinkedin size={20} /></a>
            <a href={linkdn} className="hover:text-[#EFEAD8] transition"><FaInstagram size={20} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
