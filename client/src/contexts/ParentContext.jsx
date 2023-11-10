import { createContext, useEffect, useState } from "react";

import * as ethers from "ethers";
import { getAllCourse } from "../utils/api/CourseAPI";

export const ParentContext = createContext("");

export const ParentProvider = ({ children }) => {
  const [allCourseMetaInfo, setallCourseMetaInfo] = useState([]);
  const [loggedInUserData, setloggedInUserData] = useState({});
  const [userDataIsUpdated, setuserDataIsUpdated] = useState(false);
  const [courseLoading, setcourseLoading] = useState(false);

  const getAllCourseMetaInfo = async () => {
    setcourseLoading(true);
    const data = await getAllCourse();
    console.log(data);
    setallCourseMetaInfo(data ? data : []);
    setcourseLoading(false);
  };

  return (
    <ParentContext.Provider
      value={{
        allCourseMetaInfo,
        loggedInUserData,
        setloggedInUserData,
        // getCourseByName,
        userDataIsUpdated,
        setuserDataIsUpdated,
        courseLoading,
        setcourseLoading
      }}
    >
      {children}
    </ParentContext.Provider>
  );
};
