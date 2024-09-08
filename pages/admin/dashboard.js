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
        <div className=" ml-64 mt-16 flex-1 h-auto bg-gray-100">
          {/* Header */}
          <div className="p-8 h-64 bg-gradient-to-r from-[#2F93F5] to-[#0A4A89] ">
            <div className=" top-0 right-0 mt-4 mr-4">
              <i className="fas fa-user-circle text-white text-3xl"></i>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white">Dashboard</h1>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Main Section */}
          <div className="bg">

          </div>
        </div>
      </div>
    );
  }
