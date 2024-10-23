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

const NewHero = () => {
    return (
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          {/* Blue background blur */}
          <div className="absolute w-[400px] h-[400px] top-[145px] left-[520px] bg-[#4064cd] rounded-[200px] blur-[300px] opacity-25" />

          <div className="flex flex-col items-center px-0 py-10 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative lg:w-[1280px] w-[700px] lg:h-[412px] h-[300px]  overflow-hidden">
              <div className="relative lg:h-[412px] h-[300px] ">
                <div className="absolute lg:w-[1280px] sm:w-[700px] w-[300px] lg:h-[412px] h-[300px] top-0 left-0 ">
                  <img
                    className="absolute lg:w-[1280px] sm:w-[700px] w-[300px] lg:h-[412px] h-[300px] top-0 left-0 "
                    alt="Gradient layer"
                    src={gradientLayer}
                  />
                </div>
              <div className="flex lg:w-[780px]  w-[420px] lg:h-[123px] h-[90px] items-center justify-between px-20 py-0 absolute lg:top-[289px] lg:left-[500px] sm:top-[210px] sm:left-[280px] rounded-xl overflow-hidden border border-solid border-[#5d89ff80] [background:linear-gradient(180deg,rgb(14,60,200,0.5),rgb(17.85,17.85,17.85))]">
                  <div className="absolute w-[226px] lg:h-[226px] md:h-[180px] h-[120px] top-[89px] left-[307px] bg-[#79797b] rounded-[113px] blur-[169.5px] opacity-45" />
                  <img className="absolute w-9 h-9 top-11 left-[722px] border border-solid border-[#5d89ff80]" alt="Elements" src={image1} />
                  <img className="absolute w-9 h-9 top-11 left-[19px] " alt="Elements" src={elements} />
                <div className="absolute lg:w-[780px] w-[300px] lg:h-[123px] md:h-[100px] h-[80px] top-0 left-0">
                    <div className="relative lg:w-[1280px] w-[300px] lg:h-[412px] h-[300px] -top-36 opacity-5">
                      <img className="w-80 h-[62px] top-36 left-0 absolute object-cover" alt="Image" src={image41} />
                      <img
                        className="w-80 h-[62px] top-[206px] left-0 absolute object-cover"
                        alt="Image"
                        src={image41}
                      />
                      <img className="w-80 h-[62px] top-36 left-80 absolute object-cover" alt="Image" src={image41} />
                      <img
                        className="w-80 h-[62px] top-[206px] left-80 absolute object-cover"
                        alt="Image"
                        src={image41}
                      />
                      <img
                        className="w-[140px] h-[62px] top-36 left-[640px] absolute object-cover"
                        alt="Image"
                        src={image41}
                      />
                      <img
                        className="w-[140px] h-[62px] top-[206px] left-[640px] absolute object-cover"
                        alt="Image"
                        src={image41}
                      />
                      <div className="absolute w-80 h-[206px] top-[2132px] left-[-1460px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                        <img className="absolute w-80 h-[206px] top-0 left-0 object-cover" alt="Image" src={image41} />
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex flex-col items-center gap-3 relative flex-[0_0_auto] mr-4 lg:mr-0">
                  <div className="relative w-fit lg:text-[32px] text-lg  font-orbitron text-neutral-50 text-center tracking-[0] leading-8 whitespace-nowrap">
                      40,000+
                    </div>
                    <div className="relative w-fit font-gilroysemibold text-[#b1b0b9] lg:text-sm text-[10px]  text-center tracking-[1.68px] leading-[14px] whitespace-nowrap">
                      {"{"} REACH {"}"}
                    </div>
                  </div>
                <div className="inline-flex flex-col items-center gap-3 relative flex-[0_0_auto] mr-4 lg:mr-0">
                    <div className="relative w-fit mt-[-1.00px] font-orbitron text-neutral-50 lg:text-[32px] text-lg  text-center tracking-[0] leading-8 whitespace-nowrap">
                      2,000+
                    </div>
                    <div className="relative w-fit font-gilroysemibold text-[#b1b0b9] lg:text-sm text-[10px]  text-center tracking-[1.68px] leading-[14px] whitespace-nowrap">
                      {"{"} COMMUNITY {"}"}
                    </div>
                  </div>
                  <div className="inline-flex flex-col items-center gap-3 relative flex-[0_0_auto] mr-4 lg:mr-0">
                    <div className="relative w-fit mt-[-1.00px] font-orbitron text-neutral-50 lg:text-[32px] text-lg  text-center tracking-[0] leading-8 whitespace-nowrap">
                      100+
                    </div>
            <div className="relative w-fit font-gilroysemibold text-[#b1b0b9] lg:text-sm text-[10px] text-center tracking-[1.68px] leading-[14px] whitespace-nowrap">
                      {"{"} VALIDATORS {"}"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:w-[1200px] w-[700px] h-[332px]  items-start justify-between absolute lg:top-10 lg:left-10 top-0 left-0">
                  <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto] pl-4 lg:pl-0">
                    <div className="relative w-fit  font-orbitron font-bold text-white lg:text-[50px]  sm:text-[24px] tracking-[5.00px] leading-[62.5px] ">
                      LEARN TO EARN
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TRANSFORM KNOWLEDGE
                    </div>
                    <p className="relative lg:w-[417px] w-[300px] font-gilroy text-white lg:text-lg text-sm tracking-[0] lg:leading-[31.5px]">
                      Empower your education. Learn, earn, and own your learning journey with blockchain-backed
                      certification.Empower your education. Learn, earn,
                    </p>
                  </div>
                  <DCButton btnContent="Explore" variant="dark" />
                </div>
                <img className="absolute lg:w-[103px] w-[60px] lg:h-28 h-[60px]  lg:top-[9px] lg:left-[566px] left-[50%]" alt="Cube" src={cube} />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-8 pt-4 pb-7 px-20 relative self-stretch w-full overflow-hidden flex-[0_0_auto]">
            <div className="relative w-fit font-gilroysemibold text-[#5d89ff] text-sm text-center tracking-[1.68px] leading-[14px] whitespace-nowrap">
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

export default NewHero;
