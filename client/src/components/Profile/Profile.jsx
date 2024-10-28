import React, { useState, useEffect, useContext, } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast, { Toaster } from "react-hot-toast";
import { ParentContext } from "../../contexts/ParentContext";
import { getUserData, getUserContestDetails } from "../../utils/api/UserAPI";
import ProfileBadge from "./ProfileBadge";
import { JOB, MAIL, PORTFOLIO, LEVEL, TWITTER_PNG as TWITTER, GITHUB_PNG as GITHUB, YOUTUBE, LINKEDIN, DISCORD_PNG as DISCORD, LEADERBOARD_TRIANGLE as TRIANGLE_IMG, FLASH, PARTICIPATION, STAR_SVG as STAR, BADGES, PRIZE } from "../../Constants/Assets";
import editImg from "../../assets/CTA.png"
import { Link } from "react-router-dom";
import ProfileProjects from "./ProfileProjects";
import ShareButton from "../button/shareButton";
import ProfileCourses from "./ProfileCourses"
import NOICE_BG from "../../assets/noice.svg";
import AVATAR_BG from '../../assets/avatar_bg.png'
import BATCH_LINE from '../../assets/badge_line.png'
import BATCH_XP from '../../assets/new_badge_1.png'
import BATCH_PARTICIPATION from '../../assets/new_badge_2.png'
import BATCH_CONTESTS_WON from '../../assets/new_badge_3.png'
import BATCH_PRIZE_EARNED from '../../assets/new_badge_4.png'
import BATCH_BADGES from '../../assets/new_badge_5.png'
import profile_bg from '../../assets/profile-bg.svg'
import profile_bg_2 from '../../assets/profile-bg-2.svg'
import noise from "../../assets/image-41.png"
import { RxDividerVertical } from "react-icons/rx";
import { BsSendFill } from "react-icons/bs";

