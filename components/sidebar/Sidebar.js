import Image from "next/image";
import React from "react";
import { FaTachometerAlt, FaDatabase } from "react-icons/fa"; // Import Font Awesome icons
import { useRouter } from "next/router"; // Import useRouter
import Link from "next/link";
import Swal from 'sweetalert2'; // Import SweetAlert2
import LogoDisdik from "../../public/assets/logo-apps/logo-disdik-special-request-for-web.png";
import { LogoutIcon } from '@heroicons/react/outline';

const Sidebar = () => {
  const router = useRouter(); // Get the current route

  const handleLogout = () => {
    Swal.fire({
      title: 'Konfirmasi Logout',
      text: 'Apakah Anda yakin ingin keluar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Batal',
      customClass: {
        container: 'swal2-container',
        title: 'text-lg font-semibold text-gray-800', // Tailwind CSS for title
        text: 'text-base text-gray-700', // Tailwind CSS for text
        confirmButton: 'bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-2', // Tailwind CSS for confirm button
        cancelButton: 'bg-gray-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75' // Tailwind CSS for cancel button
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        router.push("/admin/login");
      }
    });
  };

  return (
    <div className="flex h-screen">
      {/* Navigation */}
      <nav className="w-full h-16 bg-gradient-to-r from-[#1976D2] to-[#0F508F] fixed top-0 left-0 z-50">
        <div className="container mx-auto px-8 flex items-center h-full">
          <Image src={LogoDisdik} width={100} height={100} alt="Logo Disdik" />
        </div>
      </nav>

      {/* Sidebar (Desktop) */}
      <aside className="w-64 bg-gradient-to-b from-[#1976D2] to-[#0F508F] text-white fixed top-16 left-0 h-full">
        <nav className="px-4 py-6">
          <div className="mb-10">
            <h1 className="text-2xl font-bold mb-4 text-center">LAYANAN PDO</h1>
          </div>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin/dashboard"
                className={`flex items-center px-4 py-2 rounded-md ${
                  router.pathname === "/admin/dashboard"
                    ? "bg-blue-500"
                    : "hover:bg-blue-500"
                }`}
              >
                <FaTachometerAlt className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/view-requests"
                className={`flex items-center px-4 py-2 rounded-md ${
                  router.pathname === "/admin/view-requests"
                    ? "bg-blue-500"
                    : "hover:bg-blue-500"
                }`}
              >
                <FaDatabase className="mr-3" />
                Data
              </Link>
            </li>
            {/* Uncomment and adjust if needed */}
            {/* <li>
              <Link
                href="/admin/UpdateRequest"
                className={`flex items-center px-4 py-2 rounded-md ${
                  router.pathname === "/admin/UpdateRequest"
                    ? "bg-blue-500"
                    : "hover:bg-blue-500"
                }`}
              >
                <FaUpload className="mr-3" />
                Update Request
              </Link>
            </li> */}
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className={`flex items-center px-4 py-2 w-full rounded-md ${
                  router.pathname === "/" ? "bg-blue-500" : "hover:bg-blue-500"
                }`}
              >
                <LogoutIcon className="mr-3 h-5 w-5" />
                Logout
              </button>
            </li>
            {/* Add more sidebar links here */}
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {/* Uncomment and adjust if needed */}
      {/* <div className="md:hidden block bg-gradient-to-r from-[#0071BC] to-[#002F6C] text-white fixed bottom-0 left-0 w-full h-16 z-50">
        <nav className="flex items-center justify-around h-full">
          <ul className="flex items-center justify-around w-full">
            <li className={`flex flex-col items-center`}>
              <Link
                href="/admin/dashboard"
                className={`flex flex-col items-center p-2 ${
                  router.pathname === '/admin/dashboard' ? 'bg-blue-500' : 'hover:bg-blue-600'
                } rounded-md`}
              >
                <FaTachometerAlt className="text-2xl mb-1" />
                <span className="text-xs">Dashboard</span>
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <Link
                href="/admin/view-requests"
                className={`flex flex-col items-center p-2 ${
                  router.pathname === '/admin/view-requests' ? 'bg-blue-500' : 'hover:bg-blue-600'
                } rounded-md`}
              >
                <FaEye className="text-2xl mb-1" />
                <span className="text-xs">View</span>
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <Link
                href="/profile"
                className={`flex flex-col items-center p-2 ${
                  router.pathname === '/profile' ? 'bg-blue-500' : 'hover:bg-blue-600'
                } rounded-md`}
              >
                <FaUser className="text-2xl mb-1" />
                <span className="text-xs">Profile</span>
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <Link
                href="/settings"
                className={`flex flex-col items-center p-2 ${
                  router.pathname === '/settings' ? 'bg-blue-500' : 'hover:bg-blue-600'
                } rounded-md`}
              >
                <FaCog className="text-2xl mb-1" />
                <span className="text-xs">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div> */}
    </div>
  );
};

export default Sidebar;
