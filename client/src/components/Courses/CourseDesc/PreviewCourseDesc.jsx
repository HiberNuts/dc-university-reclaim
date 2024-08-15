import React, { useState, useEffect } from "react";
import CourseAbout from "./CourseAbout";
import CourseSkills from "./CourseSkills";

import CourseFAQ from "./CourseFAQ";
import CourseCertificate from "./CourseCertificate";
import {  useParams } from "react-router-dom";

import axios from "axios";
import PreviewCourseHeader from "./PreviewCourseHeader";
import PreviewCourseLearn from "./PreviewCourseLearn";

const PreviewCourseDesc = () => {
    const params = useParams();
    const [courseData, setcourseData] = useState({});


    useEffect(() => {
        const getCourseInfo = async () => {
            const { data } = await axios.get(`https://cms.university.shardeum.org/api/courses/${params.id}?publicationState=preview&filters[publishedAt][$null]=true&populate=deep`)
            

            setcourseData(data.data);
        };
        getCourseInfo();
    }, [params]);

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
