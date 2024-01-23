import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Header from "./components/Home/Header";
import PrivateRoute from "./routes/PrivateRoute";
import AllCourses from "./components/Courses/AllCourses";
import CourseDescription from "./components/Courses/CourseDesc/CourseDescription";
import EmailVerification from "./components/Courses/CourseDesc/EmailVerification";
import WorkPlace from "./components/WorkPlace/Workplace";
import Profile from "./components/Profile/Profile";
import PreviewAllCourses from "./components/Courses/PreviewAllCourses";
import PreviewCourseDesc from "./components/Courses/CourseDesc/PreviewCourseDesc";
import PreviewWorkplace from "./components/PreviewWorkPlace/PreviewWorkplace";

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
        <Route path="/previewcourses" element={<PreviewAllCourses />} />
        <Route path="/previewcourse/:id" element={<PreviewCourseDesc />} />
        <Route path="/previewworkplace/:id" element={<PreviewWorkplace />} />
        <Route path="/course/:id" element={<CourseDescription />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        {/*Main Routes*/}
        {/*Private route section*/}
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/workplace/:id" element={<WorkPlace />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route component={RedirectAs404}></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
