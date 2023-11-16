import React, { useEffect, useState } from "react";
// import nav_logo from "../assets/nav-logo.png";
import navLogoWhite from "../assets/navlogoWhite.png";

import discord from "../assets/discord.svg";

import twitter from "../assets/twitter.svg";
import github from "../assets/github.svg";
import { OrangeButton } from "./button/OrangeButton";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <footer
      className={`p-4 bg-shardeumBlue sm:p-6 ${
        location.pathname.includes("/workplace")
          ? "hidden"
          : "block"
      }`}
    >
      <div className={`mx-auto  max-w-screen-xl`}>
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <img src={navLogoWhite} className="m-1 h-8" alt="Shardeum Logo" />
              <span className="self-center text-2xl italic text-white whitespace-nowra">
                University
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-white">The web3 development platform</span>
              <div className="flex gap-4">
                <img
                  className=" relative w-[32px] h-[32px] cursor-pointer transition-all hover:scale-110"
                  alt="Discord icon svgrepo"
                  src={discord}
                />
                <img
                  className="relative w-[32px] h-[32px] cursor-pointer transition-all hover:scale-110"
                  alt="Discord icon svgrepo"
                  src={twitter}
                />
                <img
                  className="relative w-[32px] h-[32px] cursor-pointer transition-all hover:scale-110"
                  alt="Discord icon svgrepo"
                  src={github}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <span className="font-satoshi text-[20px] text-white font-semibold">
                Subscribe to Our Newsletter
              </span>
            </div>
            <div className="font-satoshi text-white ">
              <span>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-[10px]"
              />
              <OrangeButton
                title={"Subscribe"}
                style={"py-[12px] px-[22px] text-[16px]"}
              />
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
          <div className="text-white flex mt-4 space-x-6 sm:justify-center sm:mt-0">
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
