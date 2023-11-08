import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";

import Header from "./components/Home/Header";
import PrivateRoute from "./routes/PrivateRoute";

// import Courses from "./components/Courses/Courses";
import Course from "./components/Courses/Course/Course";
import Courseplace from "./components/Courseplace/CoursePlace";
import AllCourses from "./components/Courses/AllCourses";
import { Profile } from "./components/Profile/Profile";
import CourseDescription from "./components/Courses/CourseDesc/CourseDescription";
import CoursePage from "./components/Courseplace/CoursePage";

function App() {
  const RedirectAs404 = ({ location }) => <Navigate to={Object.assign({}, location, { state: { is404: true } })} />;
  return (
    <>
      <Header />
      <Routes>
        {/* Auth Pages */}
        <Route exact path="/" element={<Home />} />
        {/*Error Pages*/}
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/course/:id" element={<CourseDescription />} />
        <Route path="/coursepage" element={<CoursePage />} />
        <Route path="/courseplace" element={<Courseplace />} />     

        {/*Main Routes*/}
        {/*Private route section*/}
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/workplace" element={<Courseplace />} />
       
        </Route>
        <Route component={RedirectAs404}></Route>
      </Routes> 

      <Footer />
    </>
  );
}

export default App;
