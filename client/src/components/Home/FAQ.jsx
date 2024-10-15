// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const FAQItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="pb-4">
//     <motion.div
//       onClick={() => setIsOpen(!isOpen)}
//       className="flex justify-between items-center p-4 bg-[#1E2029] rounded-lg cursor-pointer"
      
//     >
//       <h3 className="text-white text-lg">{question}</h3>
//       <motion.svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="text-white"
//         animate={{ rotate: isOpen ? 180 : 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <polyline points="6 9 12 15 18 9"></polyline>
//       </motion.svg>
//     </motion.div>
//     <AnimatePresence initial={false}>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//           transition={{ 
//             duration: 0.3, 
//             ease: [0.04, 0.62, 0.23, 0.98],
//             opacity: { duration: 0.2 }
//           }}
//           className="overflow-hidden"
//         >
//           <div className="p-4 bg-[#282A36] rounded-b-lg">
//             <p className="text-white">{answer}</p>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </div>
//   );
// };

// const FAQ = () => {
//   const faqData = [
//     {
//       question: "What is Decentraclasses ?",
//       answer: "Decentraclasses is a platform for decentralized learning and education.",
//     },
//     {
//       question: "Am I at the right place if I want to learn and earn?",
//       answer: "Algorithmic trading is automated trading strategies that are based on a pre-described set of rules tested on past or historical data. These sets of rules are based on charts, indicators, technical analysis, or stock essentials.",
//     },
//     {
//       question: "What is Decentraclasses ?",
//       answer: "Decentraclasses is a platform for decentralized learning and education.",
//     },
//     {
//       question: "What is Decentraclasses ?",
//       answer: "Decentraclasses is a platform for decentralized learning and education.",
//     },
//     {
//       question: "What is Decentraclasses ?",
//       answer: "Decentraclasses is a platform for decentralized learning and education.",
//     },
//   ];

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 py-16">
//       <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
//       {faqData.map((faq, index) => (
//         <FAQItem key={index} question={faq.question} answer={faq.answer} />
//       ))}
//     </div>
//   );
// };

// export default FAQ;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



const faqData = [
  {
    question: "What is Decentraclasses ?",
    answer: "Decentraclasses is a decentralized learning platform that combines blockchain technology with education. It offers courses and learning materials in a decentralized manner, allowing for greater accessibility and transparency in the learning process."
  },
  {
    question: "Am I at the right place if I want to learn and earn?",
    answer: "Absolutely! Decentraclasses offers a unique 'learn and earn' model. As you complete courses and demonstrate your knowledge, you can earn rewards in the form of tokens or certificates. This incentivizes learning and allows you to gain both knowledge and potential financial benefits."
  },
  {
    question: "How does the platform ensure the quality of its courses?",
    answer: "Decentraclasses uses a community-driven approach to ensure course quality. Instructors are vetted, and courses undergo peer reviews. Additionally, student feedback and ratings play a crucial role in maintaining and improving the quality of educational content."
  },
  {
    question: "What types of courses are available on Decentraclasses?",
    answer: "Decentraclasses offers a wide range of courses, primarily focusing on blockchain technology, cryptocurrency, decentralized finance (DeFi), and related fields. However, the platform is expanding to include other subjects as well, always with a focus on emerging technologies and future-oriented skills."
  },
  {
    question: "How do I get started with Decentraclasses?",
    answer: "To get started, simply create an account on the Decentraclasses platform. Once registered, you can browse available courses, enroll in those that interest you, and begin your learning journey. Make sure to set up your wallet to receive rewards as you progress through your courses."
  }
];

const FAQItem = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqData.map((item, index) => (
        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
          <button
            className="w-full p-4 text-left flex justify-between items-center text-white"
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-medium">{item.question}</span>
            <motion.div
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5" />
            </motion.div>
          </button>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 bg-gray-700 text-gray-300">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
    <div className="w-full max-w-3xl">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Frequently Asked Questions</h1>
      <FAQItem />
    </div>
  </div>
  );
};

export default FAQ;