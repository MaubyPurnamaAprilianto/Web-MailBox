import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaSpinner,
  FaBackspace,
  FaBackward,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import Sidebar from "../../../components/sidebar/Sidebar"; // Import Sidebar
import Link from "next/link";

const DetailRequest = () => {
  const router = useRouter();
  const { id } = router.query;
  const [request, setRequest] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.isReady && id) {
      const fetchRequestDetails = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token is missing.");
          return;
        }

        try {
          const response = await axios.get(
            `https://gqk2bgt5-5001.asse.devtunnels.ms/admin/getrequests/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRequest(response.data);
        } catch (err) {
          console.error(err);
          setError("An error occurred while fetching the request details.");
        }
      };

      fetchRequestDetails();
    } else if (!id) {
      router.push("/admin/view-requests"); // Redirect if id is missing
    }
  }, [router.isReady, id]);

  const handleRequest = async (status) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token is missing.");
      setLoading(false);
      return;
    }

    try {
      const url =
        status === "Rejected"
          ? `https://gqk2bgt5-5001.asse.devtunnels.ms/admin/delete-request/${id}`
          : `https://gqk2bgt5-5001.asse.devtunnels.ms/admin/update-status/${id}`;
      const method = status === "Rejected" ? "DELETE" : "PUT";

      await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: status === "Rejected" ? {} : { status },
      });

      if (status === "Rejected") {
        router.push("/admin/view-requests");
      } else if (status === "Approved") {
        router.push(`/upload-file/${request.trackingCode}`);
      } else {
        router.push("/admin/view-requests");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while processing the request.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Request details not found.</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 mt-16 flex-1 bg-gray-100 p-4">
        <div className="relative p-8 bg-white shadow-md rounded-lg mt-6 text-black">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-72 h-40 bg-gray-300 rounded-lg overflow-hidden">
                {/* {request.uploadPhotoKTP ? (
                  <Image
                    src={request.uploadPhotoKTP}
                    alt="KTP Image"
                    layout="responsive"
                    width={224}
                    height={144}
                  />
                ) : (
                  <Image
                    src="/default-image.jpg" // Replace with your fallback image
                    alt="Default Image"
                    layout="responsive"
                    width={224}
                    height={144}
                  />
                )} */}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p>
                <strong>Nama Permohonan:</strong> {request.name}
              </p>
              <p>
                <strong>Nomor KTP:</strong> {request.nik}
              </p>
              <p>
                <strong>Nomor Pengesahan:</strong> {request.nomorPengesahan}
              </p>
              <p>
                <strong>Alamat:</strong> {request.alamat}
              </p>
              <p>
                <strong>Pekerjaan:</strong> {request.pekerjaan}
              </p>
              <p>
                <strong>No HP:</strong> {request.noHp}
              </p>
              <p>
                <strong>Email:</strong> {request.email}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p>
              <strong>Rincian Yang Dibutuhkan:</strong>
            </p>
            <p>{request.rincianInformasi}</p>
          </div>

          <div className="mt-4">
            <p>
              <strong>Tujuan Permohonan Informasi:</strong>
            </p>
            <p>{request.tujuanPermohonanInformasi}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p>
                <strong>Cara Memperoleh Informasi:</strong>
              </p>
              <p>{request.caraMemperolehInformasi}</p>
            </div>
            <div>
              <p>
                <strong>Mendapatkan Salinan Informasi:</strong>
              </p>
              <p>{request.mendapatkanSalinanInformasi}</p>
            </div>
          </div>

          <div className="mt-4">
            <p>
              <strong>Cara Mendapatkan Salinan Informasi:</strong>
            </p>
            <p>{request.caraMendapatkanSalinanInformasi}</p>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2 flex items-center"
              onClick={() => handleRequest("Proses")}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="mr-2 animate-spin" />
              ) : (
                <FaSpinner className="mr-2" />
              )}
              Proses
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2 flex items-center"
              onClick={() => handleRequest("Rejected")}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="mr-2 animate-spin" />
              ) : (
                <FaTimes className="mr-2" />
              )}
              Rejected
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded flex items-center"
              onClick={() => handleRequest("Approved")}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="mr-2 animate-spin" />
              ) : (
                <FaCheck className="mr-2" />
              )}
              Approved
            </button>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/admin/view-requests"
            className="text-blue-500 hover:text-blue-700 border border-blue-500 hover:border-blue-700 rounded px-4 py-2 "
          >
            <FaArrowAltCircleLeft className="inline-block mr-2" />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailRequest;
