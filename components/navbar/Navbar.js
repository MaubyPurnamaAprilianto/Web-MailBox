import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoDisdik from "../../public/assets/logo-apps/logo-disdik-special-request-for-web.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        // Change 100 to the scroll position where you want the navbar to become fixed
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={` bg-gradient-to-r from-[#002F6C] to-[#0071BC] px-7 py-2 w-full z-50 ${isFixed ? 'fixed top-0' : ''}`}>
      <div className="container mx-auto flex items-center justify-between h-14">
        {/* Logo Section */}
        <a href="/" className="flex items-center">
          <Image src={LogoDisdik} alt="Logo Disdik" width={80} height={80} />
        </a>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <ul className="flex space-x-1">
            <li>
              <a
                href="/"
                className="text-white hover:bg-blue-900 py-2 px-4 rounded transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="Tracking/track"
                className="text-white hover:bg-blue-900 py-2 px-4 rounded transition-colors duration-300"
              >
                Tracking
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden ${
          isOpen ? "block" : "hidden"
        } absolute top-[70px] left-0 w-full h-screen bg-gradient-to-r from-[#002F6C] to-[#0071BC] border-t border-white`}
      >
        <ul className="flex flex-col space-y-2 px-4 py-2">
          <li>
            <a
              href="/"
              className="text-white  py-2 px-4 rounded transition-colors duration-300 block text-left"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="Tracking/track"
              className="text-white  py-2 px-4 rounded transition-colors duration-300 block text-left"
            >
              Tracking
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
