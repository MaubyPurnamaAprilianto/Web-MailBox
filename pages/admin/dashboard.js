import { useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/sidebar/Sidebar";
import WeeklyRequestChart from "../../components/chart/WeeklyRequestChart"; // Import Chart

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="relative ml-64 mt-16 flex-1 h-auto bg-gray-100">
        {/* Header */}
        <div className="p-8 h-32 bg-gradient-to-r from-[#2F93F5] to-[#0A4A89] relative"> 
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <i className="fas fa-user-circle text-white text-3xl"></i>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-white">Dashboard</h1>
          <p className="text-white">Layanan Permohonan Data Online</p>
        </div>

        {/* Main Section */}
        <div className="p-8 space-y-8">

          {/* Kotak terpisah untuk Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
              <WeeklyRequestChart />
          </div>

          {/* Grid untuk Request Rata-rata & Notifikasi Request */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Kotak terpisah untuk Request Rata-rata */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Request Rata-rata</h2>
              <table className="min-w-full bg-gray-50">
                <thead>
                  <tr>
                    <th className="py-2 text-gray-700">Nomor KTP</th>
                    <th className="py-2 text-gray-700">Nama</th>
                    <th className="py-2 text-gray-700">No HP</th>
                    <th className="py-2 text-gray-700">Keperluan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-600">1123441314</td>
                    <td className="py-2 text-gray-600">Adi 123</td>
                    <td className="py-2 text-gray-600">082119982828</td>
                    <td className="py-2 text-gray-600">Data Alumni</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Kotak terpisah untuk Notifikasi Request */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Notifikasi Request</h2>
              <ul>
                {Array(4).fill().map((_, index) => (
                  <li key={index} className="flex items-center justify-between py-2 text-gray-600">
                    <span>Adi</span>
                    <span>adi@gmail.com</span>
                    <i className="fas fa-external-link-alt"></i>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
