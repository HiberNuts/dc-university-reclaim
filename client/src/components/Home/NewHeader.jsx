import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/LogoName.svg";
import image41 from "../../assets/image-41.png";
import "./Home.css";

export default function NewHeader() {
  return (
    <header className="bg-black text-white py-5 px-20">
      <nav className="container mx-auto flex justify-between items-center px-10 border-[0.1px] border-[#5D89FF] rounded-xl h-[92px]">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="DecentraClasses Logo" className="h-9 w-[262px]" />
        </Link>
        <div className="h-[92px] flex-shrink-0 overflow-hidden">

        <div className="size-[226px] ">
            <img src={image41} alt="DecentraClasses Logo" className=" w-[262px] opacity-40 mix-blend-soft-light" />
        </div>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/courses" className="hover:text-gray font-semibold text-mini">Courses</Link>
          <Link to="/contests" className="hover:text-gray font-semibold text-mini">Contests</Link>
          <button className="bg-gradient-to-b from-[#5D89FF] to-[#3A59FE] px-6 py-2 rounded-lg font-semibold text-mini">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}