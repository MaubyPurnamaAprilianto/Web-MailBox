import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const UpdateRequest = () => {
  const [status, setStatus] = useState("Approved");
  const [trackingCode, setTrackingCode] = useState("");
  const [file, setFile] = useState(null);

  const handleStatusUpdate = async () => {
    const Token = localStorage.getItem("token");

    if (!Token) {
      router.push("/admin/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:5001/admin/process",
        formData
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <>
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="ml-64 mt-16 flex-1 bg-gray-50 p-6 md:p-8">
      <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            View Requests
          </h1>
        </div>

        {/* Form Section */}
        <div className=" p-8 mt-8 bg-white shadow-lg rounded-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStatusUpdate();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tracking Code
              </label>
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="mt-1 px-3 block w-full h-10 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 px-3 block w-full h-10 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Approved">Approved</option>
                <option value="Proses">Proses</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
                <label className="border border-gray-300 text-black py-2 px-10 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Pilih File
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    required
                  />
                </label>
                <span className="ml-3 text-gray-500">
                  {file ? file.name : "No file selected"}
                </span>
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700"
              >
                Update Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default UpdateRequest;
