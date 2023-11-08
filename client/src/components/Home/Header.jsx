import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import navLogoBlack from "../../assets/navlogoBlack.png";
import navLogoWhite from "../../assets/navlogoWhite.png";
import "./Home.css";
import { HashLink } from "react-router-hash-link";
import Burger from "./Burger";
import axios from "axios";
import { ProfileDropDown } from "./ProfileDropdown";
import { useAccount } from "wagmi";
// import { Profile } from "../Profile/Profile";
// import { MobileMenu } from "./MobileMenu";
// import { Menu } from "@headlessui/react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [homeRoute, sethomeRoute] = useState(true);
  const { address, isConnected } = useAccount();

  const coursesRef = useRef(null);

  const scrollToCourses = () => {
    coursesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const Location = useLocation();
  const targetLinks = [Location.pathname, Location.hash, Location.pathname.split("/")[1]];

  useEffect(() => {
    if (location.pathname == "/") {
      sethomeRoute(true);
    } else {
      sethomeRoute(false);
    }
  }, [location]);

  const signinUser = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signin", { email: "lovlyraghav4@gmail.com" });
      if (res?.data?.isVerified == false) {
        navigate("/profile");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(location.pathname);

  const styleNavEl = `before:bg-white before:left-0 ${
    homeRoute ? "hover:text-white text-white" : "hover:text-black text-black hover:before:bg-shardeumOrange "
  }  before:transition-transform hover:before:scale-x-100 before:scale-x-0  before:duration-300 before:flex before:w-full before:h-[2px] relative before:absolute before:bottom-[-4px] before:rounded-full `;
  const activeNavEl = ` before:left-0 ${
    homeRoute ? "text-white before:bg-white " : " before:bg-shardeumOrange text-shardeumOrange"
  }   before:transition-transform  before:scale-x-100 before:duration-300 before:flex before:w-full before:h-[2px] relative before:absolute before:bottom-[-4px] before:rounded-full`;
  const styleMobileNavEl = "p-3 font-medium";
  const activeMobileNavEl = "bg-white-400 text-white font-medium relative h-full   w-full text-center p-3";
  const styleMobileNavBox =
    "opacity-0 z-[60]  relative lg:hidden mt-2 pb-4 flex flex-col items-center transition-all duration-1000 flex shadow-sm flex-col gap-0 items-center -top-[26rem] bg-white -z-20";
  const activeMobileNavBox =
    "z-[60] relative lg:hidden mt-2 pb-4 flex flex-col items-center transition-all duration-500 flex flex-col gap-2 items-center  absolute top-0 bg-gray-100 pb-5 sm:shadow-none shadow-md shadow-gray-700";

  return (
    <header
      className={`header border-b-4 border-gray w-full  ${homeRoute ? "bg-shardeumBlue" : "bg-white"} ${
        location.pathname.includes("/workplace") ? "fixed" : ""
      } `}
    >
      <nav className="p-6 lg:mx-48 md:mx-8 items-center text-center h-full ">
        <div className="">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center flex-row w-full gap-2">
                <img src={`${homeRoute ? navLogoWhite : navLogoBlack} `} alt="Logo" className="w-[150px]" />
                <p className={`${homeRoute ? "text-white" : "text-black"} italic text-[28px] font-[500] `}>
                  University
                </p>
              </div>
            </Link>
            <ul className="hidden lg:flex items-center xl:gap-9 lg:gap-6 ">
              <li className={targetLinks[0] === "/" && targetLinks[1] === "" ? activeNavEl : styleNavEl}>
                <Link to="/">Home</Link>
              </li>
              <li className={targetLinks[2] === "courses" ? activeNavEl : styleNavEl}>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== "loading";
                    const connected =
                      ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

                    return (
                      <div
                        {...(!ready && {
                          "aria-hidden": true,
                          style: {
                            opacity: 0,
                            pointerEvents: "none",
                            userSelect: "none",
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <button
                                onClick={openConnectModal}
                                style={{ fontFamily: "satoshiVariable" }}
                                className={`bg-shardeumOrange flex justify-center align-middle hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[18px] w-[150px] h-[40px]`}
                              >
                                Login
                              </button>
                            );
                          }
                          return (
                            <div style={{ display: "flex", gap: 12 }}>
                              <ProfileDropDown
                                account={account.displayName}
                                chain={chain}
                                openChainModal={openChainModal}
                                openAccountModal={openAccountModal}
                              />
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </li>
              {/* <ConnectButton chainStatus={"none"} label="Login" showBalance={"false"} /> */}
            </ul>

            <div className="lg:hidden flex items-center z-60">
              <button className="focus:outline-none" onClick={toggleNavbar}>
                <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
              </button>
            </div>
          </div>
        </div>
        <div
          className={`bg-white  z-50 w-full p-2 flex items-center justify-center align-middle  border-2 border-shardeumOrange rounded-lg ${
            isOpen ? activeMobileNavBox : styleMobileNavBox
          }`}
        >
          <div
            className={
              "hover:bg-shardeumBlue  z-50 hover:text-white text-[20px] font-semibold w-full flex-row justify-center align-middle  text-black    rounded-md px-2 py-2 "
            }
          >
            <Link onClick={toggleNavbar} to="/" className="items-center flex    justify-center align-middle">
              <svg
                className=" w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 2"
                viewBox="0 0 48 48"
                id="Home"
              >
                <path
                  d="m38.22 17-1.95-1.59v-5.25a1.4 1.4 0 1 0-2.79 0v2.93L28.43 9a7 7 0 0 0-8.86 0l-9.79 8a6.92 6.92 0 0 0-2.56 5.38v11.3a7 7 0 0 0 7 7h19.57a7 7 0 0 0 7-7V22.34A6.92 6.92 0 0 0 38.22 17ZM19.81 37.83v-9.68a4.2 4.2 0 0 1 8.39 0v9.68ZM38 33.64a4.2 4.2 0 0 1-4.19 4.19H31v-9.68a7 7 0 0 0-14 0v9.68h-2.8a4.2 4.2 0 0 1-4.2-4.19v-11.3a4.19 4.19 0 0 1 1.54-3.25l9.79-8a4.21 4.21 0 0 1 5.3 0l9.79 8A4.19 4.19 0 0 1 38 22.34Z"
                  fill="#ff8066"
                  class="color000000 svgShape"
                ></path>
              </svg>

              <span className="items-center text-center"> Home</span>
            </Link>
          </div>
          <div
            className={
              "hover:bg-shardeumBlue hover:text-white text-[20px] font-semibold w-full flex-row justify-center align-middle  text-black    rounded-md px-2 py-2 "
            }
          >
            <Link onClick={toggleNavbar} to="courses" className="items-center flex    justify-center align-middle">
              <svg className=" w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="blockchain">
                <defs>
                  <linearGradient id="a" x1="5.406" x2="18.594" y1="18.625" y2="5.438" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#ff8066" class="stopColor5433ff svgShape"></stop>
                    <stop offset="1" stop-color="#ff4620" class="stopColor20bdff svgShape"></stop>
                  </linearGradient>
                </defs>
                <path
                  fill="url(#a)"
                  d="m4.324,6.52c.108-.084.207-.179.328-.247l5.999-3.374c.832-.469,1.865-.469,2.697,0l6,3.375c.121.068.219.162.327.246l-7.676,4.605-7.676-4.605Zm6.926,5.905L3.435,7.736c-.109.297-.185.608-.185.934v6.66c0,.992.537,1.91,1.401,2.396l6,3.375c.19.107.392.183.599.241v-8.917Zm1.5,0v8.917c.206-.058.409-.134.599-.241l6-3.375c.864-.486,1.401-1.404,1.401-2.396v-6.66c0-.326-.077-.636-.185-.934l-7.815,4.689Z"
                ></path>
              </svg>

              <span className="items-center text-center"> Courses</span>
            </Link>
          </div>
          <div>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                  ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            className={`bg-shardeumOrange flex justify-center align-middle hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[22px] w-[150px] h-[40px]`}
                          >
                            Login
                          </button>
                        );
                      }
                      return (
                        <div style={{ display: "flex", gap: 12 }}>
                          <ProfileDropDown
                            account={account.displayName}
                            chain={chain}
                            toggleNavbar={toggleNavbar}
                            openChainModal={openChainModal}
                            openAccountModal={openAccountModal}
                          />
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </nav>
    </header>
  );
}
