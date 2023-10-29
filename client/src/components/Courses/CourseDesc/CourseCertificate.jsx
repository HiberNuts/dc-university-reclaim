import React, { useLayoutEffect, useState } from "react";
import grid from "../../../assets/Grid.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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

const CourseCertificate = () => {
  const ref = React.useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } = useTruncatedElement({
    ref,
  });
  return (
    <div
      style={{ backgroundImage: `url(${grid})`, backgroundPosition: "center" }}
      className="w-full transition ease-in-out delay-150 flex-wrap  flex justify-center items-center align-middle text-white bg-shardeumBlue"
    >
      <div className="flex gap-6 flex-col px-10 py-12 md:w-[65%] ">
        <div className=" flex  flex-col font-[700] text-[48px]">Earn Your Certificate</div>
        <div className="md:w-[80%] transition ease-in-out delay-150">
          <p ref={ref} className={`font-[500] text-[18px] break-words  `}>
            Complete the Ethereum Developer Bootcamp to ear an NFT Certificate. Complete the Ethereum Developer Bootcamp
            to ear an NFT Certificate. Complete the Ethereum Developer Bootcamp to ear an
          </p>
          <button
            className="font-bold text-[20px] mt-4 bg-shardeumOrange rounded-md w-44 h-10"
            onClick={toggleIsShowingMore}
          >
            Start Learning <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className="flex w-[300px] h-[400px] object-cover mb-10 sm:mb-0">
        <img
          className="w-full h-full object-cover rounded-xl"
          src="https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_1280.png"
        />
      </div>
    </div>
  );
};

export default CourseCertificate;
