import React, { useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const Track = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setTrackingCode(e.target.value);
  };

  const handleTrackRequest = async () => {
    if (!trackingCode) {
      setError("Please enter a tracking code.");
      return;
    }

    setLoading(true);
    setError("");
    setTrackingResult(null);

    try {
      const response = await axios.get(
        `http://localhost:5001/user/track/${trackingCode}`
      );
      setTrackingResult(response.data);
    } catch (err) {
      setError("Tracking code tidak ditemukan atau terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-auto bg-white">
        <div className="container mx-auto p-4 text-black">
          <h1 className="text-2xl font-bold mb-4 text-left text-gray-700 py-4 px-4">
            Lacak Permintaan Anda
          </h1>
          <div className="bg-white p-6  w-full rounded-lg shadow-md px-[20%]">
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Masukkan Tracking Code
              </label>
              <input
                type="text"
                value={trackingCode}
                onChange={handleInputChange}
                className="mt-1 px-3 block w-full h-10 border border-gray-300 rounded-md shadow-sm"
                placeholder="Masukkan Tracking Code"
              />
            </div>
            <div className="text-right">
              <button
                onClick={handleTrackRequest}
                className="bg-none border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Memuat..." : "Lacak"}
              </button>
            </div>

            {error && (
              <div className="mt-4 text-red-600 font-semibold">{error}</div>
            )}

            {trackingResult && (
              <div className="mt-6 bg-gray-100 p-4 rounded-md">
                <h2 className="text-xl font-semibold mb-2">Hasil Pelacakan:</h2>
                <p>
                  <strong>Nama :</strong> {trackingResult.name}
                </p>
                <p>
                  <strong>NIK :</strong> {trackingResult.nik}
                </p>
                <p>
                  <strong>Status :</strong> {trackingResult.status}
                </p>
                {/* Tambahkan informasi lainnya sesuai kebutuhan */}
                <p>
                  <strong>File URL :</strong> {trackingResult.fileUrl}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Track;
