import React, { useState, useEffect } from "react";
import CourseHeader from "./CourseHeader";
import CourseAbout from "./CourseAbout";
import CourseSkills from "./CourseSkills";
import CourseLearn from "./CourseLearn";

import CourseFAQ from "./CourseFAQ";
import CourseCertificate from "./CourseCertificate";
import { useParams } from "react-router-dom";
import { getCoursebyName } from "../../../utils/api/CourseAPI";
import CourseLearnAndSkill from "./CourseLearnAndSkill";

const CourseDescription = () => {
  const params = useParams();
  const [courseData, setcourseData] = useState({});

  const getCourseInfo = async () => {
    const data = await getCoursebyName(params?.id);
    setcourseData(data);
  };

  useEffect(() => {
    getCourseInfo();
  }, [params]);

  return (
    <div className="w-full bg-dark justify-center items-center  align-middle flex flex-col">
      <CourseHeader props={courseData ? courseData : {}} />
      {/* <CourseAbout props={courseData?.aboutCourse} /> */}
      {/* <CourseSkills props={courseData?.skills} /> */}
      {/* <CourseLearn props={courseData?.whatYouLearn} /> */}
      <CourseLearnAndSkill/>
      <CourseCertificate props={courseData?.nftImage} title={courseData?.title} courseId={courseData._id} />
      <CourseFAQ props={courseData?.faq} />
    </div>
  );
};

export default CourseDescription;
