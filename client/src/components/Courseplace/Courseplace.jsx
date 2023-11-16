import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HTMLRenderer from "react-html-renderer";

import "./CoursePlace.scss";
import { H1 } from "./customCourseElement";
import hljs from 'highlight.js';

const CoursePlace = () => {
  const [moduleContent, setModuleContent] = useState("");
  useEffect(() => {
    hljs.highlightAll();
    
  }, [moduleContent]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/courses/4?populate=deep")
      .then((response) => {
        const content = response.data?.data?.attributes?.module?.[0]?.chapter?.[0]?.content;
        console.log(content);
        if (content) {
          setModuleContent(content);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    
    <div className="flex w-full justify-center items-center align-middle">
    
      {/* <div className="flex justify-center align-middle w-[80%] flex-col" dangerouslySetInnerHTML={{ __html: moduleContent }} /> */}
      <div className="flex text-[20px] w-[90%] courseContent justify-center align-middle  flex-col ">
        <HTMLRenderer
          html={moduleContent}
          components={{
            
          }}
        />
      </div>
    </div>

  );
};

export default CoursePlace;
