import React, { useEffect, useState, useContext, lazy, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../../assets/LogoName.svg";
import "./Home.css";
import ProfileDropDown from "./ProfileDropdown";
import axios from "axios";
import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import { ParentContext } from "../../contexts/ParentContext";
import { getUserContestDetails } from "../../utils/api/UserAPI";
import toast, { Toaster } from "react-hot-toast";

const Burger = lazy(() => import("./Burger")); // Lazy load for mobile

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { isLoading, signMessageAsync } = useSignMessage();
  const [xp, setXP] = useState(0);
  const { loggedInUserData, setloggedInUserData } = useContext(ParentContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const signinUser = async () => {
    try {
      const message = "Sign in to Decentraclasses";
      const signature = await signMessageAsync({ message });
      if (!signature) return toast.error("Please sign the message to continue");

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, { walletAddress: address, signature });
      const userData = res?.data;
      setloggedInUserData(userData);

      localStorage.setItem("userSession", JSON.stringify({ address, userData, timestamp: Date.now() }));

      if (!userData?.shardId || userData?.email === "default") {
        navigate("/profile/edit");
      }
    } catch (error) {
      console.error("Error in signing in user:", error);
      handleSignOut();
    }
  };

  const handleSignOut = () => {
    navigate("/");
    setloggedInUserData({});
    localStorage.removeItem("userSession");
    disconnect();
  };

  useEffect(() => {
    const storedSession = JSON.parse(localStorage.getItem("userSession"));
    const sessionIsValid = storedSession && storedSession.address === address && Date.now() - storedSession.timestamp < 30 * 24 * 60 * 60 * 1000;

    if (isConnected && address) {
      if (sessionIsValid) {
        setloggedInUserData(storedSession.userData);
      } else {
        handleSignOut();
        signinUser();
      }
    } else if (!isConnected) {
      handleSignOut();
    }
  }, [address, isConnected]);

  useEffect(() => {
    const getUserContestData = async () => {
      try {
        if (loggedInUserData?.shardId) {
          const { data } = await getUserContestDetails(loggedInUserData.shardId);
          if (data?.XPEarned) setXP(data.XPEarned);
        }
      } catch (error) {
        console.error("Error fetching user contest data:", error);
      }
    };

    if (loggedInUserData?.shardId) getUserContestData();
  }, [loggedInUserData]);

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`hover:text-blue-500 font-semibold text-mini ${location.pathname.includes(path) ? "text-blue-500" : "text-white"}`}
    >
      {label}
    </Link>
  );

  return (
    <header className="text-white sticky top-4 z-[999]">
      <Toaster />
      <Suspense fallback={<div className="bg-black text-white my-5 mx-2 md:mx-20 rounded-xl"></div>}>
        <nav className="container bg-black/60 backdrop-blur mx-auto flex justify-between items-center px-2 md:px-10 w-full border border-decentraBlue rounded-xl h-[92px]">
          {/* Logo Section */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-9 lg:w-[262px] w-[250px]" />
          </Link>

          {/* Navigation Links for Medium Screens and Up */}
          <div className="hidden md:flex items-center space-x-6">
            {navLink("/", "Home")}
            {navLink("/courses", "Courses")}
            {navLink("/contests", "Contests")}

            <ConnectButton.Custom>
              {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

                return (
                  <div {...(!ready && { "aria-hidden": true, style: { opacity: 0, pointerEvents: "none", userSelect: "none" } })}>
                    {isLoading ? (
                      <button className="bg-gradient-to-b from-decentraBlue to-[#3A59FE] px-6 py-2 rounded-lg font-semibold text-mini" disabled>
                        Connecting
                      </button>
                    ) : connected ? (
                      <ProfileDropDown xp={xp} loggedInUserData={loggedInUserData} account={account.displayName} chain={chain} openChainModal={openChainModal} openAccountModal={openAccountModal} />
                    ) : (
                      <button onClick={openConnectModal} className="bg-gradient-to-b from-decentraBlue to-[#3A59FE] px-6 py-2 rounded-lg font-semibold text-mini">
                        Login
                      </button>
                    )}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

          {/* Hamburger Menu for Small Screens */}
          <div className="md:hidden flex items-center z-60">
            <button onClick={toggleNavbar} className="focus:outline-none">
              <Burger isOpen={isOpen} />
            </button>
          </div>

          {/* Side Panel for Mobile */}
          {isOpen && (
            <div className="md:hidden absolute left-0 top-[120%] w-full bg-black p-5 z-50 flex flex-col space-y-4 border-2 border-decentraBlue rounded-xl">
              <div className="flex flex-col justify-center items-center gap-6 py-5">
                {navLink("/", "Home")}
                {navLink("/courses", "Courses")}
                {navLink("/contests", "Contests")}

                <ConnectButton.Custom>
                  {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                    const ready = mounted && authenticationStatus !== "loading";
                    const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

                    return (
                      <div {...(!ready && { "aria-hidden": true, style: { opacity: 0, pointerEvents: "none", userSelect: "none" } })}>
                        {isLoading ? (
                          <button className="bg-gradient-to-b from-decentraBlue to-[#3A59FE] px-6 py-2 rounded-lg font-semibold text-mini" disabled>
                            Connecting
                          </button>
                        ) : connected ? (
                          <ProfileDropDown xp={xp} loggedInUserData={loggedInUserData} account={account.displayName} chain={chain} openChainModal={openChainModal} openAccountModal={openAccountModal} />
                        ) : (
                          <button onClick={openConnectModal} className="bg-gradient-to-b from-decentraBlue to-[#3A59FE] px-6 py-2 rounded-lg font-semibold text-mini">
                            Login
                          </button>
                        )}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
            </div>
          )}
        </nav>
      </Suspense>
    </header>
  );
}
