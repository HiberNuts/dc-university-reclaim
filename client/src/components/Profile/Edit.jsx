import { LazyLoadImage } from "react-lazy-load-image-component";
import toast, { Toaster } from "react-hot-toast";
import GreenButton from "../button/GreenButton";
import {
  IMG_UPLOAD,
  REMOVE,
  TWITTER_PNG as TWITTER,
  GITHUB_PNG as GITHUB,
  YOUTUBE,
  LINKEDIN,
  DISCORD_PNG as DISCORD,
  DRAWER as HAMBURGER,
  PREVIEW,
} from "../../Constants/Assets";
import { useContext, useState } from "react";
import { ParentContext } from "../../contexts/ParentContext";
import axios from "axios";
import { useEffect, useRef } from "react";
import DCButton from "../button/DCButton";
import Noise from "../../assets/image-41.png"
import profile_bg from '../../assets/profile-bg.svg'
import { FaXmark } from "react-icons/fa6";

import profile_bg_2 from '../../assets/profile-bg-2.svg'

const EditProfile = () => {
  const [img, setImg] = useState(null);
  const { loggedInUserData, setloggedInUserData } = useContext(ParentContext);
  const [showError, setShowError] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectValues, setProjectValues] = useState({
    title: "",
    URL: "",
    description: "",
  });
  const addProjectHandler = () => {
    if (
      !projectValues.title.trim() ||
      !projectValues.URL.trim() ||
      !projectValues.description.trim()
    ) {
      toast.error("please fill all the fields");
      return;
    }
    setProjects((prev) => {
      if (!prev.length) return [{ id: 1, ...projectValues }];
      else
        return [
          ...prev,
          { id: prev[prev.length - 1].id + 1, ...projectValues },
        ];
    });
    setProjectValues({ title: "", URL: "", description: "" });
  };
  useEffect(() => {
    if (loggedInUserData?.projects) {
      setProjects(loggedInUserData.projects);
    }
  }, [loggedInUserData]);
  const projectChangeHandler = (event) => {
    setProjectValues((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

  const projectRemoveHandler = (id) => {
    setProjects((prev) => prev.filter((project) => project.id != id));
  };

  const [data, setData] = useState({
    shardId: "",
    username: "",
    description: "",
    portfolio: "",
    experience: "",
    email: "",
    occupation: "",
    twitter: "",
    linkedIn: "",
    youtube: "",
    github: "",
    discord: "",
  });

  const [errors, setErrors] = useState({
    shardId: "",
    email: "",
    portfolio: "",
  });
  const errorRef = useRef();
  const [preview, setPreview] = useState(PREVIEW);

  useEffect(() => {
    if (loggedInUserData.image) setPreview(loggedInUserData.image);
  }, [loggedInUserData]);

  const changehandler = (event) => {
    const { id, value } = event.target;
    let errorMsg = "";

    switch (id) {
      case "shardId":
        if (/\s/.test(value)) {
          errorMsg = "Shard ID should not contain spaces";
        } else if (/^\d+$/.test(value)) {
          errorMsg = "Shard ID should not be composed entirely of numbers";
        } else if (value.length > 10) {
          errorMsg = "Shard ID should not contain more than 10 characters";
        } else {
          errorMsg = "";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMsg = "Invalid email address";
        } else if (value.length > 50) {
          errorMsg = "Email should not have more than 50 characters";
        } else errorMsg = "";
        break;
      case "portfolio":
        const urlRegex = /^https?:\/\/.+/;
        if (!urlRegex.test(value)) {
          errorMsg = "URL should start with http:// or https://";
        } else errorMsg = "";
        break;

      case "description":
        if (value.length > 100) {
          errorMsg = "Description should not contain more that 100 characters.";
        }
        break;
      case "username":
        if (value.length > 25) {
          errorMsg = "Name should not contain more than 25 characters";
        }
        break;
      default:
        break;
    }
    if (errorMsg != "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: errorMsg,
      }));
      setShowError(true);
    } else {
      setErrors({ shardId: "", email: "", portfolio: "" });
      setShowError(false);
      setData((prev) => {
        return { ...prev, [event.target.id]: event.target.value };
      });
    }
  };

  const profileImageChangeHandler = (event) => {
    const fileType = event.target.files[0].type.split("/")[1];
    if (fileType !== "jpeg" && fileType !== "png") {
      toast.error("Only .jpeg and .png image files are accepted");
      return;
    }
    setImg(event.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const saveHandler = async () => {
    if (showError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (data?.shardId.length < 5) {
      toast.error("Shard ID must be have atleast 5 characters!!");
      return;
    }
    if (data?.email == "default") {
      toast.error("Please enter valid email to continue!");
      return;
    }
    let url;
    const notNullEntries = Object.entries(data).filter(
      (entry) =>
        entry[1].trim() && loggedInUserData[entry[0]] != entry[1].trim()
    );

    if (
      !notNullEntries.length &&
      !img &&
      (!projects.length ||
        JSON.stringify(projects) == JSON.stringify(loggedInUserData.projects))
    ) {
      toast.error("No changes to save");
      return;
    }

    const filteredData = notNullEntries.reduce((acc, curr) => {
      return { ...acc, [curr[0]]: curr[1] };
    }, {});
    if (img) {
      const formData = new FormData();
      formData.append("files", img);
      const res = await fetch(
        `${import.meta.env.VITE_CMS_URL}/upload?populate=*`,
        {
          method: "POST",
          body: formData,
          redirect: "follow",
        }
      )
        .then((res) => res.json())
        .catch((error) => console.error(error));
      url = res[0].url;
      if (loggedInUserData.image) {
        const userImageKey = loggedInUserData.image.substring(
          loggedInUserData.image.lastIndexOf("/") + 1
        );
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/deleteImage`, {
          key: userImageKey,
        });
      }
    }

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/updateuser`,
        url
          ? { ...filteredData, image: url, id: loggedInUserData._id, projects }
          : { ...filteredData, id: loggedInUserData._id, projects },
        {
          headers: {
            Authorization: `Bearer ${loggedInUserData.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          toast.error("This Shard ID is already in use");
        } else {
          setloggedInUserData({
            ...res.data.user,
            accessToken: loggedInUserData.accessToken,
          });
          setShowError(false);
          toast.success("profile updated");
          localStorage.setItem('userSession', JSON.stringify({
            address: loggedInUserData.walletAddress,
            userData: {
              ...res.data.user,
              accessToken: loggedInUserData.accessToken
            },
            timestamp: Date.now()
          }));
        }
      });
  };
  useEffect(() => {
    if (loggedInUserData._id) {
      setData((prevData) => ({
        ...prevData,
        shardId: loggedInUserData?.shardId,
        email: loggedInUserData?.email,
      }));
    }
  }, [loggedInUserData]);
  return (
    <div className="py-[60px] px-5 md:px-[100px] bg-black relative">
      <Toaster />
      <div className="absolute -top-[24%] -left-[2%] w-full h-[850px] overflow-x-hidden  blur-[40px] opacity-70">
        <img src={profile_bg} className="w-full h-full border border-white" />

      </div>
      {/* horizontal blur */}
      <div className="absolute top-8 left-0 w-full h-full flex overflow-x-hidden">

        <img src={Noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay " />
        <img src={Noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay " />
        <img src={Noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay " />
        <img src={Noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay " />
        <img src={Noise} className="w-[320px] h-[360px] opacity-30 mix-blend-overlay " />
        <div className="absolute -top-[50%] -right-[20%] w-full h-[850px] border border-white rotate-45 blur-[40px] opacity-70">
          <img src={profile_bg_2} className="w-full h-full " />
        </div>
      </div>
      <div className="heading pb-10 border-b-[1px] border-[#797979] flex ">
        <div className="flex-1 text-left">
          <p className="text-[48px] md:text-[60px] leading-tight text-overflow-ellipsis bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-montserrat-bold text-transparent">
            Edit Profile
          </p>
        </div>
        {/* <div className="flex-1 float-right flex justify-end items-center">
          <GreenButton
            onClick={saveHandler}
            text={"Save Changes"}
            isHoveredReq={true}
          />
        </div> */}
      </div>
      <div className="edit_section grid grid-cols-1 space-y-5 md:space-y-0  md:grid-cols-5 py-8  md:py-14">
        <div className="col-span-1">
          <div className="flex flex-col space-y-7 justify-center items-center">
            <LazyLoadImage
              src={preview}
              className="rounded-[20px] object-cover object-center w-[200px] h-[200px] border-[1px] border-[#797979]"
            />
            <label
              for="files"
              className="text-shardeumBlue bg-black cursor-pointer border-[1px] border-shardeumBlue rounded-[10px] py-[8px] px-[20px] flex space-x-3 max-w-full "
            >
              <div className="mt-[2px]">
                <span className="font-gilroybold text-white">Change Avatar</span>
              </div>
              <div className="py-1">
                <img src={IMG_UPLOAD} />
              </div>
            </label>
            <input
              className="hidden"
              id="files"
              type="file"
              onChange={profileImageChangeHandler}
            />
            {/* save button */}
            <div className="w-full flex justify-center">
              <DCButton onClick={saveHandler} btnContent={"Save Changes"} />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="box-1 relative bg-black rounded-3xl border-[1px] border-[#5D89FF80] p-2 md:p-10 overflow-hidden">
            <div className="absolute -top-[20%] -left-[10%] size-[226px] bg-[#3A59FE]/50 rounded-full blur-[100px] "></div>
            <div className="absolute inset-0 w-full h-full flex flex-wrap opacity-20 z-0 mix-blend-overlay">
              <img src={Noise} alt="bg" className="w-1/2 h-1/2 object-cover" />
              <img src={Noise} alt="bg" className="w-1/2 h-1/2 object-cover" />
              <img src={Noise} alt="bg" className="w-1/2 h-1/2 object-cover" />
              <img src={Noise} alt="bg" className="w-1/2 h-1/2 object-cover" />
            </div>
            <div >
              <p className="my-2 text-[32px] leading-tight text-overflow-ellipsis bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-montserrat-bold text-transparent border-b-[1px] pb-5">
                Basic Information
              </p>
              <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 ">
                <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                  <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                    Shard ID
                  </label>
                  <input
                    id="shardId"
                    defaultValue={loggedInUserData?.shardId ?? ""}
                    className={`p-[16px] z-50 rounded-[12px] border-[0.5px] text-[#797979] bg-[#141414] border-[#797979] placeholder:text-[#797979] ${loggedInUserData?.shardId && "cursor-not-allowed"
                      }`}
                    placeholder="Enter your username"
                    onChange={changehandler}
                    disabled={loggedInUserData?.shardId}
                  />
                  {showError && errors.shardId != "" && (
                    <p className="text-red-500 text-[12px]">
                      {errors?.shardId}
                    </p>
                  )}
                </div>
                <div
                  ref={errorRef}
                  className="col-span-1 md:col-span-1 flex flex-col space-y-4"
                >
                  <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                    Your Name
                  </label>
                  <input
                    className="p-[16px] z-50 rounded-[12px] border-[0.5px] text-[#797979] bg-[#141414] border-[#797979]"
                    placeholder="Enter your Name"
                    id="username"
                    defaultValue={loggedInUserData?.username ?? ""}
                    onChange={changehandler}
                  />
                  {showError && errors.username != "" && (
                    <p className="text-red-500 text-[12px]">
                      {errors?.username}
                    </p>
                  )}
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-col space-y-4">
                  <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                    Description
                  </label>
                  <input
                    className="p-[16px] z-50 rounded-[12px] border-[0.5px] h-[100px] text-[#797979] bg-[#141414] border-[#797979] placeholder:text-[#797979]"
                    placeholder="Enter your Introduction"
                    id="description"
                    defaultValue={loggedInUserData?.description ?? ""}
                    onChange={changehandler}
                  />
                  {showError && errors.description != "" && (
                    <p className="text-red-500 text-[12px]">
                      {errors?.description}
                    </p>
                  )}
                </div>
                <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                  <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                    Occupation
                  </label>
                  <select
                    className="p-[16px] z-50 rounded-[12px] border-[0.5px] text-[#797979] bg-[#141414] border-[#797979] placeholder:text-[#797979]"
                    id="occupation"
                    value={loggedInUserData?.occupation ?? ""}
                    onChange={changehandler}
                  >
                    <option disabled className="opacity-[50%] z-50">
                      Please Select
                    </option>
                    <option>Private</option>
                    <option>Government</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                  <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                    Work Experience
                  </label>
                  <select
                    className="p-[16px] z-50 rounded-[12px] border-[0.5px] text-[#797979] bg-[#141414] border-[#797979] placeholder:text-[#797979]"
                    id="experience"
                    value={loggedInUserData?.experience ?? ""}
                    onChange={changehandler}
                  >
                    <option disabled className="opacity-[50%] z-50">
                      Please Select
                    </option>
                    <option>Fresher</option>
                    <option>Less than 2 years</option>
                    <option>Less than 5 years</option>
                  </select>
                </div>
                {loggedInUserData?.email == "default" ? (
                  <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                    <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                      Email Address
                    </label>
                    <input
                      className="p-[16px] z-50 rounded-[12px] border-[0.5px] text-[#797979] bg-[#141414] border-[#797979] placeholder:text-[#797979]"
                      placeholder="Enter your email ID"
                      id="email"
                      type="email"
                      defaultValue={loggedInUserData?.email ?? ""}
                      onChange={changehandler}
                    />
                    {showError && errors.email != "" && (
                      <p className="text-red-500 text-[12px]">
                        {errors?.email}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                    <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                      Email Address
                    </label>
                    <input
                      className="p-[16px] z-50 rounded-[12px] border-[0.5px] text-[#797979] bg-[#141414] border-[#797979] placeholder:text-[#797979] cursor-not-allowed"
                      disabled
                      placeholder="Enter your email ID"
                      id="email"
                      defaultValue={loggedInUserData?.email ?? ""}
                      onChange={changehandler}
                    />
                    {showError && errors.email != "" && (
                      <p className="text-red-500 text-[12px]">
                        {errors?.email}
                      </p>
                    )}
                  </div>
                )}
                <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
                  <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                    Website URL
                  </label>
                  <input
                    className="p-[16px] z-50 rounded-[12px] border-[0.5px] text-[#797979] bg-[#141414] border-[#797979] placeholder:text-[#797979]"
                    placeholder="Enter your Website URL"
                    id="portfolio"
                    defaultValue={loggedInUserData?.portfolio ?? ""}
                    onChange={changehandler}
                  />
                  {showError && errors.portfolio != "" && (
                    <p className="text-red-500 text-[12px]">
                      {errors?.portfolio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 box-1 relative bg-black rounded-3xl border-[1px] border-[#5D89FF80] p-2 md:p-10 overflow-hidden">
            <div className="absolute -top-[40%] -left-[10%] size-[226px] bg-[#3A59FE]/50 rounded-full blur-[100px] "></div>
            <div className="absolute inset-0 w-full h-full flex flex-wrap opacity-15 z-0 mix-blend-overlay">
              <img src={Noise} alt="bg" className="w-1/3 h-1/2 object-cover" />
              <img src={Noise} alt="bg" className="w-1/3 h-1/2 object-cover" />
              <img src={Noise} alt="bg" className="w-1/3 h-1/2 object-cover" />
              <img src={Noise} alt="bg" className="w-1/3 h-1/2 object-cover" />
              <img src={Noise} alt="bg" className="w-1/3 h-1/2 object-cover" />
              <img src={Noise} alt="bg" className="w-1/3 h-1/2 object-cover" />
            </div>
            <p className="my-2 text-[32px] leading-tight text-overflow-ellipsis bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-montserrat-bold text-transparent border-b-[1px] pb-5">
              On the web
            </p>

            <div className="py-5 grid col-span-1 md:grid-cols-2 gap-10">
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-black border-[#797979]">
                  <div className="col-span-1">
                    <img src={TWITTER} />
                  </div>
                  <input
                    className="col-span-9 z-50 outline-none bg-black text-[#797979] border-[#797979] placeholder:text-[#797979]"
                    defaultValue={loggedInUserData?.twitter ?? ""}
                    placeholder="Enter Username"
                    id="twitter"
                    onChange={changehandler}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-black border-[#797979]">
                  <div className="col-span-1">
                    <img src={LINKEDIN} />
                  </div>
                  <input
                    className="col-span-9 z-50 outline-none bg-black text-[#797979] border-[#797979] placeholder:text-[#797979]"
                    defaultValue={loggedInUserData?.linkedIn ?? ""}
                    placeholder="Enter Username"
                    id="linkedIn"
                    onChange={changehandler}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-black border-[#797979]">
                  <div className="col-span-1">
                    <img src={YOUTUBE} />
                  </div>
                  <input
                    className="col-span-9 z-50 outline-none bg-black text-[#797979] border-[#797979] placeholder:text-[#797979]"
                    defaultValue={loggedInUserData?.youtube ?? ""}
                    placeholder="Enter Username"
                    id="youtube"
                    onChange={changehandler}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-black border-[#797979]">
                  <div className="col-span-1">
                    <img src={GITHUB} />
                  </div>
                  <input
                    className="col-span-9 z-50 outline-none bg-black text-[#797979] border-[#797979] placeholder:text-[#797979]"
                    defaultValue={loggedInUserData?.github ?? ""}
                    placeholder="Enter Username"
                    id="github"
                    onChange={changehandler}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-10 p-[16px] rounded-[12px] border-[0.5px] bg-black border-[#797979]">
                  <div className="col-span-1">
                    <img src={DISCORD} />
                  </div>
                  <input
                    className="col-span-9 z-50 outline-none bg-black text-[#797979] border-[#797979] placeholder:text-[#797979]"
                    defaultValue={loggedInUserData?.discord ?? ""}
                    placeholder="Enter Username"
                    id="discord"
                    onChange={changehandler}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 box-1 relative bg-black rounded-3xl border-[1px] border-[#5D89FF80] p-2 md:p-10 overflow-hidden">
            <div className="absolute -top-[40%] -left-[10%] size-[226px] bg-[#3A59FE]/50 rounded-full blur-[100px] "></div>
            <div className="absolute inset-0 w-full h-full flex flex-wrap opacity-20 z-0 mix-blend-overlay">
              <img src={Noise} alt="bg" className="w-1/2 h-full object-cover" />
              <img src={Noise} alt="bg" className="w-1/2 h-full object-cover" />
            </div>
            <p className="my-2 text-[32px] leading-tight text-overflow-ellipsis bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-montserrat-bold text-transparent border-b-[1px] pb-5">
              Project Links
            </p>

            <div className="py-5 grid grid-cols-4 gap-2 md:gap-10">
              <div className="md:col-span-2 col-span-4 flex flex-col space-y-4">
                <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                  Link Title
                </label>
                <input
                  id="title"
                  className="p-[16px] z-50 rounded-[12px] border-[0.5px] text-[#797979] bg-[#141414] border-[#797979] placeholder:text-[#797979]"
                  placeholder="Enter the title"
                  onChange={projectChangeHandler}
                  value={projectValues.title}
                />
              </div>
              <div className="md:col-span-2 col-span-4 flex flex-col space-y-4">
                <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                  URL
                </label>
                <input
                  id="URL"
                  className="p-[16px] z-50 rounded-[12px] border-[0.5px] text-[#797979] bg-[#141414] border-[#797979] placeholder:text-[#797979]"
                  placeholder="Enter link"
                  onChange={projectChangeHandler}
                  value={projectValues.URL}
                />
              </div>
              <div className="col-span-3 flex flex-col space-y-4">
                <label className="text-[16px] leading-[16px] text-overflow-ellipsis font-gilroysemibold">
                  description
                </label>
                <input
                  id="description"
                  className="p-[16px] z-50 rounded-[12px] border-[0.5px] text-[#797979] bg-[#141414] border-[#797979] placeholder:text-[#797979]"
                  placeholder="Type here..."
                  onChange={projectChangeHandler}
                  value={projectValues.description}
                />
              </div>
              <div className="col-span-1 text-center flex items-center justify-center space-y-4">
                {/* <GreenButton
                  onClick={addProjectHandler}
                  text={"Add"}
                  isHoveredReq={true}
                /> */}
                <DCButton
                  onClick={addProjectHandler}
                  btnContent={"Add"}
                  variant="dark"
                />
              </div>
            </div>

            {projects.map((project) => (
              <div
                key={project.id}
                className="w-full mt-5 bg-black overflow-hidden z-50 p-[16px] rounded-[12px] border border-[#5D89FF80]"
              >
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <img
                      src={HAMBURGER}
                      className="w-[24px] h-[24px] mr-[12px]"
                    />
                    <p className="text-[16px] text-[#797979]">{project.title}</p>
                  </div>

                  <div className="flex items-center z-[100]">
                    <a className="mr-[12px] text-[#797979] underline cursor-pointer">
                      {project.URL}
                    </a>

                    <FaXmark
                      className=" cursor-pointer "
                      onClick={() => {
                        console.log("clicked");
                        projectRemoveHandler(project.id);
                      }}
                      size={24}
                      color="white"
                    />
                  </div>
                </div>

                <p className="mt-5">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
