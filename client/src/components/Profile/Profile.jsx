import React, { useState, useEffect } from "react";
import { OrangeButton } from "../button/OrangeButton";
import { faCheck, faPencil, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import linkSVG from "./linkSVG.svg";
import mailSVG from "./mailSVG.svg";
import workSVG from "./workSVG.svg";
import pencil from "../../assets/pencil.png";
import FeatureCourses from "../Home/FeatureCourses";
import CourseCard from "../Courses/CourseCard/CourseCard";
import { useLocation } from "react-router-dom";

const ProfileLinks = ({ img, title }) => {
  return (
    <div className="text-white flex gap-3 text-[16px] font-[500]">
      <img src={img} alt="icon" />
      <span>{title}</span>
    </div>
  );
};

export const Profile = () => {
  const [isEditing, setisEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Divyansh Jain",
    email: "",
    designation: "",
    portfolioLink: "",
  });

  useEffect(() => {
    // Load user data from local storage when the component mounts
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisEditing(false);

    // Save user data to local storage when the form is submitted
    localStorage.setItem("userData", JSON.stringify(formData));
  };

  const Location = useLocation();

  return (
    <div className="w-full overflow-hidden
    
    mt-[100px] h-[100vh] mb-[100vh] flex justify-between align-middle">
      <div className="bg-shardeumBlue px-14 mb-[100vh] lg:w-[30%] h-full fixed overflow-hidden left-0 rounded-r-xl  flex flex-col align-middle items-center">
        <div className="text-white mt-20">
          <img
            className="rounded-[50%] w-[160px] h-[160px] border-2 border-shardeumOrange object-cover"
            src={"https://api.dicebear.com/7.x/micah/svg?seed=Garfield"}
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
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-shardeumOrange focus:border-shardeumOrange block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-50"
                  placeholder="Designation"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="url"
                  name="portfolioLink"
                  value={formData.portfolioLink}
                  onChange={handleChange}
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-shardeumOrange focus:border-shardeumOrange block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-50"
                  placeholder="Portfolio Link"
                  required
                />
              </div>
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
          <div className={`w-full flex flex-col h-[30%] justify-evenly align-middle items-center`}>
            <div className="flex  flex-col h-full justify-evenly">
              <ProfileLinks img={linkSVG} title={formData.portfolioLink} />
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
        className="lg.w-[70%] ml-[30%] overflow-auto min-h-[90vh] flex justify-center
       align-middle"
      >
        <div className="content  w-full mx-20">
          <div className="mb-20">
            <p className="font-satoshi  text-[48px] font-extrabold items-start   ">
              Welcome, <span className="BlueGradientFade">{formData.name}</span>
            </p>
            <span className="text-[18px] font-[500]">
              Cras tincidunt lobortis feugiat vivamus at morbi leo urna molestie atole elementum eu facilisis faucibus
              interdum posuere.elementum eu facilisis faucibus interdum posuere.
            </span>
          </div>
          <div className="flex w-full gap-5 flex-col">
            <p className="text-[24px] font-[600]"> Get Started with Our Courses</p>
            <div className="flex flex-wrap gap-5 w-full items-center justify-center align-middle">
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
