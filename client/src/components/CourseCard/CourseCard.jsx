import React from "react";

import { Link } from "react-router-dom";
// import style from './style.css' ;

const CourseCard = ({ img, title, desc, course, category }) => {
  const rating = (Math.random() * 3 + 3).toFixed(1); //courses with 3 star at least
  const starRating = () => {
    const listItems = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      listItems.push(<span key={i}>{"⭐"}</span>);
    }
    return listItems;
  };
  return (
    <div className="main-container bg-black md:w-full lg:w-[400px] rounded-lg  flex justify-between shadow-xl flex-col ">
      <div className="img-container">
        <div className="course-image-container ">
          <img
            style={{ borderRadius: "5px" }}
            src={img}
            className="object-fill course-image  md:h-60 w-full h-60"
          />
        </div>
      </div>
      <div className="p-4">
        <h1
          className="md:mt-4"
          style={{ fontSize: "24px", textAlign: "center", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {title}
        </h1>
        <p style={{ textAlign: "left" }}>{desc}</p>
      </div>
      {/* <div className="flex items-center justify-center gap-3 mt-2">
        <p className="text-orange">{(rating > 5) ? 5 : rating}</p>
        <p>
          {starRating()}
        </p>
      </div> */}

      <div className="mt-5 pricing flex justify-center ">
        <Link to={`/course/${course?.id}`}>
          <button className="text-black bg-gradient-to-r bg-white  hover:scale-110 ease-in-out  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Start Course
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
