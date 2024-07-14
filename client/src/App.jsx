import React, { useContext,useEffect } from "react"; 
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { ParentContext } from "./contexts/ParentContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Header from "./components/Home/Header";
import PrivateRoute from "./routes/PrivateRoute";
import AllCourses from "./components/Courses/AllCourses";
import CourseDescription from "./components/Courses/CourseDesc/CourseDescription";
import EmailVerification from "./components/Courses/CourseDesc/EmailVerification";
import WorkPlace from "./components/WorkPlace/Workplace";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/Edit";
import PreviewAllCourses from "./components/Courses/PreviewAllCourses";
import PreviewCourseDesc from "./components/Courses/CourseDesc/PreviewCourseDesc";
import PreviewWorkplace from "./components/PreviewWorkPlace/PreviewWorkplace";
import ContestRegsiter from "./components/Contest/Regsiter/Register";
import AllContests from "./components/Contest/List/AllContests";
import AllPreviewContests from "./components/Contest/Preview/AlllPreviewContests";
import PreviewContest from "./components/Contest/Preview/PreviewContest";
import EditorPreview from "./components/Contest/Preview/EditorPreview";
import Editor from "./components/editor/IDE/Editor";
import Solution from "./components/Contest/Solution/Solution";

function App() {
  const RedirectAs404 = ({ location }) => <Navigate to={Object.assign({}, location, { state: { is404: true } })} />;
  
  //METHOD TO NAVIGATE TO PEOFILE/EDIT PAGE IF USER DOESN'T HAVE SHARD_ID
  const navigate=useNavigate();
  const location = useLocation();
  const {loggedInUserData}=useContext(ParentContext);
  useEffect(()=>{
    if(loggedInUserData!=null)
    {
      if(loggedInUserData?.shardId=="")
      {
           navigate("/profile/edit");
      }  
    }
  },[loggedInUserData,location.pathname])


  return (
    <>
      <Header />
      <Routes>
        {/* Auth Pages */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:shardId" element={<Profile/>}/>
        {/*Error Pages*/}
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/previewcourses" element={<PreviewAllCourses />} />
        <Route path="/previewcourse/:id" element={<PreviewCourseDesc />} />
        <Route path="/previewworkplace/:id" element={<PreviewWorkplace />} />
        <Route path="/course/:id" element={<CourseDescription />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/contest/register/:title" element={<ContestRegsiter/>}/>
        <Route path="/contests" element={<AllContests />}/>
        <Route path="/contest/:title/solution" element={<Solution/>}/>
        <Route path="/editor/:title/:id" element={<Editor/>}/>
        {/* hello */}
        {/*Main Routes*/}
        {/*Private route section*/}
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/workplace/:id" element={<WorkPlace />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/allpreviewcontests" element={<AllPreviewContests />}/>
          <Route path="/previewcontests/:id" element={<PreviewContest />}/>
          <Route path="/previewcontests/editor/:id" element={<EditorPreview />}/>
        </Route>
        <Route component={RedirectAs404}></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
