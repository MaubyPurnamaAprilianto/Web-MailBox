import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import LogoFixColor from "../../public/assets/logo-apps/Logo-fix-full-color.png";
import LoginSVG from "../../public/svg/login.svg";
import NProgress from "nprogress"; // Import NProgress
import "nprogress/nprogress.css"; // Import NProgress styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk mengatur visibility password
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Mulai progress bar saat login dimulai
    NProgress.start();

    try {
      const response = await axios.post('https://gqk2bgt5-5001.asse.devtunnels.ms/admin/login', { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Terjadi kesalahan!');
    } finally {
      // Hentikan progress bar setelah login selesai
      NProgress.done();
    }
  };

  return (
    <>
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
                Login Untuk Mengakses Halaman Admin Web 
                LDPO
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    type={showPassword ? "text" : "password"} 
                    id="password"
                    placeholder="Masukkan Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} 
                      className="focus:outline-none"
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5 text-gray-600"
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
                      ) : (
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
                            d="M15 12m-3-3a9 9 0 000 6m6-3a9 9 0 000-6m-9-9a6 6 0 000 12m12 0a6 6 0 000-12"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
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
          <div className="hidden md:block w-1/2 bg-blue-500 p-8 flex items-center justify-center">
            <Image src={LoginSVG} alt="Login Illustration" width={500} height={500} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
