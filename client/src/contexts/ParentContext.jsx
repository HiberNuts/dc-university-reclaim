import { createContext, useEffect, useState } from "react";

import * as ethers from "ethers";
import { getAllCourse } from "../utils/api/CourseAPI";

export const ParentContext = createContext("");

export const ParentProvider = ({ children }) => {
  const [allCourseMetaInfo, setallCourseMetaInfo] = useState([]);

  const [courseLoading, setcourseLoading] = useState(false);

  const getAllCourseMetaInfo = async () => {
    setcourseLoading(true);
    const data = await getAllCourse();
    setallCourseMetaInfo(data ? data : []);
    setcourseLoading(false);
  };

  const getCourseByName = async (title) => {
    console.log(allCourseMetaInfo);
    console.log(title);

    const filteredData = allCourseMetaInfo.filter((course) => course.attributes.title.split(" ").join("-") === title);
    console.log(filteredData);
    return filteredData;
  };

  useEffect(() => {
    getAllCourseMetaInfo();
  }, []);

  return <ParentContext.Provider value={{ allCourseMetaInfo, getCourseByName }}>{children}</ParentContext.Provider>;
};
