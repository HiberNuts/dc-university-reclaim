import React, { useState, useEffect, useContext } from "react";
import { faCheck, faCaretSquareDown, faHandPointRight, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import linkSVG from "./linkSVG.svg";
import mailSVG from "./mailSVG.svg";
import workSVG from "./workSVG.svg";
import pencil from "../../assets/pencil.png";

import CourseCard from "../Courses/CourseCard/CourseCard";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import { useAccount } from "wagmi";
import toast, { Toaster } from "react-hot-toast";
import { ParentContext } from "../../contexts/ParentContext";
import FeatureCourses from "../Home/FeatureCourses";
import ProfileCourses from "./ProfileCourses";

// import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

const ProfileLinks = ({ img, title }) => {
  return (
    <div className="text-white flex gap-3 text-[16px] font-[500]">
      <img src={img} alt="icon" />
      <span>{title}</span>
    </div>
  );
};

export const Profile = ({ isOpen, closeModal }) => {
  const [isEditing, setisEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const { address, isConnected } = useAccount();
  const [error, setError] = useState(null); // State for managing errors

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    // portfolio: "",
    // roles: [""],
  });
  const { allCourseMetaInfo, loggedInUserData, setuserDataIsUpdated, userDataIsUpdated } = useContext(ParentContext);

  useEffect(() => {
    const fetchUserData = async () => {
      // console.log(formData)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/getUserData?userid=${loggedInUserData._id}`
        );

        if (response?.data?.email == "default") {
          setFormData({ ...formData, name: "", email: "" });
          setisEditing(true);
        } else {
          setUserData(response.data);
          setFormData({ ...response.data, name: response.data.username });
        }
      } catch (error) {
        toast.error("Error while fetching user data");
      }
    };

    fetchUserData();
  }, [loggedInUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error message when the user selects a designation
    if (name === "designation") {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if designation is selected
    if (formData.designation === "Select Designation") {
      setError("Please select a designation");
      toast.error("Please select a designation"); // Show toast message
      return; // Stop submission if designation is not selected
    }

    // Clear error message before attempting to submit
    setError(null);

    setisEditing(false);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/auth/update?userid=${loggedInUserData._id}`,
        {
          ...formData,
          username: formData.name,
        }
      );
      setUserData(response.data);

      console.log(response);
      setuserDataIsUpdated(!userDataIsUpdated);
    } catch (error) {
      console.error("Error while updating user data:", error);
    }
  };

  const handleResendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/resend?userId=${loggedInUserData._id}`,
        {
          userid: loggedInUserData._id,
        }
      );
      if (response.status === 200) {
        toast.success("Verification email has been resent.");
      } else {
        toast.error("Failed to resend verification email.");
      }
    } catch (error) {
      console.error("Error while resending verification email:", error);
      toast.error("Error while resending verification email.");
    }
  };

  return (
    <div className="w-full  h-full flex justify-between align-middle">
      <Toaster />
      <div className="bg-shardeumBlue px-14 lg:w-[30%] h-[100vh]   left-0 rounded-r-xl  flex flex-col align-middle items-center">
        <div className="text-white mt-20">
          <img
            className="rounded-[50%] w-[160px] h-[160px] border-2 border-shardeumOrange object-cover"
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${loggedInUserData?.username}`}
            alt="user avatar"
          />
          {isEditing === false && (
            <p style={{ fontFamily: "satoshiVariable" }} className="text-center text-[22px] font-[700] mt-2 ">
              {formData.name}
            </p>
          )}
        </div>
        {isEditing ? (
          <div className="w-full mt-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6 w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-shardeumOrange focus:border-shardeumOrange block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-50"
                  placeholder="What should we call you"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-shardeumOrange focus:border-shardeumOrange block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-50"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-6">
                <Listbox
                  value={formData.designation}
                  onChange={(value) => handleChange({ target: { name: "designation", value } })}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full flex-row cursor-default rounded-lg bg-gray-50 py-2 text-left border border-gray-300 text-gray-900 text-sm focus:ring-shardeumOrange focus:border-shardeumOrange shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 bg-white">
                      <div className="px-2 flex justify-between align-middle h-full w-full">
                        <span className="block truncate">{formData.designation || "Select Designation"}</span>
                        {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"> */}
                        <FontAwesomeIcon icon={faCaretSquareDown} color="black" />
                        {/* </span> */}
                      </div>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 ">
                        {["Select Designation", "Web3 Beginner", "Web3 Intermediate", "Web3 Advanced", "Designer", "Product Manager", "Others"].map((designation, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                active ? "bg-shardeumOrange text-white" : "text-gray-900"
                              }`
                            }
                            value={designation}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                  {designation}
                                </span>
                                {selected && (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-shardeumBlue">
                                    <FontAwesomeIcon icon={faHandPointRight} />
                                  </span>
                                )}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              {/* <div className="mb-6">
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-shardeumOrange focus:border-shardeumOrange block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-50"
                  placeholder="Portfolio Link"
                  required
                />
              </div> */}
              <div className="w-full justify-center align-middle flex">
                <button
                  type="submit"
                  className={`bg-shardeumOrange hover.bg-[#fc7d34] rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[22px] w-[200px] h-[40px]`}
                >
                  <FontAwesomeIcon icon={faCheck} /> Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className={`w-full flex flex-col h-[20%] justify-evenly align-middle items-center`}>
            <div className="flex  flex-col h-full justify-evenly">
              {/* <ProfileLinks img={linkSVG} title={formData.portfolio} /> */}
              <ProfileLinks img={mailSVG} title={formData.email} />
              <ProfileLinks img={workSVG} title={formData.designation} />
            </div>
            <div className="w-full justify-center align-middle flex">
              <button
                onClick={() => setisEditing(true)}
                className={`bg-shardeumOrange flex justify-center align-middle hover.bg-[#fc7d34] rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[22px] w-[200px] h-[40px]`}
              >
                <img className="mr-2" src={pencil} alt="pencil" /> Update
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className="lg:w-[70%] h-auto flex justify-center
       align-middle"
      >
        <div className="content  w-full mx-20">
          <div className="mb-20">
            <div className="mt-10 relative">
              {!formData.isVerified && (
                <div
                  className="strip-bar"
                  style={{
                    background: "linear-gradient(90deg, #0052CC, #FF6D34)",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                    borderRadius: "10px",
                  }}
                >
                  <div className="strip-content flex flex-col items-center">
                    <div className="text-center text-white font-[500] text-[16px]">
                      <span style={{ color: "orange", fontWeight: "bold" }}>Email</span> not yet verified. Please verify
                      to proceed.
                    </div>
                    {/* <p className="text-black">Please verify to proceed</p> */}
                  </div>
                  <button
                    onClick={handleResendVerificationEmail}
                    className="strip-button bg-shardeumOrange mt-2 flex justify-evenly align-middle hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[18px] w-[110px] h-[30px]"
                  >
                    <FontAwesomeIcon icon={faRepeat} /> resend <span></span>
                  </button>
                </div>
              )}
            </div>

            <p className="font-satoshi  text-[48px] font-extrabold items-start mt-10   ">
              Welcome, <span className="BlueGradientFade">{formData.name}</span>
            </p>

            <span className="text-[18px] font-[500]">
              Cras tincidunt lobortis feugiat vivamus at morbi leo urna molestie atole elementum eu facilisis faucibus
              interdum posuere.elementum eu facilisis faucibus interdum posuere.
            </span>
          </div>
          <ProfileCourses loggedInUserData={loggedInUserData} />
        </div>
      </div>
    </div>
  );
};
