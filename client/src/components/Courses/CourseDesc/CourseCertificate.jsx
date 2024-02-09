import React, { useLayoutEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

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

const CourseCertificate = ({ props, title }) => {
  const ref = React.useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } = useTruncatedElement({
    ref,
  });

  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [30, -30]);
  const rotateY = useTransform(x, [0, 400], [-30, 30]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <motion.div className="w-full transition ease-in-out delay-150 flex-wrap  flex justify-center items-center align-middle text-white bg-shardeumBlue">
      <div className="flex gap-6 flex-col px-10 py-12 md:w-[65%]">
        <div className=" flex  flex-col sm:text-[64px] text-[45px] font-helvetica-neue-bold">Earn Your Certificate</div>
        <div className="md:w-[80%] flex flex-col gap-6  transition ease-in-out delay-150">
          <p ref={ref} className={`sm:text-[18px] text-[16px] break-words font-helvetica-neue-roman  `}>
            Complete the {title} to ear an NFT Certificate.
          </p>
        </div>
      </div>
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        onMouseMove={handleMouse}
        className="flex w-[300px] transition-all ease-linear cursor-pointer h-[400px] object-cover mb-10 sm:mb-0"
      >
        <img className="w-full h-full object-cover rounded-xl" src={props} />
      </motion.div>
    </motion.div>
  );
};

export default CourseCertificate;
