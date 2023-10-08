import React, { Suspense, useLayoutEffect } from "react";
import {  Route, Routes } from "react-router-dom";

import Communtiy from "../components/Community/Communtiy";
import { Career } from "../components/Career/Career";
import Courses from "../components/Courses/Courses";
import Course from "../components/Courses/Course/Course";
import StudentDashboard from "../components/StudentDashboard/StudentDashboard";
import StudentsCourses from "../components/StudentDashboard/StudentCourses";
import CoursePayment from "../components/Courses/CoursePayment";
import LightHouseUtils from "../utils/LightHouseUtils";
import Mentorship from "../components/Mentor/Mentorship";
import Courseplace from "../components/Courseplace/Courseplace";
const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/community" element={<Communtiy />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/studentcourses" element={<StudentsCourses />} />
        <Route path="/pay" element={<CoursePayment />} />
        <Route path="/light" element={<LightHouseUtils />} />
        <Route path="/Mentor" element={<Mentorship />} />
        <Route path="/workplace" element={<Courseplace />} />
      </Routes>
    </Suspense>
  );
};
export default Pages;
