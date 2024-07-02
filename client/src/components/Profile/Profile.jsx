import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import { faCaretSquareDown, faHandPointRight, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast, { Toaster } from "react-hot-toast";
import { ParentContext } from "../../contexts/ParentContext";
import { getUserData,getUserContestDetails } from "../../utils/api/UserAPI";
const ProfileCourses = lazy(() => import("./ProfileCourses"));
import mailSVG from "./mailSVG.svg";
import workSVG from "./workSVG.svg";
import logo from "../../assets/navlogoBlack.svg";
import JOB from "../../assets/job.svg";
import MAIL from "../../assets/mail.svg";
import PORTFOLIO from "../../assets/portfolio.svg";
import LEVEL from "../../assets/level.svg";
import TWITTER from "../../assets/twitter.png";
import GITHUB from "../../assets/github.png";
import YOUTUBE from "../../assets/youtube.png";
import LINKEDIN from "../../assets/linkedin.png";
import DISCORD from "../../assets/discord.png";
import ProfileButton from "../button/ProfileButton";
import TRIANGLE_IMG from "../../assets/leaderboard_triangle.png";
import AVATAR from "../../assets/avatar.png";
import FLASH from "../../assets/flash.svg";
import PARTICIPATION from "../../assets/participation.svg";
import STAR from "../../assets/star.svg";
import BADGES from "../../assets/badges.svg";
import PRIZE from "../../assets/prize.svg";
import GreenButton from "../button/GreenButton";
import { Link } from "react-router-dom";
import ProfileProjects from "./ProfileProjects";

const ProfileLinks = ({ img, title }) => {
  return (
    <div className="text-white flex gap-3 text-[16px] font-[500]">
      <img src={img} alt="icon" />
      <span>{title}</span>
    </div>
  );
};

const Profile = ({ isOpen, closeModal }) => {
  const {shardId}=useParams();
  const [isEditing, setisEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null); // State for managing errors
  const [userProfile,setUserProfile]=useState(null);
  const [userContestData,setUserContestData]=useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "Web3 Beginner",
  });
  const { loggedInUserData, setuserDataIsUpdated, userDataIsUpdated, setloggedInUserData } = useContext(ParentContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/getUserData?userid=${loggedInUserData._id}`, {

          headers: {
            Authorization: `Bearer ${loggedInUserData?.accessToken}`,

          }
        }
        );

        if (response?.data?.email == "default") {
          setFormData({ ...formData, name: "", email: "" });
          setisEditing(true);
        } else {
          setUserData(response.data);
          // setloggedInUserData({ ...response.data, accessToken: loggedInUserData.accessToken });
          setFormData({ ...response.data, name: response.data.username });
        }
      } catch (error) {
        // toast.error("Error while fetching user data");
      }
    };
  
    fetchUserData();
  }, [loggedInUserData]);

  //USE EFFECT TO FETCH PROFILE-USER DATA AND CONTEST DETAILS OF THAT USER
  useEffect(()=>{
      const getUserProfileData=async()=>{
        getUserData(shardId).then((response)=>{
           if(response.error==false)
           {
             setUserProfile(response?.data);
           } 
        })
      }
      const getUserContestData=async()=>{
        try {
          if(shardId)
            getUserContestDetails(shardId).then((resp)=>{
              if(resp?.error==false)
                {
                  setUserContestData(resp.data);
                }
          })
        } catch (error) {
            console.log("Error in fetching profile user data & contest->",error.message)
        }
      }
      if(shardId)
      {
        getUserProfileData();
        getUserContestData();
      }  
  },[shardId])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error message when the user selects a designation
    if (name === "designation") {
      setError(null);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Check if designation is selected

  //   if (formData.designation === "Select Designation") {
  //     setError("Please select a designation");
  //     toast.error("Please select a designation"); // Show toast message
  //     return; // Stop submission if designation is not selected
  //   } else {
  //     // Clear error message before attempting to submit
  //     setError(null);
  //     setisEditing(false);

  //     try {
  //       const response = await axios.put(
  //         `${import.meta.env.VITE_BACKEND_URL}/auth/update?userid=${loggedInUserData._id}`,
  //         {
  //           ...formData,
  //           username: formData.name,
  //         },
  //         {

  //           headers: {
  //             Authorization: `Bearer ${loggedInUserData?.accessToken}`,

  //           }
  //         }
  //       );
  //       if (loggedInUserData.email === "default") {
  //         handleResendVerificationEmail();
  //       }
  //       setloggedInUserData({
  //         ...response.data,
  //         accessToken: loggedInUserData.accessToken,
  //       });
  //       // setuserDataIsUpdated(!userDataIsUpdated);
  //     } catch (error) {
  //       console.error("Error while updating user data:", error);
  //     }
  //   }
  // };

  const handleResendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/resend?userId=${loggedInUserData._id}`,
        {
          userid: loggedInUserData._id,
        },
        {

          headers: {
            Authorization: `Bearer ${loggedInUserData?.accessToken}`,

          }
        }
      );
      if (response.status === 200) {
        toast.success("Verification email has been sent.");
      } else {
        toast.error("Failed to resend verification email.");
      }
    } catch (error) {
      console.error("Error while resending verification email:", error);
      toast.error("Error while resending verification email.");
    }
  };
  return (
    <div className="">
              <div className="bg-shardeumTeelGreen min-h-[180px] relative profile_header">
                     <img src={TRIANGLE_IMG} className="absolute left-10"/>
              </div>
              <div className="grid grid-cols-8 min-h-screen "> 
                    <div className="col-span-2 bg-shardeumBlue relative">
                      <div className="absolute top-[-80px] left-16  ">
                        <LazyLoadImage src={userProfile?.image??'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'} className="rounded-lg border-2 w-[120px] h-[120px]" />
                      </div>
                      <div className="name my-[50px] px-16">
                        <p className='my-2 text-[24px] text-left leading-tight text-white text-overflow-ellipsis font-helvetica-neue-bold'>{userProfile?.username}</p>
                        <p className='my-2 text-[16px] text-left leading-[28px] text-white text-overflow-ellipsis'>
                             {userProfile?.description}
                        </p>
                        <div className="flex flex-col">
                                {
                                  userProfile?.designation&&
                                  <div className="flex gap-2">
                                      <img src={JOB}/>
                                      <p className="my-2 text-[16px] text-left leading-[28px] text-white text-overflow-ellipsis font-[500]">{userProfile?.designation}</p>
                                  </div>
                                }
                                {
                                 userProfile?.email&&
                                  <div className="flex gap-2">
                                      <img src={MAIL}/>
                                      <p className="my-2 text-[16px] text-left leading-[28px] text-white text-overflow-ellipsis font-[500]">{userProfile?.email}</p>
                                  </div>
                                }
                                {
                                  userProfile?.portfolio&&
                                  <div className="flex gap-2">
                                      <img src={PORTFOLIO}/>
                                      <p className="my-2 text-[16px] text-left leading-[28px] text-white text-overflow-ellipsis font-[500]">{userProfile?.portfolio}</p>
                                  </div>
                                }
                                {
                                  userProfile?.experience&&
                                  <div className="flex gap-2">
                                      <img src={LEVEL}/>
                                      <p className="my-2 text-[16px] text-left leading-[28px] text-white text-overflow-ellipsis font-[500]">{userProfile?.experience}</p>
                                  </div>
                                }
                                  <div className="flex gap-5  mt-2">
                                    {
                                      userProfile?.twitter&&
                                     <a target="_blank" href={userProfile?.twitter??'#'}>
                                      <img src={TWITTER}/>
                                     </a>
                                    }
                                    {
                                      userProfile?.github&&
                                     <a target="_blank" href={userProfile?.github??'#'}>
                                      <img src={GITHUB}/>
                                     </a>
                                    }
                                    {
                                      userProfile?.linkedIn&&
                                     <a target="_blank" href={userProfile?.linkedIn??'#'}>
                                      <img src={LINKEDIN}/>
                                     </a>
                                    }
                                    {
                                      userProfile?.youtube&&
                                     <a target="_blank" href={userProfile?.youtube??'#'}>
                                      <img src={YOUTUBE}/>
                                     </a>
                                    }
                                  </div>
                                  {
                                    loggedInUserData?._id==userProfile?._id&&
                                    <div className="mt-10">
                                      <Link to={'/profile/edit'}>
                                        <ProfileButton isHoveredReq={true} text={"Edit Profile"} />
                                      </Link>
                                    </div>
                                  }
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                        <div className="border-t-2 border-b-[1px] py-2 grid grid-cols-5">
                                 <div className="col-span-1 border-r-2 border-r-[#8a8f96] text-center">
                                     <p className="text-[16px]">XP Points</p>
                                     <p className="flex justify-center">
                                        <img src={FLASH}/>
                                        <p className="text-[24px] leading-tight text-overflow-ellipsis px-2">{userContestData?.XPEarned??'-'}</p>
                                     </p>
                                 </div>
                                 <div className="col-span-1 border-r-2 border-r-[#8a8f96]  text-center">
                                     <p className="text-[16px]">Contests participated</p>
                                     <p className="flex justify-center">
                                        <img src={PARTICIPATION}/>
                                        <p className="text-[24px] leading-tight text-overflow-ellipsis px-2">{userContestData?.contestParticipated??'-'}</p>
                                     </p>
                                 </div>
                                 <div className="col-span-1 border-r-2 border-r-[#8a8f96]  text-center">
                                     <p className="text-[16px]">Contests won</p>
                                     <p className="flex justify-center">
                                        <img src={STAR}/>
                                        <p className="text-[24px] leading-tight text-overflow-ellipsis px-2">{userContestData?.contestWon??'-'}</p>
                                     </p>
                                 </div>
                                 <div className="col-span-1 border-r-2 border-r-[#8a8f96]  text-center">
                                     <p className="text-[16px]">Prize won</p>
                                     <p className="flex justify-center">
                                        <img src={PRIZE}/>
                                        <p className="text-[24px] leading-tight text-overflow-ellipsis px-2">{userContestData?.AmountEarned??'-'}</p>
                                     </p>
                                 </div>
                                 <div className="col-span-1 text-center">
                                     <p className="text-[16px]">Badges</p>
                                     <p className="flex justify-center">
                                        <img src={BADGES}/>
                                        <p className="text-[24px] leading-tight text-overflow-ellipsis px-2">{userContestData?.badges??'-'}</p>
                                     </p>
                                 </div>
                         </div>
                         {
                          loggedInUserData?.shardId==userProfile?.shardId&&loggedInUserData?.email=="default"&&
                         <div className="px-10 pt-5">
                                   <p>Email not yet  verified. Please <span className="text-blue-500 cursor-pointer" onClick={handleResendVerificationEmail}> click </span>to verify it.</p>
                         </div>
                         }
                         <div className="p-10">
                          <div>
                             {
                               userProfile!=null&&
                               <ProfileCourses userData={userProfile} loggedInUserData={loggedInUserData}/>
                            }
                          </div>
                         </div>
                         {
                         loggedInUserData?.projects && 
                          <div className="p-10">
                             <ProfileProjects projects={userProfile?.projects??[]}  />
                          </div>
                          }
                     </div>
               </div>
     </div>
   )  
  return (
    <div className="w-full  bg-shardeumWhite font-helvetica-neue  h-full flex justify-between align-middle">
      <Toaster />
      <Suspense
        fallback={
          <div className="w-screen bg-[#FCFAEF] h-screen items-center flex justify-center align-middle">
            <img src={logo} />
          </div>
        }
      >
        <div className="bg-shardeumBlue mb-10 px-14 lg:w-[25%] h-[100vh]   left-0 rounded-br-xl  flex flex-col align-middle items-center">
          <div className="text-white mt-20">
            <img
              className="rounded-[50%] w-[160px] h-[160px] border-4 border-black object-cover"
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${loggedInUserData?.username}`}
              alt="user avatar"
            />
            {isEditing === false && <p className="text-center text-[22px] font-[700] mt-2 ">{formData.name}</p>}
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
                    className="bg-shardeumWhite text-shardeumBlue font-helvetica-neue border-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] border-slate-800 text-gray-900 text-sm rounded-[9px] transition-all focus:rounded-[15px] block w-full p-2.5 focus:ring-none focus:border-black"
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
                    className="bg-shardeumWhite text-shardeumBlue font-helvetica-neue border-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] border-slate-800 text-gray-900 text-sm rounded-[9px] transition-all focus:rounded-[15px] block w-full p-2.5 focus:ring-none focus:border-black"
                    placeholder="Email"
                    required
                    readOnly={loggedInUserData.isVerified}
                  />
                </div>
                <div className="mb-6">
                  <Listbox
                    className=""
                    value={formData.designation}
                    onChange={(value) => handleChange({ target: { name: "designation", value } })}
                  >
                    <div className="relative mt-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] rounded-[9px]">
                      <Listbox.Button className="relative w-full flex-row cursor-default  rounded-lg bg-gray-50 py-2 text-left border-2 border-black text-sm shadow-md focus:outline-none text-shardeumBlue bg-white">
                        <div className="px-2 flex justify-between align-middle h-full w-full ">
                          <span className="block truncate">{formData.designation || "Web3 Beginner"}</span>

                          <FontAwesomeIcon icon={faCaretSquareDown} color="black" />
                        </div>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 ">
                          {[
                            "Web3 Beginner",
                            "Web3 Intermediate",
                            "Web3 Advanced",
                            "Designer",
                            "Product Manager",
                            "Others",
                          ].map((designation, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-shardeumGreen text-white" : "text-gray-900"
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
                <div className="w-full  justify-center align-middle flex">
                  <button
                    type="submit"
                    className={`bg-shardeumGreen border-2 mt-5 border-black hover:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] transition-all  rounded-[8px] hover:rounded-[15px] hover:scale-105 ease-in-out items-center font-semibold text-center text-white text-[22px] w-[200px] h-[40px]`}
                  >
                    <span className="font-helvetica-neue text-shardeumBlue">Submit</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className={`w-full mt-6 flex flex-col h-[50%] justify-start gap-16 align-middle items-center`}>
              <div className="flex gap-4 flex-col">
                <ProfileLinks img={mailSVG} title={formData.email} />
                <ProfileLinks img={workSVG} title={formData.designation} />
              </div>
              <div className="w-[100%] justify-center align-middle flex">
                <ProfileButton onClick={() => setisEditing(true)} text={"Edit Profile"} />
              </div>
            </div>
          )}
        </div>

        <div
          className="lg:w-[70%] h-auto flex justify-center
       align-middle"
        >
          <div className="content  w-[full] mx-20">
            <div className="mb-14">
              <div className="mt-10 relative">
                {!formData.isVerified && loggedInUserData.email !== "default" && (
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
                        <span style={{ color: "orange", fontWeight: "bold" }}>Email</span> not yet verified. Please
                        verify to proceed.
                      </div>
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

              <p className="font-helvetica-neue-bold text-[56px] items-start mt-10 ">Welcome, {formData.name}</p>

              <span className="font-helvetica-neue-roman text-[18px] font-[500]">
                What a wonderful day it is to explore new knowledge. Today brims with possibilities and fresh knowledge
                waiting to be discovered. Let's jump right into learning!
              </span>
            </div>
            <ProfileCourses userData={userData} loggedInUserData={loggedInUserData} />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Profile;
