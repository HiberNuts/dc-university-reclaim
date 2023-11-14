import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Acordian.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import whiteExpand from "../../assets/whiteArrow.svg";
import expand from "../../assets/expand.png";
import lock from "../../assets/lock.svg";
import tick from "../../assets/tick.svg";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../utils/generateSlug";

const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

function Accordion({ children, multiple, defaultIndex }) {
  const [activeIndex, setActiveIndex] = React.useState(
    multiple ? [defaultIndex] : defaultIndex
  );

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
    const isActive =
      multiple && Array.isArray(activeIndex)
        ? activeIndex.includes(index)
        : activeIndex === index;

    return (
      <AccordionContext.Provider value={{ isActive, index, onChangeIndex }}>
        {child}
      </AccordionContext.Provider>
    );
  });
}

function AccordionItem({ children }) {
  return (
    <div className="AccordionItem  text-white font-satoshi text-[18px] font-[800px]">
      {children}
    </div>
  );
}

function AccordionHeader({ text }) {
  const { isActive, index, onChangeIndex } = useAccordion();

  return (
    <motion.div
      className={`AccordionHeader ${isActive ? 'active' : ''} w-full `}
      onClick={() => onChangeIndex(index)}
    >
      <div
        style={{ fontFamily: 'satoshiVariable' }}
        className="flex  w-full justify-between align-middle h-full"
      >
        <span
          style={{ fontFamily: 'satoshiVariable' }}
          className="font-[500] text-[16px]"
        >
          {text}
        </span>{' '}
        <img
          className={`${
            isActive
              ? 'rotate-180 transition-all ease-in-out duration-500 '
              : ''
          } w-6 sm:w-6 h-6  mt-3 ml-2 fill-white sm:mt-0 sm:ml-0 `}
          src={whiteExpand}
        />
        {/* <FontAwesomeIcon icon={lockSVG} /> */}
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
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
        >
          <div className="AccordionPanel   bg-shardeumBlue text-white">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const CourseAcordian = ({
  module,
  currentChapter,
  setcurrentModule,
  handleChapterClick,
  setisModuleChanged,
  isModuleChanged,
}) => {
  const navigate = useNavigate();
  const [courseStatus, setcourseStatus] = useState("");
  console.log(currentChapter);
  console.log(module);

  return (
    <div className="courseAcc">
      <Accordion>
        <AccordionItem key={'i'}>
          <AccordionHeader text={module?.moduleTitle} />
          <AccordionPanel className="bg-shardeumBlue">
            {module?.chapter.map((chapter, i) => {
              return (
                <div>
                  <button
                    disabled={courseStatus == 'locked' ? true : false}
                    key={i}
                    onClick={() => {
                      handleChapterClick(chapter);
                      setcurrentModule(module);
                      setisModuleChanged(!isModuleChanged);
                    }}
                  >
                    <div className="flex items-center pt-2  mr-4">
                      {courseStatus === 'locked' ? (
                        <div className="rounded-full bg-gray-300 w-6 h-6">
                          <img src={lock} />
                        </div>
                      ) : courseStatus === 'complete' ? (
                        <div className="rounded-full bg-white w-6 h-6">
                          <img src={tick} />
                        </div>
                      ) : (
                        <div
                          className={`rounded-full ${
                            chapter._id == currentChapter ? "border-2 border-shardeumOrange" : "border-2 border-white "
                          } bg-shardeumBlue  w-6 h-6`}
                        ></div>
                      )}

                      <label
                        htmlFor="red-checkbox"
                        className={`ml-2 text-[16px] items-start text-start ${
                          chapter._id == currentChapter
                            ? "text-shardeumOrange  font-bold"
                            : `${courseStatus == "locked" ? "text-gray-300" : "text-white "}`
                        } cursor-pointer   `}
                      >
                        {chapter?.title}
                      </label>
                    </div>
                  </button>
                </div>
              );
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CourseAcordian;
