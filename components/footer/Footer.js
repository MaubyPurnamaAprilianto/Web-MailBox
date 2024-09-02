import Image from "next/image";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFax, FaHandshake, FaGlobe } from "react-icons/fa";
import Link from "next/link";

import LogoDisdik from "../../public/assets/logo-apps/logo-disdik-special-request-for-web.png";
import LaporFooter from "../../public/assets/lapor-footer.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#002F6C] to-[#0071BC] pt-12 pb-4 text-white">
      <div className="container mx-auto">
        <div className="flex items-center px-24 mb-8">
          <Image src={LogoDisdik} width={150} height={150} alt="Logo Disdik" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-24">
          {/* Alamat Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Alamat
            </h3>
            <p className="text-sm leading-relaxed">
              Jl. Dr. Rajiman No.6, Pasir Kaliki, Kec. Cicendo,  Kota Bandung, Jawa Barat 40171
            </p>
          </div>

          {/* Surel Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FaEnvelope className="mr-2" />
              Surel
            </h3>
            <p className="text-sm leading-relaxed">
              <a href="mailto:disdik@jabarprov.go.id" className="text-white hover:underline">
                disdik@jabarprov.go.id
              </a>
            </p>
          </div>

          {/* Bantuan Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FaHandshake className="mr-2" />
              Bantuan
            </h3>
            <p className="text-sm leading-relaxed">Telp: (022) 4264318</p>
            <p className="text-sm leading-relaxed">Faks: (022) 4264881</p>
          </div>

          {/* Media Sosial Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FaGlobe className="mr-2" />
              Media Sosial
            </h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:opacity-75 border border-white rounded-lg p-3" aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </Link>
              <Link href="#" className="hover:opacity-75 border border-white rounded-lg p-3" aria-label="Twitter">
                <FaTwitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="hover:opacity-75 border border-white rounded-lg p-3" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="hover:opacity-75 border border-white rounded-lg p-3" aria-label="YouTube">
                <FaYoutube className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-4">
              <Link href="#" className="text-white hover:underline mt-4">
                <Image src={LaporFooter} width={150} height={150} alt="Lapor Footer" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white mt-10 pt-4 text-center">
          <p className="text-sm">
            Copyright © 2024 Dinas Pendidikan Jawa Barat. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
