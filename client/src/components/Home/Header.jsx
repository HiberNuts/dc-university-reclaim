import React, { useEffect, useState, useContext, lazy, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import navLogoBlack from "../../assets/navlogoBlack.svg";
import navLogoWhite from "../../assets/navlogoWhite.svg";
import "./Home.css";
import ProfileDropDown from "./ProfileDropdown";
import axios from "axios";
import { useAccount } from "wagmi";
import { ParentContext } from "../../contexts/ParentContext";
import GreenButton from "../button/GreenButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getUserContestDetails } from "../../utils/api/UserAPI";
const Burger = lazy(() => import("./Burger"));

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [homeRoute, sethomeRoute] = useState(true);
  const { address, isConnected } = useAccount();

  const { loggedInUserData, setloggedInUserData } = useContext(ParentContext);

  const [isOpen, setIsOpen] = useState(false);
  const [xp, setXP] = useState(0);

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
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, { walletAddress: address });
      setloggedInUserData(res?.data);
      if (!res?.data?.shardId || res?.data?.shardId == "" || res.data?.shardId.length < 5) {
        navigate("/profile/edit")
      }
      if (res?.data?.email === "default") {
        navigate("/profile/edit")
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    if (isConnected) {
      signinUser();
    }
    if (isConnected == false) {
      setloggedInUserData({});
    }
  }, [address]);
  useEffect(() => {
    const getUserContestData = async () => {
      try {
        if (loggedInUserData?.shardId)
          getUserContestDetails(loggedInUserData?.shardId).then((resp) => {
            if (resp?.error == false) {
              if (resp.data?.XPEarned)
                setXP(resp.data?.XPEarned);
            }
          })
      } catch (error) {
        console.log("Error in fetching profile user data & contest->", error.message)
      }
    }
    if (loggedInUserData?.shardId)
      getUserContestData();
  }, [loggedInUserData])
  const styleNavEl = `text-[18px] font-helvetica-neue-md before:bg-white before:left-0 ${homeRoute
    ? "hover:text-white text-white font-helvetica-neue-md"
    : "hover:text-black text-black hover:before:bg-black "
    }  before:transition-transform hover:before:scale-x-100 before:scale-x-0  before:duration-300 before:flex before:w-full before:h-[2px] relative before:absolute before:bottom-[-4px] before:rounded-full `;
  const activeNavEl = `text-[18px] font-helvetica-neue-md before:left-0 ${homeRoute ? "text-white before:bg-white " : ". before:bg-black text-black"
    }   before:transition-transform  before:scale-x-100 before:duration-300 before:flex before:w-full before:h-[2px] relative before:absolute before:bottom-[-4px] before:rounded-full`;

  const styleMobileNavBox =
    "opacity-0 z-[60] font-helvetica-neue-md relative lg:hidden mt-2 pb-4 flex flex-col items-center transition-all duration-1000 flex shadow-sm flex-col gap-0 items-center -top-[26rem] bg-white -z-20";
  const activeMobileNavBox =
    "z-[60] relative  font-helvetica-neue-md lg:hidden mt-2 pb-4 flex flex-col items-center transition-all duration-500 flex flex-col gap-2 items-center  absolute top-0 bg-gray-100 pb-5 sm:shadow-none shadow-md shadow-gray-700";

  return (
    <header
      className={`header  font-helvetica-neue-md flex justify-center align-middle flex-col z-50  w-full  ${homeRoute ? "bg-shardeumBlue sticky" : "bg-shardeumWhite border-b-[1px] border-b-black"
        } ${location.pathname.includes("/workplace") ? "fixed" : ""} ${location.pathname.includes("/previewworkplace") ? "fixed" : ""} `}
    >
      <Suspense fallback={<div className="header  z-50 border-gray w-full bg-shardeumBlue"></div>}>
        <nav className="sm:px-[100px] px-[8px] items-center text-center h-full ">
          <div className="flex items-center h-full justify-between">
            <Link to="/">
              <div className="flex items-center flex-row w-full h-full gap-2">
                <LazyLoadImage
                  style={{ width: "280px", height: "28px" }}
                  alt=""
                  height="28px"
                  src={`${homeRoute ? navLogoWhite : navLogoBlack} `}
                  width="280px"
                />
              </div>
            </Link>
            <ul className="hidden font-helvetica-neue-md lg:flex items-center xl:gap-9 lg:gap-6 ">
              <li className={targetLinks[0] === "/" && targetLinks[1] === "" ? activeNavEl : styleNavEl}>
                <Link to="/">Home</Link>
              </li>
              <li className={targetLinks[2] === "courses" ? activeNavEl : styleNavEl}>
                <Link to="/courses">Courses</Link>
              </li>
              <li className={targetLinks[2] === "contests" ? activeNavEl : styleNavEl}>
                <Link to="/contests">Contests</Link>
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
                        className="md:mr-6 -mt-2"
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
                            return <GreenButton isHoveredReq={true} onClick={openConnectModal} text={"Login"} />;
                          }
                          return (
                            <div style={{ display: "flex", gap: 12 }}>
                              <ProfileDropDown
                                loggedInUserData={loggedInUserData}
                                account={account.displayName}
                                chain={chain}
                                openChainModal={openChainModal}
                                openAccountModal={openAccountModal}
                                xp={xp}
                                homeRoute={homeRoute}
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
              <div className="focus:outline-none" onClick={toggleNavbar}>
                <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </div>
          </div>

          <div
            className={`bg-white  z-50 w-full p-2 flex items-center justify-center align-middle  border-4 border-shardeumGreen rounded-lg ${isOpen ? activeMobileNavBox : styleMobileNavBox
              }`}
          >
            <div
              className={
                "hover:bg-shardeumBlue  z-50 hover:text-white text-[20px] font-semibold w-full flex-row justify-center align-middle  text-black    rounded-md px-2 py-2 "
              }
            >
              <Link onClick={toggleNavbar} to="/" className="items-center flex    justify-center align-middle">
                <span className="items-center text-center"> Home</span>
              </Link>
            </div>
            <div
              className={
                "hover:bg-shardeumBlue hover:text-white text-[20px] font-semibold w-full flex-row justify-center align-middle  text-black    rounded-md px-2 py-2 "
              }
            >
              <Link onClick={toggleNavbar} to="contests" className="items-center flex    justify-center align-middle">
                <span className="items-center text-center"> Contests</span>
              </Link>
            </div>
            <div
              className={
                "hover:bg-shardeumBlue hover:text-white text-[20px] font-semibold w-full flex-row justify-center align-middle  text-black    rounded-md px-2 py-2 "
              }
            >
              <Link onClick={toggleNavbar} to="courses" className="items-center flex    justify-center align-middle">
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
                              className={`bg-shardeumBlue flex justify-center align-middle hover:bg-shardeumGreen rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[18px] w-[150px] h-[40px]`}
                            >
                              Login
                            </button>
                          );
                        }
                        return (
                          <div style={{ display: "flex", gap: 12 }}>
                            <ProfileDropDown
                              loggedInUserData={loggedInUserData}
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
            </div>
          </div>
        </nav>
      </Suspense>
    </header>
  );
}
