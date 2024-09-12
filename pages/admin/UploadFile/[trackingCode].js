import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { FiUpload } from "react-icons/fi"; // Using react-icons for the upload icon

const UploadFile = () => {
  const router = useRouter();
  const { trackingCode } = router.query; // Get trackingCode from query params
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Reset the error when a new file is selected
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const token = localStorage.getItem("token"); // Get token for authentication
    if (!token) {
      setError("Token is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("trackingCode", trackingCode); // Include trackingCode

    try {
      setUploading(true);
      const response = await axios.post(
        "https://gqk2bgt5-5001.asse.devtunnels.ms/upload-file",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "File uploaded successfully!",
          text: `Tracking Code: ${trackingCode}`,
        });
        router.push("/admin/view-requests");
      } else {
        setError("Failed to upload file.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-blue-50 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Upload file</h1>

        {/* <p className="mb-4 text-blue-500 text-center">
          Drag or drop your files here or click to upload
        </p> */}

        {/* Display the Tracking Code */}
        <p className="mb-4 text-gray-600">
          <strong>Tracking Code:</strong> {trackingCode || "Loading..."}
        </p>

        {/* File Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 w-full h-48 flex items-center justify-center transition ${
            dragActive ? "border-blue-600" : "border-blue-400"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FiUpload className="text-4xl text-blue-400" />
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Display selected file */}
        {file && (
          <p className="mt-4 text-green-600">
            Selected file: {file.name}
          </p>
        )}

        {/* Error message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          className={`${
            uploading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded w-full mt-4`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
};

export default UploadFile;
