import React, { useEffect, useState } from "react";
// import nav_logo from "../assets/nav-logo.png";
import navLogoWhite from "../assets/navlogoWhite.svg";

import discord from "../assets/discord.svg";

import twitter from "../assets/twitter.svg";
import github from "../assets/github.svg";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Footer() {
  const location = useLocation();
  const [email, setemail] = useState("")
  const [profileRoute, setprofileRoute] = useState(false);
  const [loader, setloader] = useState(false)

  useEffect(() => {
    if (location.pathname == "/profile") {
      setprofileRoute(true);
    } else {
      setprofileRoute(false);
    }
  }, [location]);

  const joinNewsLetter = async () => {
    try {
      setloader(true)
      if (email.length > 2) {
        const data = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL
          }/user/newsletter?email=${email}`
        )
        toast(data?.data?.message, {
          icon: "👏"
        })
        setemail("")
      }
      setloader(false)

    } catch (error) {
      setloader(false)
      toast.success(error.response.data.message || "Something went wrong")
      setemail("")
    }

  }

  return (
    <footer className={`p-4 bg-shardeumBlue sm:p-6 ${location.pathname.includes("/workplace") ? "hidden" : "block"}`}>
      <Toaster />
      <div className={`w-full py-[40px] md:py-0 md:px-[100px]`}>
        <div className="flex-col md:flex-row flex gap-10 ms:gap-5 md:justify-between">
          <div className="flex flex-col justify-between gap-6 md:gap-0">
            <LazyLoadImage
              className="-ml-4"
              style={{ width: "280px", height: "28px" }}
              alt=""
              height="28px"
              src={navLogoWhite}
              width="280px"
            />

            <div className="flex flex-col gap-4">
              <span className="text-white text-[16px] font-helvetica-neue">
                Stay ahead in the future of the internet with best web3 content.
              </span>
              <div className="flex gap-4">
                <Link to="https://discord.gg/shardeum" target="_blank">
                  <img
                    className=" relative w-[32px] h-[32px] cursor-pointer transition-all hover:scale-110"
                    alt="Discord icon svgrepo"
                    src={discord}
                  />
                </Link>
                <Link to="https://twitter.com/shardeum" target="_blank">
                  <img
                    className="relative w-[32px] h-[32px] cursor-pointer transition-all hover:scale-110"
                    alt="Discord icon svgrepo"
                    src={twitter}
                  />
                </Link>
                <Link to="https://github.com/Shardeum" target="_blank">
                  <img
                    className="relative w-[32px] h-[32px] cursor-pointer transition-all hover:scale-110"
                    alt="Discord icon svgrepo"
                    src={github}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-helvetica-neue-md text-[20px] text-white ">Subscribe to Our Newsletter</span>
            </div>
            <div className=" text-white ">
              <span className="text-[16px] font-helvetica-neue-roman text-white">
                The latest news, articles, and resources, sent to your inbox weekly.
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <input value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="Enter your email" className="rounded-[10px] p-2 " />
              <button
                onClick={() => joinNewsLetter()}
                className={`py-[12px] px-[22px] text-[16px] bg-shardeumOrange hover:bg-[#fc7d34] rounded-[10px]   transition ease-in-out items-center font-semibold align-middle text-center text-white `}
              >
                {loader ? <div role="status " className="gap-2 items-center">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div> : <span className="items-center text-center ">Subscribe</span>
                }

              </button>

            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center">
            © 2023{" "}
            <a href="" className="hover:underline ">
              Shardeum Foundation
            </a>
            . All Rights Reserved.
          </span>
          <div className="text-white font-helvetica-neue-roman text-18px] flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link target="_blank" to="https://Decentraclasses.com">
              <span>
                Made with{" "}
                <span className="animate-scale" role="img" aria-label="heart">
                  ❤️
                </span>{" "}
                by Decentraclasses.com</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
