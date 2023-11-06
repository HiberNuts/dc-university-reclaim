import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Acordian.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import expand from "../../assets/expand.png";
import lock from "../../assets/lock.svg";
import tick from "../../assets/tick.svg";
const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

function Accordion({ children, multiple, defaultIndex }) {
  const [activeIndex, setActiveIndex] = React.useState(multiple ? [defaultIndex] : defaultIndex);

  function onChangeIndex(index) {
    setActiveIndex((currentActiveIndex) => {
      if (!multiple) {
        return index === activeIndex ? -1 : index;
      }

      if (currentActiveIndex.includes(index)) {
        return currentActiveIndex.filter((i) => i !== index);
      }

      return currentActiveIndex.concat(index);
    });
  }

  return React.Children.map(children, (child, index) => {
    const isActive = multiple && Array.isArray(activeIndex) ? activeIndex.includes(index) : activeIndex === index;

    return <AccordionContext.Provider value={{ isActive, index, onChangeIndex }}>{child}</AccordionContext.Provider>;
  });
}

function AccordionItem({ children }) {
  return <div className="AccordionItem  text-white font-satoshi text-[18px] font-[800px]">{children}</div>;
}

function AccordionHeader({ text }) {
  const { isActive, index, onChangeIndex } = useAccordion();

  return (
    <motion.div className={`AccordionHeader ${isActive ? "active" : ""} w-full `} onClick={() => onChangeIndex(index)}>
      <div style={{ fontFamily: "satoshiVariable" }} className="flex  w-full justify-between align-middle h-full">
        <span style={{ fontFamily: "satoshiVariable" }} className="font-[500] text-[20px]">
          {text}
        </span>{" "}
        <img
          className={`${
            isActive ? "" : "rotate-180 transition-all "
          } w-6 sm:w-6 h-6  mt-3 ml-2 fill-white sm:mt-0 sm:ml-0 `}
          src={expand}
        />
      </div>
    </motion.div>
  );
}

function AccordionPanel({ children }) {
  const { isActive } = useAccordion();

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        >
          <div className="AccordionPanel   bg-shardeumBlue text-white">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const CourseAcordian = ({ title, chapters, moduleIndex, setCurrentChapter, currentChapter, onChapterSelect }) => {
  return (
    <div className="courseAcc">
      <Accordion>
        <AccordionItem key={"i"}>
          <AccordionHeader text={title} />
          <AccordionPanel className="bg-shardeumBlue">
            {chapters.map((chapter, i) => (
              <div
                // className="cursor-pointer mb-2 gap-5"
                key={i}
                onClick={() => setCurrentChapter({ moduleIndex: moduleIndex, chapterIndex: i })}
                className={`cursor-pointer ${currentChapter.chapterIndex === i ? "text-shardeumOrange" : ""}`}
              >
                <div class="flex items-center pt-2  mr-4">
                  {/* <div className="rounded-full bg-white w-7 h-7">
                  <img src={lock} />
                </div> */}
                  <div className="rounded-full bg-white w-7 h-7">
                    <img src={tick} />
                  </div>
                  {/* <div className="rounded-full bg-transparent border-2  w-7 h-7"></div> */}

                  <label
                    for="red-checkbox"
                    className={`ml-2 ${
                      currentChapter.chapterIndex === i ? "text-shardeumOrange  font-bold" : "text-white "
                    } cursor-pointer  `}
                  >
                    {chapter.title}
                  </label>
                </div>
              </div>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const lockSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="Lock">
      <path
        fill="#3a4cff"
        d="M7.83562431,1.50531768 L8,1.5 C9.3254834,1.5 10.4100387,2.53153594 10.4946823,3.83562431 L10.5,4 L10.5,5 L11.5,5 C12.3284271,5 13,5.67157288 13,6.5 L13,12.5 C13,13.3284271 12.3284271,14 11.5,14 L4.5,14 C3.67157288,14 3,13.3284271 3,12.5 L3,6.5 C3,5.67157288 3.67157288,5 4.5,5 L5.5,5 L5.5,4 C5.5,2.6745166 6.53153594,1.58996133 7.83562431,1.50531768 Z M11.5,6 L4.5,6 C4.22385763,6 4,6.22385763 4,6.5 L4,12.5 C4,12.7761424 4.22385763,13 4.5,13 L11.5,13 C11.7761424,13 12,12.7761424 12,12.5 L12,6.5 C12,6.22385763 11.7761424,6 11.5,6 Z M8,8.5 C8.55228475,8.5 9,8.94771525 9,9.5 C9,10.0522847 8.55228475,10.5 8,10.5 C7.44771525,10.5 7,10.0522847 7,9.5 C7,8.94771525 7.44771525,8.5 8,8.5 Z M8.14446001,2.50686658 L8,2.5 C7.22030388,2.5 6.57955132,3.09488808 6.50686658,3.85553999 L6.5,4 L6.5,5 L9.5,5 L9.5,4 C9.5,3.22030388 8.90511192,2.57955132 8.14446001,2.50686658 Z"
        class="color212121 svgShape"
      ></path>
    </svg>
  );
};

export default CourseAcordian;
