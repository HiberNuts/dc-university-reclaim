import React, { lazy } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./components/Home/Home"));
const Footer = lazy(() => import("./components/Footer"));
const Header = lazy(() => import("./components/Home/Header"));
const PrivateRoute = lazy(() => import("./routes/PrivateRoute"));
const AllCourses = lazy(() => import("./components/Courses/AllCourses"));
const CourseDescription = lazy(() => import("./components/Courses/CourseDesc/CourseDescription"));
const EmailVerification = lazy(() => import("./components/Courses/CourseDesc/EmailVerification"));
const WorkPlace = lazy(() => import("./components/WorkPlace/Workplace"));
const Profile = lazy(() => import("./components/Profile/Profile"));

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
