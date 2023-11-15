import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";

import Header from "./components/Home/Header";
import PrivateRoute from "./routes/PrivateRoute";

// import Courses from "./components/Courses/Courses";

import AllCourses from "./components/Courses/AllCourses";
import { Profile } from "./components/Profile/Profile";
import CourseDescription from "./components/Courses/CourseDesc/CourseDescription";

import WorkPlace from "./components/WorkPlace/Workplace";

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
        <Route path="/course/:id" element={<CourseDescription />} />
        {/* <Route path="/coursepage" element={<CoursePage />} /> */}
        <Route path="/workplace/:id" element={<WorkPlace />} />

        {/*Main Routes*/}
        {/*Private route section*/}
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/workplace" element={<CoursePage />} /> */}
        </Route>
        <Route component={RedirectAs404}></Route>
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
