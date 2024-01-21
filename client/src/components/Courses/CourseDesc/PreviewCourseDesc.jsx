import React, { useState, useContext, useEffect } from "react";
import CourseHeader from "./CourseHeader";
import CourseAbout from "./CourseAbout";
import CourseSkills from "./CourseSkills";
import CourseLearn from "./PreviewCourseLearn";

import CourseFAQ from "./CourseFAQ";
import CourseCertificate from "./CourseCertificate";
import { useLocation, useParams } from "react-router-dom";
import { ParentContext } from "../../../contexts/ParentContext";
import { getCoursebyName } from "../../../utils/api/CourseAPI";
import axios from "axios";
import PreviewCourseHeader from "./PreviewCourseHeader";
import PreviewCourseLearn from "./PreviewCourseLearn";

const PreviewCourseDesc = () => {
    const params = useParams();

    console.log(params);
    const [courseData, setcourseData] = useState({});


    useEffect(() => {
        const getCourseInfo = async () => {
            const { data } = await axios.get(`https://cms.university.shardeum.org/api/courses/${params.id}?publicationState=preview&filters[publishedAt][$null]=true&populate=deep`)
            // const data = await getCoursebyName(params?.id);
            // console.log(data);

            setcourseData(data.data);
        };
        getCourseInfo();
    }, [params]);
    console.log(courseData);

    return (
        <div className="w-full bg-shardeumWhite justify-center items-center  align-middle flex flex-col">
            <PreviewCourseHeader props={courseData ? courseData : {}} />
            <CourseAbout props={courseData?.attributes?.aboutCourse} />
            <CourseSkills props={courseData?.attributes?.skills} />
            <PreviewCourseLearn props={courseData?.attributes?.whatYouLearn} />
            <CourseCertificate props={courseData?.attributes?.nftImage?.data.attributes.url} courseId={courseData?.id} />
            <CourseFAQ props={courseData?.attributes?.faq} />
        </div>
    );
};

export default PreviewCourseDesc;
