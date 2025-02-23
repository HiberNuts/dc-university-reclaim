import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Acordian.css";
import expand from "../../assets/expand.png";
import faq from "../../assets/faq.svg";

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
  return (
    <div className="AccordionItem font-helvetica-neue text-[18px] font-[100px] border-2  border-black">{children}</div>
  );
}

function AccordionHeader({ text }) {
  const { isActive, index, onChangeIndex } = useAccordion();

  return (
    <motion.div
      className={`AccordionHeader ${isActive ? "active" : ""} font-helvetica-neue-md w-full `}
      onClick={() => onChangeIndex(index)}
    >
      <div className="flex w-full justify-between align-middle h-full ">
        <div className="flex items-start justify-start align-top w-full h-full">
          <img src={faq} className="mr-3 mt-1 flex-col flex  " />
          <span className=" text-[20px] font-helvetica-neue-md">{text}</span>
        </div>

        <img
          className={`w-6 sm:w-6 h-6 mt-3 ml-2 sm:mt-0 sm:ml-0 transition-transform duration-300 ${
            isActive ? "rotate-0" : "rotate-180"
          }`}
          src={expand}
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
          <div className="AccordionPanel font-helvetica-neue-roman ">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Acordian = ({ title, desc }) => {
  return (
    <Accordion>
      <AccordionItem key={"i"}>
        <AccordionHeader text={title} />
        <AccordionPanel>{desc}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Acordian;
