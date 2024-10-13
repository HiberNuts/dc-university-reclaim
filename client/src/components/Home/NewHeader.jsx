import React, { useEffect, useState, useContext, lazy, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../../assets/LogoName.svg";
import image41 from "../../assets/image-41.png";
import "./Home.css"; // Ensure your CSS is correctly imported
import ProfileDropDown from "./ProfileDropdown"; // Ensure this component exists and is correctly implemented
import axios from "axios";
import { useAccount, useSignMessage } from "wagmi";
import { ParentContext } from "../../contexts/ParentContext"; // Ensure this context is correctly set up
import GreenButton from "../button/GreenButton"; // Ensure this button component exists
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getUserContestDetails } from "../../utils/api/UserAPI"; // Ensure this utility exists
import toast, { Toaster } from "react-hot-toast";
import { disconnect } from "@wagmi/core";

const Burger = lazy(() => import("./Burger")); // Lazy load the Burger component for mobile

export default function NewHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHomeRoute, setIsHomeRoute] = useState(location.pathname === "/");
  const { address, isConnected } = useAccount();
  const { isLoading, signMessageAsync } = useSignMessage();

  const { loggedInUserData, setloggedInUserData } = useContext(ParentContext);

  const [isOpen, setIsOpen] = useState(false);
  const [xp, setXP] = useState(0);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const targetLinks = [
    location.pathname,
    location.hash,
    location.pathname.split("/")[1],
  ];

  useEffect(() => {
    setIsHomeRoute(location.pathname === "/");
  }, [location]);

  const signinUser = async () => {
    try {
      const data = await signMessageAsync({
        message: "Sign in to Shardeum University",
      });
      if (!data) {
        toast.error("Please sign the message to continue");
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        { walletAddress: address, signature: data }
      );
      setloggedInUserData(res?.data);
      if (
        !res?.data?.shardId ||
        res?.data?.shardId === "" ||
        res.data?.shardId.length < 5
      ) {
        navigate("/profile/edit");
      }
      if (res?.data?.email === "default") {
        navigate("/profile/edit");
      }
    } catch (error) {
      console.log("Error in signing in user->", error.message);
      navigate("/");
      setloggedInUserData({});
      disconnect();
    }
  };

  useEffect(() => {
    if (isConnected) {
      signinUser();
    }
    if (!isConnected) {
      setloggedInUserData({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);

  useEffect(() => {
    const getUserContestData = async () => {
      try {
        if (loggedInUserData?.shardId) {
          const resp = await getUserContestDetails(loggedInUserData?.shardId);
          if (!resp?.error && resp.data?.XPEarned) {
            setXP(resp.data?.XPEarned);
          }
        }
      } catch (error) {
        console.log("Error in fetching profile user data & contest->", error.message);
      }
    };
    if (loggedInUserData?.shardId) {
      getUserContestData();
    }
  }, [loggedInUserData]);

  return (
    <header
      className={`bg-black text-white py-5 px-20 ${isHomeRoute ? "sticky" : "border-b border-[#5D89FF]"
        } ${location.pathname.includes("/workplace") ? "fixed" : ""} ${location.pathname.includes("/previewworkplace") ? "fixed" : ""
        }`}
    >
      <Toaster />
      <Suspense fallback={<div className="bg-black text-white py-5 px-20"></div>}>
        <nav className="container mx-auto flex justify-between items-center px-10 border-[0.1px] border-[#5D89FF] rounded-xl h-[92px]">
          {/* Logo Section */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="DecentraClasses Logo" className="h-9 w-[262px]" />
          </Link>

          {/* Decorative Image */}
          <div className="h-[92px] flex-shrink-0 overflow-hidden">
            <div className="size-[226px]">
              <img
                src={image41}
                alt="Decorative"
                className="w-[262px] opacity-40 mix-blend-soft-light"
              />
            </div>
          </div>

          {/* Navigation Links and Login/Profile */}
          <div className="flex items-center space-x-6">
            <Link to="/courses" className="hover:text-gray font-semibold text-mini">
              Courses
            </Link>
            <Link to="/contests" className="hover:text-gray font-semibold text-mini">
              Contests
            </Link>

            {/* Connect Button or Profile Dropdown */}
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
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus || authenticationStatus === "authenticated");

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
                      if (!ready || isLoading) {
                        return (
                          <button
                            className="bg-gradient-to-b from-[#5D89FF] to-[#3A59FE] px-6 py-2 rounded-lg font-semibold text-mini"
                            disabled
                          >
                            Connecting
                          </button>
                        );
                      }
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            className="bg-gradient-to-b from-[#5D89FF] to-[#3A59FE] px-6 py-2 rounded-lg font-semibold text-mini"
                          >
                            Login
                          </button>
                        );
                      }
                      return (
                        <ProfileDropDown
                          loggedInUserData={loggedInUserData}
                          account={account.displayName}
                          chain={chain}
                          openChainModal={openChainModal}
                          openAccountModal={openAccountModal}
                          xp={xp}
                          homeRoute={isHomeRoute}
                        />
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

          {/* Mobile Burger Menu (Optional) */}
          {/* If you have a burger menu for mobile, integrate it here without altering existing HTML/CSS */}
          {/* Example:
          <div className="lg:hidden flex items-center z-60">
            <div className="focus:outline-none" onClick={toggleNavbar}>
              <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
          */}
        </nav>
      </Suspense>
    </header>
  );
}
