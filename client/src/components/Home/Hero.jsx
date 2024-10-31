import React from 'react';
import gradientLayer from '../../assets/gradient-layer.png';
import image1 from '../../assets/image-1.svg';
import elements from '../../assets/elements.svg';
import image41 from '../../assets/image-41.png';
import image513 from '../../assets/image-51-3.png';
import image514 from '../../assets/image-51-4.png';
import image512 from '../../assets/image-51-2.png';
import image515 from '../../assets/image-51-5.png';
import arrowLeft from '../../assets/arrow-left.svg';
import cube from '../../assets/cube.png';
import { motion } from 'framer-motion';
import DCButton from '../button/DCButton';

const Hero = () => {
  return (
    <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
      {/* Blue background blur */}
      <div className="absolute w-[400px] h-[400px] top-[145px] left-[520px] bg-[#4064cd] rounded-[200px] blur-[300px] opacity-25" />
      <div className="flex flex-col items-center px-0 py-10 relative self-stretch w-full flex-[0_0_auto]">
        {/* Main container with responsive width/height */}
        <div className="relative w-full max-w-[360px] sm:max-w-[700px] lg:max-w-[1280px] h-[700px] sm:h-[300px] lg:h-[412px] overflow-hidden">
          <div className="relative h-full w-full">
            {/* Background gradient layer */}
            <div className="absolute inset-0">
              <img
                className="bg-image absolute w-full h-full object-cover"
                alt="Gradient layer"
                src={gradientLayer}
              />
            </div>

            {/* Main content section */}
            <div className="main-content relative z-10 flex flex-col h-full px-4 lg:px-10 pt-10">
              <div className="flex flex-col items-start gap-3 max-w-full lg:max-w-[1200px]">
                <h1 className="font-montserrat-bold text-white text-[32px] lg:text-[50px] tracking-[5.00px] leading-tight">
                  LEARN TO EARN
                  <br />
                  <span className="ml-12">TRANSFORM KNOWLEDGE</span>
                </h1>
                <p className="max-w-[300px] lg:max-w-[417px] font-gilroy text-white text-lg leading-relaxed lg:leading-[31.5px]">
                  Empower your education. Learn, earn, and own your learning journey with blockchain-backed
                  certification.Empower your education. Learn, earn,
                </p>
                <DCButton btnContent="Explore" variant="dark" className="mt-4" />
              </div>

              {/* Cube image */}
              <img
                className="absolute w-[80px] lg:w-[103px] h-[80px] lg:h-28 top-[5%] lg:top-[9px] -right-3 transform -translate-x-1/2 lg:left-[566px] lg:translate-x-0"
                alt="Cube"
                src={cube}
              />
            </div>

            {/* Stats container */}
            <div className="sub-content absolute bottom-0 left-1/2 transform -translate-x-1/2 lg:left-[500px] lg:translate-x-0 lg:bottom-[0px]
                         w-[360px] sm:w-[420px] lg:w-[780px] py-4 lg:py-0 lg:h-[123px]
                         flex flex-col lg:flex-row items-center justify-around lg:justify-between px-4 lg:px-20
                         rounded-xl border border-solid border-[#5d89ff80]
                         [background:linear-gradient(180deg,rgb(14,60,200,0.5),rgb(17.85,17.85,17.85))]">
              {/* Background elements */}
              <div className="absolute w-[226px] h-[120px] md:h-[180px] lg:h-[226px] top-[89px] left-[307px] bg-[#79797b] rounded-[113px] blur-[169.5px] opacity-45" />
              <img className="hidden lg:block absolute w-9 h-9 top-11 left-[722px] border border-solid border-[#5d89ff80]" alt="Elements" src={image1} />
              <img className="hidden lg:block absolute w-9 h-9 top-11 left-[19px]" alt="Elements" src={elements} />

              {/* Stats items */}
              <div className="stat-item flex flex-col items-center gap-2 lg:gap-3 mb-4 lg:mb-0">
                <div className="text-lg lg:text-[32px] font-montserrat-semibold text-neutral-50 text-center leading-8">
                  40,000+
                </div>
                <div className="text-[10px] lg:text-sm font-gilroysemibold text-[#b1b0b9] text-center tracking-[1.68px] leading-[14px]">
                  {"{"} REACH {"}"}
                </div>
              </div>

              <div className="stat-item flex flex-col items-center gap-2 lg:gap-3 mb-4 lg:mb-0">
                <div className="text-lg lg:text-[32px] font-montserrat-semibold text-neutral-50 text-center leading-8">
                  2,000+
                </div>
                <div className="text-[10px] lg:text-sm font-gilroysemibold text-[#b1b0b9] text-center tracking-[1.68px] leading-[14px]">
                  {"{"} COMMUNITY {"}"}
                </div>
              </div>

              <div className="stat-item flex flex-col items-center gap-2 lg:gap-3">
                <div className="text-lg lg:text-[32px] font-montserrat-semibold text-neutral-50 text-center leading-8">
                  100+
                </div>
                <div className="text-[10px] lg:text-sm font-gilroysemibold text-[#b1b0b9] text-center tracking-[1.68px] leading-[14px]">
                  {"{"} VALIDATORS {"}"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 pt-4 pb-7 px-20 relative self-stretch w-full overflow-hidden flex-[0_0_auto]">
        <div className="relative w-fit font-gilroysemibold text-decentraBlue text-sm text-center tracking-[1.68px] leading-[14px] whitespace-nowrap">
          RECOGNISED BY
        </div>
        <motion.div
          className="flex items-center gap-[60px] relative self-stretch w-full flex-[0_0_auto] opacity-50"
          animate={{
            x: [0, -1400],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {/* Duplicate the content to create a seamless loop */}
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center gap-[60px]">
              <div className="relative w-[100px] h-7 bg-[url(assets/image-51-8.png)] bg-cover bg-[50%_50%]" />
              <div className="relative w-[100px] h-7 bg-[url(assets/image-51-10.png)] bg-cover bg-[50%_50%]" />
              <div className="relative w-[100px] h-7 bg-[url(assets/image-51-7.png)] bg-cover bg-[50%_50%]" />
              <div className="relative w-[100px] h-7 bg-[url(assets/image-51.png)] bg-cover bg-[50%_50%]" />
              <div className="relative w-[100px] h-7 bg-[url(assets/image.png)] bg-cover bg-[50%_50%]" />
              <div className="relative w-[100px] h-7 bg-[url(assets/image-51-6.png)] bg-cover bg-[50%_50%]" />
              <div className="relative w-[100px] h-7 bg-[url(assets/image-51-9.png)] bg-cover bg-[50%_50%]" />
              <div className="relative w-[100px] h-7 bg-[url(assets/image-51-11.png)] bg-cover bg-[50%_50%]" />
              <div className="relative w-[100px] h-7">
                <img className="absolute w-20 h-7 top-0 left-0 object-cover" alt="Image" src={image513} />
              </div>
              <div className="relative w-[100px] h-7 overflow-hidden">
                <img className="absolute w-[102px] h-7 object-cover" alt="Image" src={image514} />
              </div>
              <div className="relative w-[100px] h-7 overflow-hidden">
                <img className="absolute w-[102px] h-7 object-cover" alt="Image" src={image512} />
              </div>
              <div className="relative w-[100px] h-7 overflow-hidden">
                <img className="absolute w-[102px] h-7 object-cover" alt="Image" src={image515} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
