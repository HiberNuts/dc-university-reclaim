import React, { useLayoutEffect, useState } from "react";
import grid from "../../../assets/Grid.png";

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat. aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat. aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const useTruncatedElement = ({ ref }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref.current || {};

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [ref]);

  const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev);

  return {
    isTruncated,
    isShowingMore,
    toggleIsShowingMore,
  };
};

const CourseAbout = () => {
  const ref = React.useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } = useTruncatedElement({
    ref,
  });
  return (
    <div
      style={{ backgroundImage: `url(${grid})`, backgroundPosition: "center" }}
      className="w-full transition ease-in-out delay-150  py-20 flex justify-center items-center align-middle text-white bg-shardeumBlue"
    >
      <div className="flex gap-10 md:flex-row flex-col  md:w-[80%] w-[95%]">
        <div className="md:w-[20%] flex flex-col font-[700] text-[48px]">
          <span>About</span>
          <span>Course</span>
        </div>
        <div className="md:w-[80%] transition ease-in-out delay-150">
          <p ref={ref} className={`font-[500] text-[18px] break-words  ${!isShowingMore && "line-clamp-4"}`}>
            {text}
          </p>
          {isTruncated && (
            <button
              className="font-bold text-[20px] mt-4 bg-shardeumOrange rounded-md w-44 h-10"
              onClick={toggleIsShowingMore}
            >
              {isShowingMore ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseAbout;
