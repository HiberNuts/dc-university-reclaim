import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// Import your new logo and social media icons
import logoWhite from "../assets/Logo-vertical.svg";
import youtubeIcon from "../assets/Youtube.svg";
import twitterIcon from "../assets/twitter.svg";
import telegramIcon from "../assets/Telegram.svg";
import facebookIcon from "../assets/Facebook.svg";
import linkedinIcon from "../assets/Linkedin.svg";
import arrowLeft from "../assets/arrow-left.svg";
import divider from "../assets/Divide-footer.svg";
import footerBackground from "../assets/footer-bg.png";
import footerBg from "../assets/dc-footer-bg.png";
import footerPattern from "../assets/footer-pattern.png";

export default function NewFooter() {
  const location = useLocation();
  const [email, setEmail] = useState("");

  const joinNewsletter = async () => {
    try {
      if (email.length > 2) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/newsletter/${email}`
        );
        if (response.data.message) {
          toast(response.data.message, { icon: "👏" });
          setEmail("");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setEmail("");
    }
  };

  if (location.pathname.includes("/workplace") || location.pathname.includes("/previewworkplace")) {
    return null;
  }

  return (
    <footer className="bg-black text-white px-2 py-10 md:p-20 relative">
      <div className="absolute inset-0  opacity-20 pointer-events-none">
        <img src={footerBg} alt="DecentraClasses" className="w-full h-full object-cover" />
      </div>
      <div className="w-full absolute inset-0 opacity-40 pointer-events-none">
        <img src={footerPattern} alt="DecentraClasses" className="w-full h-full object-cover" />
      </div>
      <div className="size-[400px]  bg-[#3A59FE] overflow-hidden absolute pointer-events-none -top-10 left-[50%] z-0 blur-[200px] opacity-20"></div>

      <Toaster />
      <div className="container mx-auto">
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center ">
          <div className="flex flex-col">
            <LazyLoadImage
              src={logoWhite}
              alt="DecentraClasses"
              width={172}
              height={143}
              className="mb-12 "
            />
            <div className="flex space-x-4">
              {[youtubeIcon, twitterIcon, telegramIcon, facebookIcon, linkedinIcon].map((icon, index) => (
                <Link key={index} to="#" className="bg-gray-800  rounded-md hover:bg-gray-700 transition-colors">
                  <img src={icon} alt="Social Icon" className="size-11" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-between gap-20">
            {['Lorem Ipsum', 'Lorem Ipsum'].map((title, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4">{title}</h3>
                <ul className="space-y-2">
                  {['Lorem', 'Ipsum', 'Lorem', 'Ipsum', 'Lorem'].map((item, idx) => (
                    <li key={idx}><Link to="#" className="hover:underline">{item}</Link></li>
                  ))}
                </ul>
              </div>
            ))}


          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-orbitron font-bold text-[24px] mb-8">Stay in the know with our newsletter</h3>
            <div className="flex flex-col md:flex-row gap-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter a valid email address"
                className="flex-grow px-6 rounded-md text-shardeumBlue bg-transparent border-2 border-[#5D89FF]/50"
              />
              <button className="all-[unset] box-border inline-flex items-center justify-center gap-7 pl-7 pr-4 py-4 relative flex-[0_0_auto] bg-gradient-to-b from-[#3A59FE] to-[#5d89ff]  rounded-lg max-h-[50px]">
                <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                  Subscribe
                </div>
                <img className="relative w-6 h-[26px]" alt="Arrow left" src={arrowLeft} />
              </button>
            </div>
          </div>
        </div>

        <img src={divider} alt="DecentraClasses" className=" mt-16 mb-10" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg">© 2024 Decentraclasses. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0 max-h-6 justify-center">
            <Link to="#" className="text-[16px] hover:underline">Terms and Conditions</Link>
            <div className="w-[2px] h- bg-[#5D89FF]"></div>
            <Link to="#" className="text-[16px] hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}