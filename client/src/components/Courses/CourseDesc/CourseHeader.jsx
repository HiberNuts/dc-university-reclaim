import React, { useContext, useEffect, useState } from "react";
import timeIcon from "../../../assets/timeIcon.svg";
import profileIcon from "../../../assets/profileIcon.svg";
import levelIcon from "../../../assets/levelIcon.svg";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../../utils/generateSlug";
import { ParentContext } from "../../../contexts/ParentContext";
import { courseProgressAPI, enrollCourseAPI } from "../../../utils/api/CourseAPI";
import { useAccount } from "wagmi";
import { toast, Toaster } from "react-hot-toast";
import GreenButton from "../../button/GreenButton";
import AVATAR from "../../../assets/image-47.png";
import seperator from '../../../assets/seperator.svg'

import DCButton from "../../button/DCButton";
const CourseHeader = ({ props }) => {
  const { loggedInUserData } = useContext(ParentContext);
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const [isCourseEnrolled, setisCourseEnrolled] = useState(false);

  const enrollCourse = async () => {
    if (isConnected) {
      if (loggedInUserData?.isVerified == true) {
        const data = await enrollCourseAPI({
          accessToken: loggedInUserData.accessToken,
          courseId: props._id,
          userId: loggedInUserData._id,
        });
        if (data) {
          toast.success("Course enrolled!", {
            icon: "🌟",
          });
          setisCourseEnrolled(true);
        }
      } else {
        toast.custom((t) => (
          <div
            className={`${t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex p-4">
              <div className="flex items-start">
                <div className="flex flex-col justify-center align-middle h-full pt-0.5">
                  <p className=" rounded-full ">🌟</p>
                </div>
                <div className="ml-3 flex-1">
                  <p className=" text-md font-medium text-gray-900">
                    Please verify your email before proceeding!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => navigate("/profile")}
                className=" w-full border border-transparent rounded-none rounded-r-lg ml-2  flex items-center justify-center text-sm font-medium text-shardeumBlue hover:text-shardeumOrange focus:outline-none"
              >
                Click here
              </button>
            </div>
          </div>
        ));
      }
    } else {
      toast("Login to continue!", {
        icon: "🌟",
      });
    }
  };

  const getuserProgress = async () => {
    if (isConnected) {
      const data = await courseProgressAPI({
        accessToken: loggedInUserData.accessToken,
        courseId: props._id,
        userId: loggedInUserData._id,
      });
      if (data.enrolledCourse) {
        setisCourseEnrolled(true);
      }
    }
  };

  useEffect(() => {
    getuserProgress();
  }, [loggedInUserData, props]);

  return (
    <div className="flex flex-wrap w-full  py-5  px-2 md:px-20 justify-between gap-8 mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full border-t-2 border-l-2 border-r-2 border-[#5D89FF] rounded-t-xl">
        <div className="w-full grid grid-cols-3 md:grid-cols-5">
          <div className="hidden md:block col-span-1 "></div>
          <div className="col-span-3 ">
            <div className="banner-div rounded-xl w-full ">
              {/* <div className=""> */}
              <img
                className=" h-60 w-full"
                src={props?.banner}
              />
              {/* </div> */}
            </div>
          </div>
          <div className="hidden md:block  col-span-1 "></div>
        </div>
      </div>
      <div className="description-div lg:flex-1 flex-wrap flex flex-col gap-[32px]  justify-between">
        <div className="header-div">
          <div className="relative text-wrap text-center mt-[-1.00px] 
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-orbitron font-semibold text-transparent text-[24px] md:text-[40px] tracking-[0] leading-[50px] whitespace-nowrap">
            {props?.title}
          </div>
          <div className="flex flex-col pt-10 pb-5">
            <div className="flex flex-row gap-3">
              <div>
                <img src={AVATAR} className="w-12 h-12 rounded-md" />
              </div>
              <div className="flex flex-col">
                <p>Rick Astley</p>
                <p>Block chain engineer at Decentraclass/com</p>
              </div>
            </div>
          </div>
          <div className="py-5 flex flex-col md:flex-row">
            <div className="flex-1 pb-6 md:pb-0">
              {isCourseEnrolled ? (
                <div>
                  <DCButton
                    onClick={() => {
                      if (isConnected) {
                        navigate(`/workplace/${generateSlug(props?.title)}`);
                      } else {
                        toast("Login to continue!", {
                          icon: "🌟",
                        });
                      }
                    }}
                    btnContent={"Continue"}
                  />
                </div>
              ) : (
                <div>
                  <DCButton onClick={enrollCourse} btnContent={"Start Course"} />
                </div>
              )}
            </div>
            <div className="flex-1items-end">
              <div className="grid grid-cols-3 gap-8 items-center w-full rounded-xl">
                <div className="flex flex-row">
                  <div className="flex-1 inline-flex flex-col  gap-2">
                    <div className="font-gilroy text-[#efedf5] text-sm text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                      {props?.duration} Hrs.
                    </div>
                    <div className="font-gilroysemibold text-neutral-50 text-sm text-center leading-[30px] whitespace-nowrap">
                      ( DURATION )
                    </div>
                  </div>
                  <div>
                    <img className="relative flex-1 grow h-12" alt="Seperator" src={seperator} />
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex-1 inline-flex flex-col  gap-2">
                    <div className="font-gilroysemibold text-[#efedf5] text-sm text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                      10
                    </div>
                    <div className="font-gilroysemibold font-semibold text-neutral-50 text-sm text-center leading-[30px] whitespace-nowrap">
                      ( CHAPTER )
                    </div>
                  </div>
                  <div>
                    <img className="relative flex-1 grow h-12" alt="Seperator" src={seperator} />
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex-1 inline-flex flex-col  gap-2">
                    <div className="font-gilroysemibold text-[#efedf5] text-sm text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                      {props?.level}
                    </div>
                    <div className="font-gilroysemibold font-semibold text-neutral-50 text-sm text-center leading-[30px] whitespace-nowrap">
                      ( LEVEL )
                    </div>
                  </div>
                  <div>
                    <img className="relative flex-1 grow h-12" alt="Seperator" src={seperator} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-[18px] tracking-[0] leading-7 mt-5">
            {props?.description}</p>
        </div>
      </div>

    </div>
  );
};

export default CourseHeader;
