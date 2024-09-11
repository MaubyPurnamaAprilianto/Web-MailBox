import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

const UploadFile = () => {
  const router = useRouter();
  const { trackingCode } = router.query; // Get trackingCode from query params
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Upload File</h1>

        <p className="mb-4 text-black">
          <strong>Tracking Code:</strong> {trackingCode || "Loading..."}
        </p>

        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleUpload}
          className={`${
            uploading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded w-full`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
};

export default UploadFile;
