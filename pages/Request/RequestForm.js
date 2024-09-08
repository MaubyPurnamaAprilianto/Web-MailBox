import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    uploadPhotoKTP: null,
    nomorPengesahan: "",
    alamat: "",
    pekerjaan: "",
    noHp: "",
    email: "",
    rincianInformasi: "",
    tujuanPermohonanInformasi: "",
    caraMemperolehInformasi: "",
    mendapatkanSalinanInformasi: "",
    caraMendapatkanSalinanInformasi: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, uploadPhotoKTP: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
  
    try {
      const response = await axios.post(
        "https://gqk2bgt5-5001.asse.devtunnels.ms/user/request",
        formDataToSend
      );
      console.log(response.data);
      setMessage(response.data.message);
      Swal.fire({
        title: "Permohonan Diterima!",
        text: "Terima kasih telah mengajukan permohonan informasi.",
        icon: "success",
        confirmButtonText: "OK",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Terjadi kesalahan saat mengirim permintaan.");
      Swal.fire({
        title: "Terjadi Kesalahan!",
        text: "Terjadi kesalahan saat mengirim permohonan.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-4 text-black pb-10">
      <h1 className="text-2xl font-bold mb-4 text-left text-gray-700 py-4 px-4">
        Form Permohonan Informasi Publik
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-wrap -mx-4">
          {/* Left Column */}
          <div className="w-full md:w-1/2 px-4 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Pemohon
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-2 mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm "
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                NIK
              </label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                className="px-2 mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm "
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Foto KTP
              </label>
              <div className="mt-1 flex items-center">
                <label className="border border-gray-300 text-black py-2 px-10 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Pilih File
                  <input
                    type="file"
                    name="uploadPhotoKTP"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
                <span className="ml-3 text-gray-500">
                  {formData.uploadPhotoKTP
                    ? formData.uploadPhotoKTP.name
                    : "No file chosen"}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nomor Pengesahan
              </label>
              <input
                type="text"
                name="nomorPengesahan"
                value={formData.nomorPengesahan}
                onChange={handleChange}
                className="px-2 mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm "
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Alamat
              </label>
              <textarea
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-24 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pekerjaan
              </label>
              <input
                type="text"
                name="pekerjaan"
                value={formData.pekerjaan}
                onChange={handleChange}
                className="px-2 mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm "
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                No HP
              </label>
              <input
                type="text"
                name="noHp"
                value={formData.noHp}
                onChange={handleChange}
                className="px-2 mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm "
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-2 mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm "
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 px-4 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rincian Informasi
              </label>
              <textarea
                name="rincianInformasi"
                value={formData.rincianInformasi}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-36 border border-gray-300 rounded-md shadow-sm "
                rows="4"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tujuan Permohonan Informasi
              </label>
              <textarea
                name="tujuanPermohonanInformasi"
                value={formData.tujuanPermohonanInformasi}
                onChange={handleChange}
                className="mt-1 px-2 block w-full h-36 border border-gray-300 rounded-md shadow-sm "
                rows="4"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cara Memperoleh Informasi
              </label>
              <div className="mt-2 space-y-2 text-black">
                {["Melihat", "Membaca", "Mendengarkan", "Mencatat"].map(
                  (option) => (
                    <div key={option}>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="caraMemperolehInformasi"
                          value={option}
                          onChange={handleChange}
                          className="form-radio h-4 w-4 text-blue-600"
                          required
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mendapatkan Salinan Informasi
              </label>
              <div className="mt-2 space-y-2 text-black">
                {["Hardcopy", "Softcopy"].map((option) => (
                  <div key={option}>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="mendapatkanSalinanInformasi"
                        value={option}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-blue-600"
                        required
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cara Mendapatkan Salinan Informasi
              </label>
              <select
                name="caraMendapatkanSalinanInformasi"
                value={formData.caraMendapatkanSalinanInformasi}
                onChange={handleChange}
                className="mt-1 block w-full h-10 text-black border border-gray-300 rounded-md shadow-sm "
                required
              >
                <option value="Mengambil Langsung">Mengambil Langsung</option>
                <option value="Kurir">Kurir</option>
                <option value="Pos">Pos</option>
                <option value="Faksimili">Fax</option>
                <option value="Email">Email</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-right mt-8">
          <button
            type="submit"
            className="bg-none border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Kirim Permohonan"}
          </button>
          {/* {message && (
            <p className="mt-4 text-center text-green-600 font-semibold">
              {message}
            </p>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