const Profile = ({ isOpen, closeModal }) => {
  const { shardId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userContestData, setUserContestData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "Web3 Beginner",
  });
  const { loggedInUserData } = useContext(ParentContext);

  const copyToClipboard = () => {

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success("Profile copied to clipboard");
      }).catch(err => {
        alert('Failed to copy URL');
        toast.error('Error copying profile ');
      })
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href

      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";

      document.body.prepend(textArea);
      textArea.select();

      try {
        document.execCommand('copy');
        toast.success("Profile copied to clipboard");
      } catch (error) {
        toast.error('Error copying profile ');
        console.error(error);
      } finally {
        textArea.remove();
      }
    }
  };

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

        if (response?.data?.email === "default") {
          setFormData({ ...formData, name: "", email: "" });
        } else {
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
  useEffect(() => {
    const getUserProfileData = async () => {
      getUserData(shardId).then((response) => {
        if (response.error === false) {
          if (response?.data != null)
            setUserProfile(response?.data);
        }
      })
    }
    const getUserContestData = async () => {
      try {
        if (shardId)
          getUserContestDetails(shardId).then((resp) => {
            if (resp?.error === false) {
              setUserContestData(resp.data);
            }
          })
      } catch (error) {
        console.log("Error in fetching profile user data & contest->", error.message)
      }
    }
    if (shardId) {
      getUserProfileData();
      getUserContestData();
    }
  }, [shardId])



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
      <Toaster />
      <div className="bg-dark min-h-[50px] md:min-h-[120px] overflow-hidden relative profile_header">
        {/* <img alt="trail" src={TRIANGLE_IMG} className="absolute right-10" /> */}

      </div>
      <div className="grid grid-cols-8 min-h-screen px-2 md:px-10 gap-4 overflow-x-hidden">
        {/* noise overlay */}
        {/* <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,320px)] grid-rows-[repeat(auto-fill,360px)]  overflow-hidden">
          {[...Array(100)].map((_, index) => (
            <img 
              key={index}
              src={noise} 
              alt="Noise overlay" 
              className="w-[320px] h-[360px] object-cover opacity-30 mix-blend-overlay "
            />
          ))}
        </div> */}
        {/* vertical blur */}

        <div className="absolute -top-[24%] -left-[2%] w-full h-[850px] overflow-x-hidden  blur-[40px] opacity-70">
          <img src={profile_bg} className="w-full h-full border border-white" />

        </div>
        {/* noise overlay */}
        {/* <div className="absolute top-0 left-0 w-full h-full flex flex-wrap border border-white">
          <img src={noise} className="w-[320px] h-[360px] opacity-90 mix-blend-overlay border border-white" />
          <img src={noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay border border-white" />
          <img src={noise} className="w-[320px] h-[360px] opacity-90 mix-blend-overlay border border-white" />
          <img src={noise} className="w-[320px] h-[360px] opacity-90 mix-blend-overlay border border-white" />
          <img src={noise} className="w-[320px] h-[360px] opacity-90 mix-blend-overlay border border-white" />
        </div> */}
        {/* horizontal blur */}
        <div className="absolute top-8 left-0 w-full h-full flex overflow-x-hidden">

          <img src={noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay " />
          <img src={noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay " />
          <img src={noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay " />
          <img src={noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay " />
          <img src={noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay " />
          <div className="absolute -top-[50%] -right-[20%] w-full h-[850px] border border-white rotate-45 blur-[40px] opacity-70">
            <img src={profile_bg_2} className="w-full h-full " />
          </div>
        </div>
        <div className="col-span-8 w-full  lg:col-span-2 bg-[#121212] relative border-[0.1px] border-[#5D89FF] rounded-lg">
          {/* <div className="absolute top-0 left-0 right-0 flex justify-center">
            <div className="relative top-[-100px]">
              <LazyLoadImage
                src={userProfile?.image ?? 'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'}
                className="rounded-[50%] object-cover object-center w-[200px] h-[200px] border-4 border-shardeumPurple"
              />
            </div>
          </div> */}
          {/* avatar blur */}
          <div className="absolute size-[226px] bg-[#3A59FE80] rounded-full top-[10%] left-1/2 -translate-x-1/2 blur-[100px] z-0">

          </div>
          <div className="avatar-bg-background relative z-10">
            <img src={AVATAR_BG} className="w-full rounded-lg" />
            <div className="absolute -bottom-10 left-[35%]">
              <LazyLoadImage
                src={userProfile?.image ?? 'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'}
                className="rounded-md object-cover object-center w-[100px] h-[100px] border-[0.1px] border-[#5D89FF]"
              />
            </div>
          </div>
          <div className="px-4 z-20">
            <div className="mt-10 flex justify-center ">
              <p className="relative  w-fit mt-[-1.00px] 
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text text-wrap font-montserrat-bold text-transparent text-[24px] tracking-[0] leading-[50px] whitespace-nowrap">{userProfile?.username}</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-0">
              {userProfile?.experience && (
                <p className="relative text-[14px] tracking-[0] leading-7 font-gilroy text-[#B7C2FD]">
                  {userProfile?.experience} Level
                </p>
              )}

              {userProfile?.experience && userProfile?.designation && (
                <RxDividerVertical className="text-darkslategray-100" />
              )}

              {userProfile?.designation && (
                <p className="relative text-[14px] tracking-[0] leading-7 font-gilroy text-[#B7C2FD]">
                  {userProfile?.designation}
                </p>
              )}
            </div>
            {
              userProfile?.portfolio &&
              <div className="text-center">
                <a href={userProfile?.portfolio} target="_blank" className="relative text-[12px] underline tracking-[0] leading-7 font-gilroy text-[#B7C2FD]s">{userProfile?.portfolio}</a>
              </div>
            }
            {
              userProfile != null && (loggedInUserData?._id == userProfile?._id) &&
              <div className="flex flex-col justify-center md:flex-row gap-4 my-10">
                <button
                  className={`flex-1 bg-gradient-to-b from-[#3A59FE] to-[#5d89ff] rounded-md  flex justify-center  px-6 py-1   items-center align-middlerelative self-stretch tracking-[0] leading-7 font-gilroybold  text-white text-sm`}
                >
                  <Link to={'/profile/edit'}>
                    Edit Profile
                  </Link>
                </button>
                <button
                  className={`flex-1 bg-black border-[0.1px] border-[#5D89FF]  rounded-md  flex justify-center  px-8 py-1   items-center align-middlerelative self-stretch tracking-[0] leading-7 font-gilroybold  text-white text-sm`}
                >
                  Share Profile
                </button>
              </div>
            }
            <div className="">
              <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-0 text-[12px]">
                {userProfile?.description}
              </p>
            </div>
            {
              userProfile != null && (loggedInUserData?._id != userProfile?._id) &&
              <div className="py-4">
                <button
                  className={`w-full bg-gradient-to-b from-[#3A59FE] to-[#5d89ff] rounded-md  flex flex-row justify-center  px-6 py-2   items-center align-middlerelative self-stretch tracking-[0] leading-7 font-gilroybold  text-white text-sm`}
                >
                  <div className="flex-1 text-left">
                    <p className="text-[17px]">Share Profile</p>
                  </div>
                  <div className="bg-black h-8 w-8 flex justify-center items-center p-1 rounded-sm">
                    <BsSendFill className="text-white text-xl" />
                  </div>
                </button>
              </div>
            }
            <div className="flex justify-center items-center py-5">
              <div className="flex gap-5  mt-2">
                {
                  userProfile?.twitter &&
                  <a target="_blank" href={'https://x.com/' + userProfile?.twitter ?? '#'} rel="noreferrer">
                    <img src={TWITTER} />
                  </a>
                }
                {
                  userProfile?.github &&
                  <a target="_blank" href={'https://github.com/' + userProfile?.github ?? '#'} rel="noreferrer">
                    <img src={GITHUB} />
                  </a>
                }
                {
                  userProfile?.linkedIn &&
                  <a target="_blank" href={'https://linkedin.com/in/' + userProfile?.linkedIn ?? '#'} rel="noreferrer">
                    <img src={LINKEDIN} />
                  </a>
                }
                {
                  userProfile?.youtube &&
                  <a target="_blank" href={'https://youtube.com/' + userProfile?.youtube ?? '#'} rel="noreferrer">
                    <img src={YOUTUBE} />
                  </a>
                }
                {
                  userProfile?.discord &&
                  <a target="_blank" href={'https://discord.com/' + userProfile?.discord ?? '#'} rel="noreferrer">
                    <img src={DISCORD} />
                  </a>
                }
              </div>
            </div>
          </div>
          {/* <div className="name mt-[150px] px-16">
            <p className='my-2 text-[24px] text-left leading-tight text-white text-overflow-ellipsis font-helvetica-neue-bold'>{userProfile?.username}</p>

            <div className="flex flex-col">
              {
                userProfile?.designation &&
                <div className="flex gap-2">
                  <img src={JOB} />
                  <p className="my-2 text-[16px] text-left leading-[28px] text-white text-overflow-ellipsis font-[500]">{userProfile?.designation}</p>
                </div>
              }
              {
                userProfile?.email &&
                <div className="flex gap-2">
                  <img src={MAIL} />
                  <p className="my-2 text-[16px] text-left leading-[28px] text-white text-overflow-ellipsis font-[500]">{userProfile?.email}</p>
                </div>
              }
              {
                userProfile?.portfolio &&
                <div className="flex gap-2">
                  <img src={PORTFOLIO} />
                  <p className="my-2 text-[16px] text-left leading-[28px] text-white text-overflow-ellipsis font-[500]">{userProfile?.portfolio}</p>
                </div>
              }
              {
                userProfile?.experience &&
                <div className="flex gap-2">
                  <img src={LEVEL} />
                  <p className="my-2 text-[16px] text-left leading-[28px] text-white text-overflow-ellipsis font-[500]">{userProfile?.experience}</p>
                </div>
              }
              <div className="flex gap-5  mt-2">
                {
                  userProfile?.twitter &&
                  <a target="_blank" href={'https://x.com/' + userProfile?.twitter ?? '#'} rel="noreferrer">
                    <img src={TWITTER} />
                  </a>
                }
                {
                  userProfile?.github &&
                  <a target="_blank" href={'https://github.com/' + userProfile?.github ?? '#'} rel="noreferrer">
                    <img src={GITHUB} />
                  </a>
                }
                {
                  userProfile?.linkedIn &&
                  <a target="_blank" href={'https://linkedin.com/in/' + userProfile?.linkedIn ?? '#'} rel="noreferrer">
                    <img src={LINKEDIN} />
                  </a>
                }
                {
                  userProfile?.youtube &&
                  <a target="_blank" href={'https://youtube.com/' + userProfile?.youtube ?? '#'} rel="noreferrer">
                    <img src={YOUTUBE} />
                  </a>
                }
                {
                  userProfile?.discord &&
                  <a target="_blank" href={'https://discord.com/' + userProfile?.discord ?? '#'} rel="noreferrer">
                    <img src={DISCORD} />
                  </a>
                }
              </div>
              {
                // userProfile != null && (loggedInUserData?._id == userProfile?._id) &&
                // <div className="mt-10 absolute top-[-1.5rem] right-[1rem]">
                //   <Link to={'/profile/edit'}>

                //     <LazyLoadImage src={editImg} />
                //   </Link>
                // </div>
              }
              <div className="mt-10">
                <ShareButton text={"Share Profile"} isHoveredReq={true} onClick={copyToClipboard} />
              </div>
              <div className="mt-10">
                <p className="font-[500] text-[12px] text-white tracking-[2px]">ABOUT ME</p>
                <p className=' text-[16px] font-[400] text-left leading-[28px] text-white text-overflow-ellipsis'>
                  {userProfile?.description}
                </p>
              </div>

            </div>
          </div> */}

        </div>
        <div className="col-span-8 lg:col-span-6">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-5">
            <div className="border-[0.1px] border-[#5D89FF] flex flex-col rounded-md">
              <div className="py-3">
                <p className="text-center relative self-stretch  text-[14px] tracking-[0] leading-7 font-gilroy text-white uppercase">XP POINTS</p>
              </div>
              <img src={BATCH_LINE} />
              <div className="flex flex-row justify-center py-4">
                <img src={BATCH_XP} />
                <p className="font-montserrat-semibold  text-neutral-50 text-xl text-center leading-[30px] whitespace-nowrap">{userContestData?.XPEarned ?? '-'}</p>
              </div>
            </div>
            <div className="border-[0.1px] border-[#5D89FF] flex flex-col rounded-md">
              <div className="py-3">
                  <p className="text-center relative self-stretch  text-[14px] tracking-[0] leading-7 font-gilroy text-white uppercase">PARTICIPATED</p>
              </div>
              <img src={BATCH_LINE} />
              <div className="flex flex-row justify-center py-4">
                <img src={BATCH_PARTICIPATION} />
                <p className="font-montserrat-semibold  text-neutral-50 text-xl text-center leading-[30px] whitespace-nowrap">{userContestData?.contestParticipated ?? '-'}</p>
              </div>
            </div>
            <div className="border-[0.1px] border-[#5D89FF] flex flex-col rounded-md">
              <div className="py-3">
                    <p className="text-center relative self-stretch  text-[14px] tracking-[0] leading-7 font-gilroy text-white uppercase">CONTESTS WON</p>
              </div>
              <img src={BATCH_LINE} />
              <div className="flex flex-row justify-center py-4">
                <img src={BATCH_CONTESTS_WON} />
                <p className="font-montserrat-semibold  text-neutral-50 text-xl text-center leading-[30px] whitespace-nowrap">{userContestData?.contestWon ?? '-'}</p>
              </div>
            </div>
            <div className="border-[0.1px] border-[#5D89FF] flex flex-col rounded-md">
              <div className="py-3">
                <p className="text-center relative self-stretch  text-[14px] tracking-[0] leading-7 font-gilroy text-white uppercase">Prize Earned</p>
              </div>
              <img src={BATCH_LINE} />
              <div className="flex flex-row justify-center py-4">
                <img src={BATCH_PRIZE_EARNED} />
                <p className="font-montserrat-semibold  text-neutral-50 text-xl text-center leading-[30px] whitespace-nowrap">{userContestData?.AmountEarned ?? '-'}</p>
              </div>
            </div>
            <div className="border-[0.1px] border-[#5D89FF] flex flex-col rounded-md">
              <div className="py-3">
                <p className="text-center relative self-stretch  text-[14px] tracking-[0] leading-7 font-gilroy text-white uppercase">Badges</p>
              </div>
              <img src={BATCH_LINE} />
              <div className="flex flex-row justify-center py-4">
                <img src={BATCH_BADGES} />
                <p className="font-montserrat-semibold  text-neutral-50 text-xl text-center leading-[30px] whitespace-nowrap">{(userContestData?.contestWon > 0 && userContestData?.contestParticipated > 10) ? '2' : userContestData?.contestWon > 0 ? '1' : '-'}</p>
              </div>
            </div>
          </div>

          {
            loggedInUserData?.shardId == userProfile?.shardId && loggedInUserData?.email != "default" && loggedInUserData?.isVerified == false &&
            <div className="py-2 px-2 pt-5 text-white">
              <p>Email not yet  verified. Please <span className="text-blue-500 cursor-pointer" onClick={handleResendVerificationEmail}> click </span>to verify it.</p>
            </div>
          }
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-[#121212] rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full flex opacity-40 mix-blend-overlay">
                <img src={noise} className="w-1/2 h-full " />
                <img src={noise} className="w-1/2 h-full " />
              </div>
              <div className="absolute size-[226px] bg-[#3A59FE80] rounded-full -top-[50%] -right-[25%] blur-[100px] z-0 ">
              </div>
              <div>

              </div>
              <div className="p-6">
                {userContestData != null && userProfile != null &&
                  <ProfileBadge data={userContestData} courseData={userProfile} />
                }
              </div>
            </div>
            <div className="flex-1 bg-[#121212] rounded-lg  relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full flex opacity-40 mix-blend-overlay">
                <img src={noise} className="w-1/2 h-full " />
                <img src={noise} className="w-1/2 h-full " />
              </div>
              <div className="absolute size-[226px] bg-[#3A59FE80] rounded-full -top-[50%] -right-[25%] blur-[100px] z-0 ">

              </div>
              {
                <div className="p-6">
                  <ProfileProjects projects={userProfile?.projects ?? []} />
                </div>
              }
            </div>
          </div>
          {/* {userContestData != null && userProfile != null &&
            <div className="py-2 px-2 lg:px-10">
              <ProfileBadge data={userContestData} courseData={userProfile} />
            </div>
          } */}
          <div className="p-2 ">
            <div className="py-5">
              {
                userProfile != null &&
                <ProfileCourses userData={userProfile} loggedInUserData={loggedInUserData} />
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )

};

export default Profile;

// return (
//   <div className="w-full  bg-shardeumWhite font-helvetica-neue  h-full flex justify-between align-middle">
//     <Toaster />
//     <Suspense
//       fallback={
//         <div className="w-screen bg-[#FCFAEF] h-screen items-center flex justify-center align-middle">
//           <img src={logo} />
//         </div>
//       }
//     >
//       <div className="bg-shardeumBlue mb-10 px-14 lg:w-[25%] h-[100vh]   left-0 rounded-br-xl  flex flex-col align-middle items-center">
//         <div className="text-white mt-20">
//           <img
//             className="rounded-[50%] w-[160px] h-[160px] border-4 border-black object-cover"
//             src={`https://api.dicebear.com/7.x/notionists/svg?seed=${loggedInUserData?.username}`}
//             alt="user avatar"
//           />
//           {isEditing === false && <p className="text-center text-[22px] font-[700] mt-2 ">{formData.name}</p>}
//         </div>
//         {isEditing ? (
//           <div className="w-full mt-8">
//             <form onSubmit={handleSubmit}>
//               <div className="mb-6 w-full">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="bg-shardeumWhite text-shardeumBlue font-helvetica-neue border-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] border-slate-800 text-gray-900 text-sm rounded-[9px] transition-all focus:rounded-[15px] block w-full p-2.5 focus:ring-none focus:border-black"
//                   placeholder="What should we call you"
//                   required
//                 />
//               </div>
//               <div className="mb-6">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="bg-shardeumWhite text-shardeumBlue font-helvetica-neue border-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] border-slate-800 text-gray-900 text-sm rounded-[9px] transition-all focus:rounded-[15px] block w-full p-2.5 focus:ring-none focus:border-black"
//                   placeholder="Email"
//                   required
//                   readOnly={loggedInUserData.isVerified}
//                 />
//               </div>
//               <div className="mb-6">
//                 <Listbox
//                   className=""
//                   value={formData.designation}
//                   onChange={(value) => handleChange({ target: { name: "designation", value } })}
//                 >
//                   <div className="relative mt-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] rounded-[9px]">
//                     <Listbox.Button className="relative w-full flex-row cursor-default  rounded-lg bg-gray-50 py-2 text-left border-2 border-black text-sm shadow-md focus:outline-none text-shardeumBlue bg-white">
//                       <div className="py-2 px-2 flex justify-between align-middle h-full w-full ">
//                         <span className="block truncate">{formData.designation || "Web3 Beginner"}</span>

//                         <FontAwesomeIcon icon={faCaretSquareDown} color="black" />
//                       </div>
//                     </Listbox.Button>
//                     <Transition
//                       as={Fragment}
//                       leave="transition ease-in duration-100"
//                       leaveFrom="opacity-100"
//                       leaveTo="opacity-0"
//                     >
//                       <Listbox.Options className="relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 ">
//                         {[
//                           "Web3 Beginner",
//                           "Web3 Intermediate",
//                           "Web3 Advanced",
//                           "Designer",
//                           "Product Manager",
//                           "Others",
//                         ].map((designation, index) => (
//                           <Listbox.Option
//                             key={index}
//                             className={({ active }) =>
//                               `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-shardeumGreen text-white" : "text-gray-900"
//                               }`
//                             }
//                             value={designation}
//                           >
//                             {({ selected }) => (
//                               <>
//                                 <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
//                                   {designation}
//                                 </span>
//                                 {selected && (
//                                   <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-shardeumBlue">
//                                     <FontAwesomeIcon icon={faHandPointRight} />
//                                   </span>
//                                 )}
//                               </>
//                             )}
//                           </Listbox.Option>
//                         ))}
//                       </Listbox.Options>
//                     </Transition>
//                   </div>
//                 </Listbox>
//               </div>
//               <div className="w-full  justify-center align-middle flex">
//                 <button
//                   type="submit"
//                   className={`bg-shardeumGreen border-2 mt-5 border-black hover:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] transition-all  rounded-[8px] hover:rounded-[15px] hover:scale-105 ease-in-out items-center font-semibold text-center text-white text-[22px] w-[200px] h-[40px]`}
//                 >
//                   <span className="font-helvetica-neue text-shardeumBlue">Submit</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         ) : (
//           <div className={`w-full mt-6 flex flex-col h-[50%] justify-start gap-16 align-middle items-center`}>
//             <div className="flex gap-4 flex-col">
//               <ProfileLinks img={mailSVG} title={formData.email} />
//               <ProfileLinks img={workSVG} title={formData.designation} />
//             </div>
//             <div className="w-[100%] justify-center align-middle flex">
//               <ProfileButton onClick={() => setisEditing(true)} text={"Edit Profile"} />
//             </div>
//           </div>
//         )}
//       </div>

//       <div
//         className="lg:w-[70%] h-auto flex justify-center
//      align-middle"
//       >
//         <div className="content  w-[full] mx-20">
//           <div className="mb-14">
//             <div className="mt-10 relative">
//               {!formData.isVerified && loggedInUserData.email !== "default" && (
//                 <div
//                   className="strip-bar"
//                   style={{
//                     background: "linear-gradient(90deg, #0052CC, #FF6D34)",
//                     padding: "10px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     color: "white",
//                     borderRadius: "10px",
//                   }}
//                 >
//                   <div className="strip-content flex flex-col items-center">
//                     <div className="text-center text-white font-[500] text-[16px]">
//                       <span style={{ color: "orange", fontWeight: "bold" }}>Email</span> not yet verified. Please
//                       verify to proceed.
//                     </div>
//                   </div>
//                   <button
//                     onClick={handleResendVerificationEmail}
//                     className="strip-button bg-shardeumOrange mt-2 flex justify-evenly align-middle hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[18px] w-[110px] h-[30px]"
//                   >
//                     <FontAwesomeIcon icon={faRepeat} /> resend <span></span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             <p className="font-helvetica-neue-bold text-[56px] items-start mt-10 ">Welcome, {formData.name}</p>

//             <span className="font-helvetica-neue-roman text-[18px] font-[500]">
//               What a wonderful day it is to explore new knowledge. Today brims with possibilities and fresh knowledge
//               waiting to be discovered. Let's jump right into learning!
//             </span>
//           </div>
//           <ProfileCourses userData={userData} loggedInUserData={loggedInUserData} />
//         </div>
//       </div>
//     </Suspense>
//   </div>
// );