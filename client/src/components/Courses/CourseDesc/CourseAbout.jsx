import React, { useLayoutEffect, useState } from "react";

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

const CourseAbout = ({ props }) => {
  const ref = React.useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } = useTruncatedElement({
    ref,
  });
  return (
    <div className="w-full transition ease-in-out delay-150 md:px-[100px] md:py-[80px]  px-[40px] py-[40px]  flex justify-start items-center align-middle text-white bg-shardeumBlue">
      <div className="flex ms:gap-10 gap-5 md:flex-row flex-col  ">
        <div className=" flex flex-col  sm:text-[64px] text-[45px] ">
          <span className="font-helvetica-neue-bold">About</span>
          <span className="font-helvetica-neue-bold">Course</span>
        </div>
        <div className=" transition ease-in-out delay-150">
          <p
            ref={ref}
            className={` text-[18px] break-words font-helvetica-neue-roman  ${!isShowingMore && "line-clamp-4"}`}
          >
            {props ? props : ""}
          </p>
          {isTruncated && (
            <button
              className="font-helvetica-neue-md text-[20px] mt-4 bg-shardeumOrange rounded-md w-44 h-10"
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
