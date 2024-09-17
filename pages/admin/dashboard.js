import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/sidebar/Sidebar";
import WeeklyRequestChart from "../../components/chart/WeeklyRequestChart";
import RequestStatusChart from "../../components/chart/RequestStatusChart";
import axios from "axios";
import { FaBell, FaChartArea, FaChartBar, FaChartPie, FaExternalLinkAlt } from "react-icons/fa"; // Import the share icon
import DailyRequestChart from "@/components/chart/DailyRequestChart";
import MonthlyRequestChart from "@/components/chart/MonthlyRequestChart";
import YearlyRequestChart from "@/components/chart/YearlyRequestChart";

export default function Dashboard() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("weekly"); // State for selected filter

  // New state for request statistics
  const [requestStats, setRequestStats] = useState({
    total: 0,
    approved: 0, // "Served" renamed to "Approved"
    pending: 0,
    rejected: 0,
    process: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    }

    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "https://gqk2bgt5-5001.asse.devtunnels.ms/admin/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          // Sort notifications by createdAt in descending order
          const sortedNotifications = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setNotifications(sortedNotifications);

          // Calculate statistics based on the response data
          const total = sortedNotifications.length;
          const approved = sortedNotifications.filter(
            (req) => req.status === "Approved"
          ).length; // Changed from "Served" to "Approved"
          const pending = sortedNotifications.filter(
            (req) => req.status === "Pending"
          ).length;
          const rejected = sortedNotifications.filter(
            (req) => req.status === "Rejected"
          ).length;

          const process = total - approved - pending - rejected;

          setRequestStats({ total, approved, pending, rejected , process });
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchRequests();
  }, [router]);

  // Handler to set selected filter
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="relative ml-64 mt-16 flex-1 h-auto bg-gray-100">
        <div className="p-8 h-32 bg-gradient-to-r from-[#2F93F5] to-[#0A4A89] relative">
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <i className="fas fa-user-circle text-white text-3xl"></i>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-white">Dashboard</h1>
          <p className="text-white">Layanan Permohonan Data Online</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Card for request statistics */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="bg-blue-500 shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex w-full flex-col items-center space-x-4">
                  <div className="mr-4">
                    <i className="fas fa-file-alt text-3xl text-blue-600"></i>
                  </div>
                  <div className="text-white">
                    <p className="mb-2">Total Data Request</p>
                    <div className="bg-blue-500 shadow-lg rounded-lg p-6 w-60 h-28 flex items-center justify-center">
                      <p className="text-2xl font-bold">
                        {requestStats.total}{" "}
                        <span className="text-sm">Requests </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex w-full flex-col items-center space-x-4">
                  <div className="">
                    <p className="text-gray-600 mb-2">
                      Data Request Sudah Di Layani
                    </p>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-black w-60 h-28 flex items-center justify-center">
                      <p className="text-2xl font-bold">
                        {requestStats.approved}{" "}
                        <span className="text-sm">Dari</span>
                        {requestStats.total}{" "}
                        <span className="text-sm"> Requests </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex w-full flex-col items-center space-x-4">
                  <div className="">
                    <p className="text-gray-600 mb-2">
                      Data Request Belum Di Layani
                    </p>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-black w-60 h-28 flex items-center justify-center">
                      <p className="text-2xl font-bold">
                        {requestStats.pending + requestStats.process}{" "}
                        <span className="text-sm">Dari</span>{" "}
                        {requestStats.total}{" "}
                        <span className="text-sm">Requests</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex w-full flex-col items-center space-x-4">
                  <div className="">
                    <p className="text-gray-600 mb-2">
                      Data Request Tidak Di Layani
                    </p>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-black w-60 h-28 flex items-center justify-center">
                      <p className="text-2xl font-bold">
                        {requestStats.rejected}{" "}
                        <span className="text-sm">Dari</span>
                        {requestStats.total}{" "}
                        <span className="text-sm">Requests</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other sections */}
        <div className="p-8 space-y-8">
          {/* Filter buttons */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-6 flex justify-center">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => handleFilterChange("daily")}
                  className={`px-4 py-2 rounded ${
                    selectedFilter === "daily"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-600"
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => handleFilterChange("weekly")}
                  className={`px-4 py-2 rounded ${
                    selectedFilter === "weekly"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-600"
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => handleFilterChange("monthly")}
                  className={`px-4 py-2 rounded ${
                    selectedFilter === "monthly"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-600"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => handleFilterChange("yearly")}
                  className={`px-4 py-2 rounded ${
                    selectedFilter === "yearly"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-600"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            {/* Conditionally render the selected chart */}
            {selectedFilter === "daily" && <DailyRequestChart />}
            {selectedFilter === "weekly" && <WeeklyRequestChart />}
            {selectedFilter === "monthly" && <MonthlyRequestChart />}
            {selectedFilter === "yearly" && <YearlyRequestChart />}
          </div>

          {/* Request status and notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
                <FaChartPie  className="text-3xl bg"/>
                Status Request
              </h2>
              <RequestStatusChart />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
                <FaBell className="text-3xl " />
                Notifikasi Request
              </h2>
              <ul>
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((request, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-black">
                          {request.name}
                        </p>
                        <p className="text-gray-500">{request.email}</p>
                      </div>
                      <a
                        href={`/admin/DetailRequest/${request.id}`} // Adjust link accordingly
                        className="text-white  bg-blue-500 hover:bg-blue-700 font-bold py-3 px-4 rounded inline-flex items-center"
                      >
                        <FaExternalLinkAlt className="text-xl" />
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No notifications available.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
