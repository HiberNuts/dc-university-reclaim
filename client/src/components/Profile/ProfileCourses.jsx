import React, { useEffect, useState } from "react";
import FeatureCourses from "../Home/FeatureCourses";
import SkeletonLoader from "../Courses/SkeletonLoader";
import { getCoursebyIdAPI } from "../../utils/api/CourseAPI";
import ProfileCourseCard from "./ProfileCourseCard";
import GetStarted from "./GetStarted";

const ProfileCourses = ({ loggedInUserData }) => {
  const [profileCoursesID, setprofileCoursesID] = useState([]);
  const [loading, setloading] = useState(false);
  const [profileCoursesData, setprofileCoursesData] = useState([]);

  const getCourseById = async () => {
    setloading(true);
    let list = [];
    loggedInUserData?.enrolledCourses?.map((course) => {
      list.push(course.courseId);
    });
    setprofileCoursesID(list);
    var results = await Promise.all(
      list.map(async (item) => {
        const data = await getCoursebyIdAPI(item);
        return data;
      })
    );
    setprofileCoursesData(results);
    setloading(false);
  };

  useEffect(() => {
    getCourseById();
  }, [loggedInUserData]);

  return (
    <div>
      {loading ? (
        <SkeletonLoader />
      ) : loggedInUserData?.enrolledCourses?.length > 0 ? (
        <div className="flex w-full flex-wrap h-auto gap-5">
          <p className="font-helvetica-neue mt-[-50px] text-[48px] font-extrabold items-center text-center  ">
            Resume your course
          </p>
          <div className="flex flex-wrap w-full justify-evenly">
            {profileCoursesData?.map((course, index) => (
              <ProfileCourseCard loggedInUserData={loggedInUserData} key={index} props={course} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full h-auto gap-5 flex-col">
          <GetStarted />
        </div>
      )}
    </div>
  );
};

export default ProfileCourses;
