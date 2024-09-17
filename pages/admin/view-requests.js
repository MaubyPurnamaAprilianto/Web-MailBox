import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import Sidebar from "@/components/sidebar/Sidebar";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import * as XLSX from "xlsx";

export default function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("All"); // State for selected status
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5001/admin/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  const exportToExcel = () => {
    // Define the columns you want to export
    const worksheetData = requests.map((request) => ({
      No: requests.indexOf(request) + 1,
      Nama: request.name,
      NIK: request.nik,
      "Upload Photo KTP": request.uploadPhotoKTP,
      "Nomor Pengesahan": request.nomorPengesahan,
      Alamat: request.alamat,
      Pekerjaan: request.pekerjaan,
      "No HP": request.noHp,
      Email: request.email,
      "Rincian Informasi": request.rincianInformasi,
      "Tujuan Permohonan Informasi": request.tujuanPermohonanInformasi,
      "Cara Memperoleh Informasi": request.caraMemperolehInformasi,
      "Mendapatkan Salinan Informasi": request.mendapatkanSalinanInformasi,
      "Cara Mendapatkan Salinan Informasi":
        request.caraMendapatkanSalinanInformasi,
      Status: request.status,
      "Tracking Code": request.trackingCode,
      "File URL": request.fileUrl,
      Tanggal: moment(request.createdAt).format("YYYY-MM-DD"),
    }));

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert worksheet data to Excel format
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Requests");

    // Generate the Excel file and prompt the user to download
    XLSX.writeFile(workbook, "Requests.xlsx");
  };

  // Filter requests based on selected status
  const filteredRequests =
    selectedStatus === "All"
      ? requests
      : requests.filter((request) => request.status === selectedStatus);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 mt-16 p-6 md:p-8 bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">View Requests</h1>
            <div className="flex items-center gap-4">
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg p-2 text-black focus:outline-none "
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Proses">Process</option>
                {/* Add other status options as needed */}
              </select>
              <button
                onClick={exportToExcel}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Export to Excel
              </button>
            </div>
          </div>

          {/* Status Filter Dropdown */}
          {/* <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                Filter by Status
              </label>
              
            </div> */}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center text-gray-600">No requests found.</div>
          ) : (
            <div className="bg-white shadow overflow-auto rounded max-h-96">
              <div className="overflow-x-auto w-full">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-indigo-600">
                    <tr>
                      {[
                        "No",
                        "Action",
                        "Nama",
                        "NIK",
                        "Pekerjaan",
                        "Email",
                        "Rincian Informasi",
                        "Tujuan Permohonan Informasi",
                        "Status",
                        "Tracking Code",
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
                  <tbody className="bg-white">
                    {filteredRequests.map((request, index) => (
                      <tr
                        key={`${request.id}-${request.trackingCode}`}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-4 py-2 text-sm font-medium text-gray-900 ">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500 text-center">
                          <Link
                            href={`/admin/DetailRequest/${request.id}`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded inline-flex items-center"
                          >
                            <FaExternalLinkAlt />
                          </Link>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {request.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {request.nik}
                        </td>
                        {/* <td className="px-4 py-2 text-sm text-gray-500 truncate">
                            <Image
                              src={`http://10.10.10.53:5001/getImage/${request.uploadPhotoKTP}`}
                              alt="KTP"
                              width={100}
                              height={100}
                            />
                          </td> */}

                        <td className="px-4 py-2 text-sm text-gray-500 truncate">
                          {request.pekerjaan}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500 truncate">
                          {request.email}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500 truncate">
                          {request.rincianInformasi}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500 truncate">
                          {request.tujuanPermohonanInformasi}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {request.status}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {request.trackingCode}
                        </td>
                        {/* <td className="px-4 py-2 text-sm text-gray-500">
                            {moment(request.createdAt).format("YYYY-MM-DD")}
                          </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
