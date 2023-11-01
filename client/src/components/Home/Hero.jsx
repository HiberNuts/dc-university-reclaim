import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import heroLogoBlack from '../../assets/heroLogoBlack.png';
import { OrangeButton } from '../button/OrangeButton';
import cube from '../../assets/cube.png';

export default function Hero() {

  
  return (
    <div

      className="relative heroSection md:flex min-h-[100vh] z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue sm:rounded-b-[100px]"
    >
    
      <div className="absolute hidden md:visible lg:visible w-52 h-[88vh] inset-y-0 left-10  align-middle flex-col justify-center">
        <p className="backText h-full text-white items-center text-center z-50 ">
          SHARDEUM
        </p>
      </div>
      <div className="items-center text-white heroText lg:text-[80px] md:mt-10 md:text-[60px] sm:text-[45px] text-[35px]">
        <p className="text-center items-center flex justify-center align-middle">
          <img className="lg:mr-5" src={cube} /> Become a Next-Gen
        </p>
        <p className="text-center items-center flex justify-center align-middle">
          Web 3.0 Developer <img className="lg:ml-5" src={cube} />
        </p>
      </div>
      <div className="subHeading text-center w-full flex justify-center align-middle leading-[36px] items-center text-white md:text-[24px] sm:[24px] text-[20px]">
        <span className="text-white md:w-[50%] w-[70%] font-satoshi ">
          Ensure rapid development and build powerful Linearly Scalable Dapps
          with Shardeum
        </span>
      </div>
      <div className="w-full flex justify-center align-middle">
        <OrangeButton
          title={'Explore Courses'}
          style={'w-[250px] h-[50px] hover:scale-110'}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center align-middle">
        <div className="bg-white sm:px-[200px] sm:pt-[100px] sm:w-auto w-full pt-[100px] items-center flex justify-center align-middle rounded-t-full">
          <img
            className="w-[220px] heroLogo h-[200px]  items-center text-center"
            src={heroLogoBlack}
          />
        </div>
      </div>
      <div className="absolute hidden md:visible w-52 h-[88vh] inset-y-0 right-0   align-middle flex-col justify-center">
        <p className="backText h-full text-white items-center text-center z-50 ">
          MUEDRAHS
        </p>
      </div>
    </div>
  );
}
