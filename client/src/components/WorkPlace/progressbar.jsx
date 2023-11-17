// ProgressBar.js
import React from "react";
import { Link } from "react-router-dom";
import { generateSlug } from "../../utils/generateSlug";

const ProgressBar = ({ currentCourseProgress, title }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 ">
      <Link to={`/workplace/${generateSlug(title)}`}>
        <div className="bg-gray-200 relative h-6 w-full rounded-2xl">
          <div
            className={`bg-shardeumOrange h-full absolute top-0 left-0 flex w-[${Math.round(
              parseInt(currentCourseProgress?.overallCompletionPercentage) / 10
            ) * 10}%] items-center justify-center rounded-2xl text-sm font-semibold text-white`}
          >
            {parseInt(currentCourseProgress?.overallCompletionPercentage)}%
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProgressBar;
