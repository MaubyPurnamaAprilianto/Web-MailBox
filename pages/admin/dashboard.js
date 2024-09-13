import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/sidebar/Sidebar";
import WeeklyRequestChart from "../../components/chart/WeeklyRequestChart";
import RequestStatusChart from "../../components/chart/RequestStatusChart";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa"; // Import the share icon

export default function Dashboard() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

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
          setNotifications(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchRequests();
  }, [router]);

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
          <div className="bg-white shadow-lg rounded-lg p-6">
            <WeeklyRequestChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600">
                Status Request
              </h2>
              <RequestStatusChart />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600">
                Notifikasi Request
              </h2>
              <ul>
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((request, index) => ( // Display only 5 notifications
                    <li
                      key={index}
                      className="flex justify-between items-center mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-black">{request.name}</p>
                        <p className="text-gray-500">{request.email}</p>
                      </div>
                      <a
                        href={`/admin/DetailRequest/${request.id}`} // Adjust link accordingly
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaExternalLinkAlt className="text-3xl" />
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
