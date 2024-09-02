import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import RequestForm from "./Request/RequestForm";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="bg-white w-full h-auto">
      <Navbar />    
      <RequestForm /> 
      <Footer />
    </div>
  );
}
