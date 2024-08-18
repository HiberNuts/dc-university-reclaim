import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Acordian.scss";
import whiteExpand from "../../assets/whiteArrow.svg";

const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

function Accordion({ children, multiple, defaultIndex }) {
  const [activeIndex, setActiveIndex] = React.useState(multiple ? [defaultIndex] : 0);

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


const TickIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <rect x="0.7" y="0.7" width="22.6" height="22.6" rx="11.3" fill="#A4FF00" />
      <rect x="0.7" y="0.7" width="22.6" height="22.6" rx="11.3" stroke="black" stroke-width="1.4" />
      <path
        d="M16.2352 9.38831L10.4117 15.3177L7.76465 12.6225"
        stroke="black"
        stroke-width="1.69412"
        stroke-linecap="square"
      />
    </svg>
  );
};

function AccordionItem({ children }) {
  return <div className="AccordionItem bg-transparent  text-white text-[18px] font-[800px]">{children}</div>;
}

function AccordionHeader({ text }) {
  const { isActive, index, onChangeIndex } = useAccordion();

  return (
    <motion.div
      className={`py-2 px-0 border-b-2 border-white bg-shardeumBlue ${isActive ? "active" : ""} w-full`}
      onClick={() => onChangeIndex(index)}
    >
      <div className="flex w-full justify-between align-middle h-full">
        <span className="font-helvetica-neue-roman text-[18px]">{text}</span>
        <img
          className={` sm:w-[25px] h-[25px]  mt-3  sm:mt-0 transition-transform duration-300 ${isActive ? "rotate-0" : "rotate-180"
            }`}
          src={whiteExpand}
          alt="Expand"
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
          <div className="AccordionPanel mt-2 bg-shardeumBlue text-white font-helvetica-neue-roman text-[16px]">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const PreviewCourseAcc = ({
  module,
  currentChapter,
  setcurrentModule,
  handleChapterClick,
  setisModuleChanged,
  isModuleChanged,
  setisQuizSelected,
  isQuizSelected,
  userCourseProgress,
  setuserCourseProgress,
  moduleIndex,
  currentModuleAllChapterStatus,
  // setcurrentModuleAllChapterStatus,
  // checkModuleCoursesStatus,
  currentModule,
  currentQuiz,
  setcurrentQuiz,
}) => {


  return (
    <div className="courseAcc">
      <Accordion>
        <AccordionItem key={"i"}>
          <AccordionHeader text={module?.moduleTitle} />
          <AccordionPanel className="bg-shardeumBlue">
            {module?.chapter.map((chapter, i) => {
              return (
                <div>
                  <button
                    // disabled={disabled}
                    key={i}
                    onClick={() => {
                      setisQuizSelected(false);
                      handleChapterClick(chapter);
                      // checkModuleCoursesStatus({ module });
                      setcurrentModule(module);
                      setisModuleChanged(!isModuleChanged);
                      window.scroll(0, 0);
                    }}
                  >
                    <div className="flex items-center pt-2  mr-4">

                      <div className="rounded-full items-center w-[30px] h-[30px]">
                        <TickIcon />
                      </div>


                      <label
                        htmlFor="red-checkbox"
                        className={`ml-2 font-helvetica-neue-md text-[16px] items-start text-start  cursor-pointer   `}
                      >
                        {chapter?.title}
                      </label>
                    </div>
                  </button>
                </div>
              );
            })}
            <RenderQuiz
              module={module}
              isModuleChanged={isModuleChanged}
              setisQuizSelected={setisQuizSelected}
              isQuizSelected={isQuizSelected}
              setcurrentModule={setcurrentModule}
              setisModuleChanged={setisModuleChanged}
              currentModuleAllChapterStatus={currentModuleAllChapterStatus}
              // checkModuleCoursesStatus={checkModuleCoursesStatus}
              userCourseProgress={userCourseProgress}
              currentModule={currentModule}
              setcurrentQuiz={setcurrentQuiz}
              currentQuiz={currentQuiz}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );

};

const RenderQuiz = ({
  module,
  setisQuizSelected,
  isModuleChanged,
  isQuizSelected,
  setcurrentModule,
  setisModuleChanged,
  userCourseProgress,
  currentModule,
  currentQuiz,
  setcurrentQuiz,
}) => {
  // const [currentModuleStatus, setcurrentModuleStatus] = useState("");
  return (
    <div>
      <button
        onClick={() => {
          setisQuizSelected(true);
          setcurrentModule(module);
          setcurrentQuiz(module?.quizes);
          setisModuleChanged(!isModuleChanged);
        }}
      >
        <div className="flex items-center pt-2  mr-4">

          <div className="rounded-full  w-[30px] h-[30px]">
            <TickIcon />
          </div>


          <label
            htmlFor="red-checkbox"
            className={`ml-2 text-[16px] items-start text-start ${isQuizSelected && currentModule?.quizes[0]?.id == currentQuiz[0]?.id && module.id == currentModule.id
              ? "text-shardeumOrange font-bold"
              : "text-white"
              }    cursor-pointer`}
          >
            Quiz
          </label>
        </div>
      </button>
    </div>
  );
};

export default PreviewCourseAcc;
