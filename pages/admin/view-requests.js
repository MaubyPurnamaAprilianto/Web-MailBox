import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import Sidebar from "@/components/sidebar/Sidebar";
import { FaShareSquare } from "react-icons/fa";
import Link from "next/link";

export default function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5001/admin/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        if (error.response?.status === 401) {
          router.push("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64 mt-16 p-6 md:p-8 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">View Requests</h1>
        </div>

        {loading ? (
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center text-gray-600">
            No requests found.
          </div>
        ) : (
          <div className="bg-white shadow overflow-auto rounded">
            <div className="max-w-4xl">
              <table className="table-auto w-full">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    {[
                      "No", "Nama", "NIK", "Upload Photo KTP", "Nomor Pengesahan",
                      "Alamat", "Pekerjaan", "No HP", "Email", "Rincian Informasi",
                      "Tujuan Permohonan Informasi", "Cara Memperoleh Informasi", 
                      "Mendapatkan Salinan Informasi", "Cara Mendapatkan Salinan Informasi",
                      "Status", "Tracking Code", "File URL", "Tanggal", "Action"
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request, index) => (
                    <tr
                      key={`${request.id}-${request.trackingCode}`}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{request.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{request.nik}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.uploadPhotoKTP}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.nomorPengesahan}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.alamat}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.pekerjaan}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.noHp}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.email}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.rincianInformasi}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.tujuanPermohonanInformasi}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.caraMemperolehInformasi}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.mendapatkanSalinanInformasi}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.caraMendapatkanSalinanInformasi}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{request.status}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{request.trackingCode}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate">{request.fileUrl}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{moment(request.createdAt).format("YYYY-MM-DD")}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 text-center">
                        <Link href={`/admin/DetailRequest/${request.id}`}>
                          <FaShareSquare className="inline-block mr-2 text-lg text-blue-500 hover:text-blue-700 cursor-pointer" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}  
      </div>
    </div>
  );
}
