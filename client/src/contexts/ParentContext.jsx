import { createContext, useState } from "react";
import { getAllCourse } from "../utils/api/CourseAPI";
export const ParentContext = createContext("");

export const ParentProvider = ({ children }) => {
  const [allCourseMetaInfo, setallCourseMetaInfo] = useState([]);
  const [loggedInUserData, setloggedInUserData] = useState({});
  const [userDataIsUpdated, setuserDataIsUpdated] = useState(false);
  const [courseLoading, setcourseLoading] = useState(false);
  const [contests,setContests]=useState([])
  const getAllCourseMetaInfo = async () => {
    setcourseLoading(true);
    const data = await getAllCourse();
    setallCourseMetaInfo(data ? data : []);
    setcourseLoading(false);
  };

  return (
    <ParentContext.Provider
      value={{
        allCourseMetaInfo,
        loggedInUserData,
        setloggedInUserData,
        userDataIsUpdated,
        setuserDataIsUpdated,
        courseLoading,
        setcourseLoading,
        contests,
        setContests
      }}
    >
      {children}
    </ParentContext.Provider>
  );
};
