import React, { useState } from "react";
import { OrangeButton } from "../button/OrangeButton";
import { faCheck, faPencil, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import linkSVG from "./linkSVG.svg";
import mailSVG from "./mailSVG.svg";
import workSVG from "./workSVG.svg";
import pencil from "../../assets/pencil.png";
import FeatureCourses from "../Home/FeatureCourses";
import CourseCard from "../Courses/CourseCard/CourseCard";
const ProfileLinks = ({ img, title }) => {
  return (
    <div className="text-white flex gap-3 text-[16px] font-[500]">
      <img src={img} />
      <span>{title}</span>
    </div>
  );
};

export const Profile = () => {
  const [isEditing, setisEditing] = useState(false);

  return (
    <div className="w-full mt-[100px] flex justify-between align-middle ">
      <div className="bg-shardeumBlue px-14 lg:w-[30%] h-[90vh] fixed rounded-r-xl  flex flex-col align-middle items-center">
        <div className="text-white mt-20">
          <img
            className="rounded-[50%] w-[160px] h-[160px] border-2 border-shardeumOrange object-cover"
            src={"https://api.dicebear.com/7.x/micah/svg?seed=Garfield"}
          />
          {isEditing && (
            <p style={{ fontFamily: "satoshiVariable" }} className="text-center text-[22px] font-[700] mt-2 ">
              Divyansh Jain
            </p>
          )}
        </div>
        {isEditing ? (
          <div className={`w-full flex flex-col h-[30%] justify-evenly align-middle items-center`}>
            <div className="flex  flex-col h-full justify-evenly">
              <ProfileLinks img={linkSVG} title={"raghavjindal0212@gmail.com"} />
              <ProfileLinks img={mailSVG} title={"raghavjindal0212@gmail.com"} />
              <ProfileLinks img={workSVG} title={"raghavjindal0212@gmail.com"} />
            </div>
            <div className="w-full justify-center align-middle flex">
              <button
                onClick={() => setisEditing(false)}
                className={`bg-shardeumOrange flex justify-center align-middle hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[22px] w-[200px] h-[40px]`}
              >
                <img className="mr-2" src={pencil} /> Update
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full mt-8">
            <form>
              <div class="mb-6 w-full">
                <input
                  type="Name"
                  id="Name"
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-shardeumOrange focus:border-shardeumOrange block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-50"
                  placeholder="What should we call you"
                  required
                />
              </div>
              <div class="mb-6">
                <input
                  type="Email"
                  id="Email"
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-shardeumOrange focus:border-shardeumOrange block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-50"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="mb-6">
                <input
                  type="text"
                  id="desig"
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-shardeumOrange focus:border-shardeumOrange block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-50"
                  placeholder="Designation"
                  required
                />
              </div>
              <div class="mb-6">
                <input
                  type="url"
                  id="url"
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-shardeumOrange focus:border-shardeumOrange block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-50"
                  placeholder="Portfolio Link"
                  required
                />
              </div>
              <div className="w-full justify-center align-middle flex">
                <button
                  onClick={() => setisEditing(true)}
                  className={`bg-shardeumOrange hover:bg-[#fc7d34] rounded-[10px] transition ease-in-out items-center font-semibold text-center text-white text-[22px] w-[200px] h-[40px]`}
                >
                  <FontAwesomeIcon icon={faCheck} /> Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div
        className="lg:w-[70%] ml-[30%] min-h-[90vh] flex justify-center
       align-middle"
      >
        <div className="content  w-full mx-20">
          <div className="mb-20">
            <p className="font-satoshi  text-[48px] font-extrabold items-start   ">
              Welcome, <span className="BlueGradientFade">Divyansh</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
