  import { useEffect } from "react";
  import { useRouter } from "next/router";
  import Sidebar from "../../components/sidebar/Sidebar";

  export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
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
          <div className="p-8 h-64 bg-gradient-to-r from-[#2F93F5] to-[#0A4A89] relative">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <i className="fas fa-user-circle text-white text-3xl"></i>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white">Dashboard</h1>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Main Section */}
          <div className="relative p-8 grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Diagram 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 relative -mt-48 z-10">
              <h2 className="text-xl font-bold mb-4">Diagram 1</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="mt-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">[Diagram Placeholder]</span>
              </div>
            </div>

            {/* Diagram 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 lg:-mt-48 mt-0 relative z-10">
              <h2 className="text-xl font-bold mb-4">Diagram 2</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="mt-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">[Diagram Placeholder]</span>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-green-500 text-2xl font-bold">15</div>
                    <div className="text-sm text-gray-500">Label 1</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-500 text-2xl font-bold">21</div>
                    <div className="text-sm text-gray-500">Label 2</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-500 text-2xl font-bold">31</div>
                    <div className="text-sm text-gray-500">Label 3</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagram 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Diagram 3</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="mt-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">[Diagram Placeholder]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
