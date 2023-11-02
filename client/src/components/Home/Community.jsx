import React, { useRef, useState } from 'react';
import './Home.css';
import { OrangeButton } from '../button/OrangeButton';
import {
  faDiscord,
  faGithub,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import orangeShardeum from '../../assets/orangeShardeum.png';
import boat from '../../assets/boat.png';

import { useScroll } from 'framer-motion';
import { motion } from 'framer-motion';
import Acordian from '../Accordian/Acordian';

export default function Community() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const [isImageVisible, setImageVisible] = useState(false);

  const handleBlockClick = () => {
    setImageVisible(!isImageVisible);
  };

  return (
    <div>
      <div className="heroSection md:flex  items-center flex flex-col w-full justify-center align-middle text-white bg-shardeumBlue">
        <motion.div
          ref={scrollRef}
          style={{ scaleX: scrollYProgress * 500 }}
          className="absolute hidden md:visible md:flex left-44 mt-32"
        >
        </motion.div>
        <div className="mt-[50px] subHeading sm:w-[80%] text-center  flex justify-center align-middle leading-[36px] items-center text-white md:text-[18px] sm:[18px] text-[18px]">
          <span className="text-white md:w-[50%] w-[70%] font-satoshi ">
            What makes us unique
          </span>
        </div>
        <div className="items-center  sm:w-[80%] text-white heroText lg:text-[48px] md:mt-10 md:text-[48px] sm:text-[36px] text-[36px]">
          <p className="text-center items-center flex justify-center align-middle">
            More than just a learning platform
          </p>
        </div>
        <div className="subHeading sm:w-[80%] text-center  flex justify-center align-middle leading-[36px] items-center text-white md:text-[18px] sm:[18px] text-[18px]">
          <span className="text-white md:w-[50%] w-[70%] font-satoshi ">
            Connect with like-minded developers on our social platforms. Dive
            into discussions, share insights, and explore the world of Web3
            together. Let's learn, create, and evolve together!
          </span>
        </div>

        <div className="w-full flex justify-center align-middle items-center">
          <div className="learn-div grid md:grid-cols-1  flex-wrap  justify-between w-1/2 mt-6 gap-10">
            <div className="relative cursor-pointer">
              <div
                className="flex flex-col w-[600px] items-start gap-[16px] px-[24px] py-[20px] relative bg-white text-black rounded-[16px] overflow-hidden"
                onClick={handleBlockClick}
              >
                <div className="flex items-center gap-[32px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-bold  text-[20px]  leading-[30px] ">
                    Find your path
                  </div>
                </div>
                <p>
                  Web3 is a vast and complex ecosystem. Choose from hundreds of
                  materials to find the path that&#39;s right for you.
                </p>
              </div>
            </div>
            <div className="relative cursor-pointer">
              <div
                className="flex flex-col w-[600px] items-start gap-[16px] px-[24px] py-[20px] relative bg-white text-black rounded-[16px] overflow-hidden"
                onClick={handleBlockClick}
              >
                <div className="flex items-center gap-[32px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-bold  text-[20px]  leading-[30px] ">
                    World-class web3 instructors
                  </div>
                </div>
                <p>
                  Web3 is a vast and complex ecosystem. Choose from hundreds of
                  materials to find the path that&#39;s right for you.
                </p>
              </div>
            </div>
            <div className="relative cursor-pointer">
              <div
                className="flex flex-col w-[600px] items-start gap-[16px] px-[24px] py-[20px] relative bg-white text-black rounded-[16px] overflow-hidden"
                onClick={handleBlockClick}
              >
                <div className="flex items-center gap-[32px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-bold  text-[20px]  leading-[30px] ">
                    Learn and Earn
                  </div>
                </div>
                <p>
                  Web3 is a vast and complex ecosystem. Choose from hundreds of
                  materials to find the path that&#39;s right for you.
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-[600px] h-[518px] bg-[#c2c8ff] rounded-[16px] mt-8">
            {isImageVisible && (
              <img
                src={boat}
                alt="Description of the image"
                className="object-cover w-full h-full rounded-[16px]"
              />
            )}
          </div>
        </div>
      </div>

       
       <div className=" heroSection md:flex  items-center flex flex-col w-full justify-center align-middle text-white bg-shardeumBlue">
        <motion.div
          ref={scrollRef}
          style={{ scaleX: scrollYProgress * 500 }}
          className="absolute hidden md:visible md:flex left-44 mt-32"
        >
          <img src={orangeShardeum} />
        </motion.div>
        <div className="items-center  sm:w-[80%] text-white heroText lg:text-[48px] md:mt-10 md:text-[48px] sm:text-[36px] text-[36px]">
          <p className="text-center items-center flex justify-center align-middle">
            Be a part of an Active Community 🌟
          </p>
        </div>
        <div className="subHeading sm:w-[80%] text-center  flex justify-center align-middle leading-[36px] items-center text-white md:text-[18px] sm:[18px] text-[18px]">
          <span className="text-white md:w-[50%] w-[70%] font-satoshi ">
            Connect with like-minded developers on our social platforms. Dive
            into discussions, share insights, and explore the world of Web3
            together. Let's learn, create, and evolve together!
          </span>
        </div>
        <div className="sm:w-[80%] my-[40px]  md:flex-row flex-col flex   justify-center items-center md:gap-5 gap-y-5 md:justify-evenly align-middle">
          <OrangeButton
            icon={faDiscord}
            title={'Join Our Discord'}
            style={
              'lg:w-[250px] md:w-[250px] text-[18px] w-[80%] py-2 md:py-0  lg:h-[50px] hover:scale-105'
            }
          />
          <OrangeButton
            icon={faX}
            title={'Join Our Twitter'}
            style={
              'lg:w-[250px] md:w-[250px] text-[18px] w-[80%] py-2 md:py-0  lg:h-[50px] hover:scale-105'
            }
          />
          <OrangeButton
            icon={faGithub}
            title={'Join Our GitHub'}
            style={
              'lg:w-[250px] md:w-[250px] text-[18px] w-[80%] py-2 md:py-0  lg:h-[50px] hover:scale-105'
            }
          />
        </div>
        <img
          className="absolute hidden md:visible md:flex right-44 mb-32 rotate-45"
          src={orangeShardeum}
        />
      </div>      

    </div>
  );
}