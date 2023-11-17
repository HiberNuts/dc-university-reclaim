import React from "react";

const CourseProgress = ({ currentCourseProgress, title }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        padding: "20px 24px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
        marginTop: "15px",
        borderRadius: "16px",
        border: "2px solid #C3C8FF",
        background: "var(--Primary, #FFF)",
        boxShadow: "0px 4px 10px 0px rgba(195, 200, 255, 0.40)",
      }}
    >
      <p className="text-black text-[24px] text-center mt-2">{title}</p>
      {currentCourseProgress && (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div className="bg-gray-200  relative h-6 w-full rounded-2xl">
            <div
              className={`bg-shardeumOrange h-full absolute z-0 top-0 left-0 flex w-[${
                Math.round(parseInt(currentCourseProgress?.overallCompletionPercentage) / 10) * 10
              }%] items-center justify-center rounded-2xl text-sm font-semibold text-white`}
            >
              {parseInt(currentCourseProgress?.overallCompletionPercentage)}%
            </div>
          </div>

          <div style={{ gap: "12px" }}>
            Course {parseInt(currentCourseProgress?.overallCompletionPercentage)}% Completed{" "}
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default CourseProgress;
