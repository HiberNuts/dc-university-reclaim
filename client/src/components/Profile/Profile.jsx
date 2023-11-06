import React, { useState, useEffect } from 'react';
import {
  faCheck,
  faCaretSquareDown,
  faHandPointRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import linkSVG from './linkSVG.svg';
import mailSVG from './mailSVG.svg';
import workSVG from './workSVG.svg';
import pencil from '../../assets/pencil.png';

import CourseCard from '../Courses/CourseCard/CourseCard';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import axios from "axios";
import { useAccount } from 'wagmi';


// import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

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
  const [userData, setUserData] = useState({});
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    portfolio: '',
  });
  const { allCourseMetaInfo } = useContext(ParentContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/getUserData?userid=${address}`); 
        console.log(response?.data)
        if(response?.data?.email=="default"){
          console.log("raghav");
          setisEditing(true)
        }
        setUserData(response.data);   
        setFormData(response.data)  
      } catch (error) {
        console.error('Error while fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);




  console.log(isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisEditing(false);

    try {
      const response = await axios.put('http://localhost:8080/api/auth/update?userid=6547ed6762b98118b70b716a', {
        ...formData
      });
      setUserData(response.data);

      // setFro(response.data);

      console.log(response);

      // localStorage.setItem('userData', JSON.stringify(formData));
    } catch (error) {
      console.error('Error while updating user data:', error);
    }
  };

  const Location = useLocation();

  return (
    <div className="w-full  mt-[100px] h-full flex justify-between align-middle">
      <div className="bg-shardeumBlue px-14 lg:w-[30%] h-[100vh]   left-0 rounded-r-xl  flex flex-col align-middle items-center">
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
                        {["Select Designation", "Developer", "Designer", "Researcher"].map((designation, index) => (
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

              <div className="mb-6">
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
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
              <ProfileLinks img={linkSVG} title={formData.portfolio} />
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
            <p className="font-satoshi  text-[48px] font-extrabold items-start   ">
              Welcome, <span className="BlueGradientFade">{formData.name}</span>
            </p>
            <span className="text-[18px] font-[500]">
              Cras tincidunt lobortis feugiat vivamus at morbi leo urna molestie atole elementum eu facilisis faucibus
              interdum posuere.elementum eu facilisis faucibus interdum posuere.
            </span>
          </div>
          <div className="flex w-full h-auto gap-5 flex-col">
            <p className="text-[24px] font-[600]"> Get Started with Our Courses</p>
            <div className="flex flex-wrap gap-5 w-full items-center justify-start align-middle">
              {allCourseMetaInfo &&
                allCourseMetaInfo?.map((course, index) => {
                  return <CourseCard key={index} props={course} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
