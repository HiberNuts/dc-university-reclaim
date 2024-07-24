import React, { useEffect, useState } from "react";
import { getCoursebyIdAPI } from "../../utils/api/CourseAPI";
import ProfileCourseCard from "./ProfileCourseCard";
import GetStarted from "./GetStarted";

const ProfileCourses = ({ loggedInUserData, userData }) => {
  const [profileCoursesID, setprofileCoursesID] = useState([]);
  const [loading, setloading] = useState(false);
  const [profileCoursesData, setprofileCoursesData] = useState([]);
  const [nfts, setNfts] = useState([]);

  const getCourseById = async () => {
    setloading(true);
    let list = [];
    userData?.enrolledCourses?.map((course) => {
      list.push(course.courseId);
    });
    setprofileCoursesID(list);
    var results = await Promise.all(
      list.map(async (item) => {
        const data = await getCoursebyIdAPI(item)
        return data;

      })
    );
    results = results.filter((item) => item !== undefined);
    let NFTS = results.map((single) => single.nftImage ?? '');
    console.log("NFTS----", NFTS);
    setNfts(NFTS);
    setprofileCoursesData(results);
    console.log("--data---,pro", results);
    setloading(false);
  };

  useEffect(() => {
    getCourseById();
  }, [userData, loggedInUserData]);

  return (
    <div>
      {
        loading ? <></>
          : nfts.length == 0 ? <></> :
            <div>
              <p className='my-2 text-[24px] text-left leading-tight text-black text-overflow-ellipsis font-helvetica-neue-bold border-b-[1px] pb-3'>NFTs earned</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
                {
                  nfts.map((single) =>
                    single != "" &&
                    <div className="col-span-1 flex justify-center items-center  px-2 rounded-[16px] min-h-[350px] hover:px-5 transition-width duration-1000">
                      <img src={single} className="cursor-pointer" />
                    </div>
                  )
                }
              </div>
            </div>
      }
      {loading ? (
        <></>
      ) : userData?.enrolledCourses?.length > 0 ? (
        userData._id == loggedInUserData._id ?
          <div className="">
            <p className='my-2 text-[24px] text-left leading-tight text-black text-overflow-ellipsis font-helvetica-neue-bold border-b-[1px] pb-3'>Resume your courses</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5 mb-10">
              {profileCoursesData?.map((course, index) => {
                return course?.softDelete == true ? (
                  ""
                ) : (
                  <ProfileCourseCard userData={userData} loggedInUserData={loggedInUserData} key={index} props={course} />
                );
              })}

            </div>
          </div>
          :
          <div className="">
            <p className='my-2 text-[24px] text-left leading-tight text-black text-overflow-ellipsis font-helvetica-neue-bold border-b-[1px] pb-3'>Completed courses</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5 my-10 ">
              {profileCoursesData?.map((course, index) => {
                return course?.softDelete == true ? (
                  ""
                ) : (
                  <ProfileCourseCard userData={userData} loggedInUserData={loggedInUserData} key={index} props={course} />
                );
              })}

            </div>
          </div>
      ) :
        userData._id == loggedInUserData._id ?
          <GetStarted />
          :
          (
            <div className="">
              <p className='my-2 text-[24px] text-left leading-tight text-black text-overflow-ellipsis font-helvetica-neue-bold border-b-[1px] pb-3'>Completed courses</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5 my-10 ">
                {profileCoursesData?.map((course, index) => {
                  return course?.softDelete == true ? (
                    ""
                  ) : (
                    <ProfileCourseCard userData={userData} loggedInUserData={loggedInUserData} key={index} props={course} />
                  );
                })}

              </div>
            </div>
          )}
    </div>
  );
};

export default ProfileCourses;
