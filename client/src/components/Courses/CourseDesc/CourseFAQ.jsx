import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pb-4 mb-6 border border-solid border-[#5d89ff80] bg-gradient-to-b from-[#070707]/50 to-[#5D89FF]/30 rounded-lg">
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center pt-4 px-10 cursor-pointer"
      >
        <h3 className="text-white text-[20px] font-gilroy">{question}</h3>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#3A59FE]"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </motion.svg>
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.04, 0.62, 0.23, 0.98],
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <div className="px-10 pt-6 pb-3 rounded-b-lg">
              <p className="text-[#B1B0B9] text-lg font-gilroy">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CourseFAQ = ({ data }) => {
  // Provide mock data if `data` is empty or undefined
  const mockData = [
    {
      faqTitle: "What is this platform about?",
      faqAnswer: "This platform provides a wide range of learning opportunities powered by AI and modern technologies.",
    },
    {
      faqTitle: "How do I enroll in a course?",
      faqAnswer: "You can enroll by signing up and browsing the available courses in the catalog.",
    },
    {
      faqTitle: "Is there any certification?",
      faqAnswer: "Yes, we provide certifications upon successful completion of courses.",
    },
  ];

  const faqData = data && data.length > 0 ? data : mockData;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 relative">
      <div className="sm:size-[596px] size-[300px] rounded-full absolute top-8 left-1/2 -translate-x-1/2 bg-[#3A59FE] blur-[300px] opacity-50 z-0"></div>
      <h2 className="bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-orbitron font-bold text-transparent  lg:text-[40px] text-[20px] sm:text-[30px] tracking-[0] lg:leading-[50px] sm:leading-[40px] leading-[30px] whitespace-nowrap mb-10 text-center z-[999]">
        Frequently Asked Questions
      </h2>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.faqTitle} answer={item.faqAnswer} />
      ))}
    </div>
  );
};

export default CourseFAQ;
