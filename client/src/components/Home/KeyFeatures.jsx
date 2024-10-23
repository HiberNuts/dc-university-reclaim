import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import line4 from '../../assets/line-4.svg'
import image41 from '../../assets/image-41.png'
import midEllipse from '../../assets/mid-ellipse.svg'
import main from '../../assets/main.svg'
import overlay from '../../assets/overlay.svg'
import logo2 from '../../assets/logo-2.svg'
import icon1 from '../../assets/icon-1.svg'
import icon2 from '../../assets/icon-2.svg'
import icon3 from '../../assets/icon-3.svg'
import icon4 from '../../assets/icon-4.svg'
import icon6 from '../../assets/icon-6.svg'
import icon5 from '../../assets/icon-5.svg'

const KeyFeatures = () => {
  const features = [
    { title: 'Contests', icon: icon1, text: 'ELEVATE' },
    { title: 'Internships', icon: icon2, text: 'EARN' },
    { title: 'Jobs', icon: icon3, text: 'EXCEL' },
    { title: 'Courses', icon: icon4, text: 'CAR' },
    { title: 'Events', icon: icon3, text: 'CASH' },
    { title: 'Cohorts', icon: icon6, text: 'MONEY' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length)
      setNextIndex((prevIndex) => (prevIndex + 1) % features.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center gap-10 px-0 py-20 relative self-stretch w-full flex-[0_0_auto]">
      <img className="absolute w-[945px] h-[1567px] bottom-[-388px] left-0 pointer-events-none" alt="Line" src={line4} />
      <div className="relative w-fit mt-[-1.00px] bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-orbitron font-bold text-transparent lg:text-[40px] text-[30px] tracking-[0] leading-[50px] whitespace-nowrap">
        Key Features
      </div>
      <div className="relative self-stretch w-full h-[460px]">
        <div className="relative w-screen h-[460px] -left-40">
          <div className="absolute w-full h-[460px] top-0 left-0 ">
            <div className="lg:inline-flex  items-center lg:gap-9 gap-5 absolute lg:top-[34px] top-0 left-[496px] ">
              <div className="relative w-32 h-7 overflow-hidden b">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className=" w-fit font-gilroybold text-[#5d89ff] text-[28px] tracking-[3.36px] leading-7 whitespace-nowrap"
                  >
                    {features[currentIndex].text}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Feature cards */}
              <div className="flex lg:flex-row flex-col lg:gap-9 gap-5 ">
                {[currentIndex, nextIndex].map((index, i) => (
                  <div key={i} className="bg-gradient-to-bl from-[#0E3CC8]/50 to-[#1F1F1F]/50 rounded-lg px-8 pt-8 border border-blue-500/30 w-[400px]">
                    <AnimatePresence mode="wait">
                      <motion.h3
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl font-bold mb-3"
                      >
                        {features[index].title}
                      </motion.h3>
                    </AnimatePresence>
                    <p className="text-gray-400 mb-8">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco
                    </p>
                    <div className="bg-[#434343] h-28 rounded-t-[20px] flex items-center justify-center text-gray-500">
                      ILLUSTRATION
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute w-[460px] h-[460px] top-0 left-0">
              <div className="absolute w-[460px] h-[460px] top-0 left-0 rounded-[500px] overflow-hidden">
                <div className="relative w-[250px] h-[250px] top-[105px] left-[105px] bg-[#5d89ff] rounded-[125.11px] blur-[337.13px]" />
              </div>
              <img
                className="absolute w-[460px] h-[460px] top-0 left-0"
                alt="Mid ellipse"
                src={midEllipse}
              />
              <img className="absolute w-28 h-[142px] top-[159px] left-[348px]" alt="Main" src={main} />
              <img className="absolute w-[460px] h-[460px] top-0 left-0 opacity-50" alt="Overlay" src={overlay} />
              <img className="absolute w-[87px] h-[68px] top-[196px] left-[187px]" alt="Logo" src={logo2} />
              <div className="absolute w-[460px] h-[460px] top-0 left-0 overflow-hidden opacity-50">
                <div className="relative w-[2101px] h-[676px] opacity-5">
                  <img
                    className="w-[300px] h-[338px] top-0 left-40 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                  <img
                    className="w-[300px] h-[122px] top-[338px] left-40 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                </div>
              </div>
              
              {features.map((feature, index) => (
                <motion.img
                  key={index}
                  className="absolute w-[84px] h-[84px]"
                  src={feature.icon}
                  alt={`Icon ${index + 1}`}
                  animate={{
                    top: `${180 + 180 * Math.sin(2 * Math.PI * ((index - currentIndex + features.length) % features.length) / features.length)}px`,
                    left: `${180 + 180 * Math.cos(2 * Math.PI * ((index - currentIndex + features.length) % features.length) / features.length)}px`,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeyFeatures