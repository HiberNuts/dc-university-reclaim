import React, { useEffect, useState } from "react";
// import nav_logo from "../assets/nav-logo.png";
import navLogoWhite from "../assets/navlogoWhite.svg";

import discord from "../assets/discord.svg";

import twitter from "../assets/twitter.svg";
import github from "../assets/github.svg";
import OrangeButton from "./button/OrangeButton";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Footer() {
  const location = useLocation();
  const [profileRoute, setprofileRoute] = useState(false);

  useEffect(() => {
    if (location.pathname == "/profile") {
      setprofileRoute(true);
    } else {
      setprofileRoute(false);
    }
  }, [location]);

  return (
    <footer className={`p-4 bg-shardeumBlue sm:p-6 ${location.pathname.includes("/workplace") ? "hidden" : "block"}`}>
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
              <input type="email" placeholder="Enter your email" className="rounded-[10px] p-2 " />
              <OrangeButton title={"Subscribe"} style={"py-[12px] px-[22px] text-[16px]"} />
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center">
            © 2023{" "}
            <a href="" className="hover:underline ">
              Shardeum, Inc
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
                by Decentraclasses.com
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
