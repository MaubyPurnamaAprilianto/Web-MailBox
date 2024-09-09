import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import LogoFixColor from "../../public/assets/logo-apps/Logo-fix-full-color.png";
import { FaHome } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/admin/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      alert("Login successful!");
      router.push("/admin/dashboard");
    } catch (error) {
      setError(error.response?.data?.error || "Invalid email or password.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Side */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="flex mb-8 items-center justify-center">
              <Image
                src={LogoFixColor}
                alt="Logo Disdik"
                width={120}
                height={120}
              />
            </div>
            <p className="text-sm text-gray-600">
              Aplikasi Terintegrasi Pendidikan
            </p>
            <p className="text-xs text-gray-400">
              Satu Login Untuk Semua Aplikasi Dinas Pendidikan Provinsi Jawa
              Barat
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-black"
                type="email"
                id="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  type="password"
                  id="password"
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12m-3 3a9 9 0 00-9-9m18 9a9 9 0 01-9 9m-6-9a6 6 0 1112 0m-9-9a6 6 0 019 9"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600"
              type="submit"
            >
              LOGIN
            </button>
          </form>
          <p className="text-center text-gray-500 text-xs mt-4">
            &copy; 2024 | Dinas Pendidikan Jawa Barat
          </p>
        </div>
        {/* Right Side */}
        <div className="hidden md:block md:w-1/2 bg-blue-500 text-white p-8">
          <div className="h-full flex flex-col justify-center items-center">
            {/* <Image
                src={loginImage}
                alt="Login Image"
                width={400}
                height={300}
              /> */}
            {/* Sesuaikan dengan gambar yang sesuai */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;