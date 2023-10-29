import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
// import nav_logo from "../assets/nav-logo.png";
import navLogoWhite from "../assets/navlogoWhite.png";
import heartlogo from "../assets/heartlogo.svg";
import shardeum from "../assets/shardeum.svg";
import discord from "../assets/discord.svg";
import heroLogo from "../assets/heroLogo.png";
import twitter from "../assets/twitter.svg";
import github from "../assets/github.svg";

import { OrangeButton } from "./button/OrangeButton";

export default function Footer() {
  return (
    <div className=" inline-flex flex-col items-center gap-[64px] px-[100px] py-[40px] relative bg-shardeumBlue w-full  text-white ">
      <div className="flex w-full items-center justify-between relative flex-[0_0_auto]">
        <div className="inline-flex flex-col items-start gap-[16px] relative flex-[0_0_auto]">
          <div className="inline-flex flex-col items-start gap-[12px] relative flex-[0_0_auto]">
            <div className="inline-flex items-center gap-[10.5px] relative flex-[0_0_auto]">
              <div className="relative w-[263.03px] h-[30px] mr-[-2.00px]">
                <img className="absolute w-[123px] h-[23px] top-[4px] left-0" alt="Shardeum" src={shardeum} />
                <div className="absolute top-0 left-[131px] [font-family:'Satoshi_Variable-MediumItalic',Helvetica] font-medium italic text-white text-[30px] tracking-[0] leading-[30px] whitespace-nowrap">
                  University
                </div>
              </div>
            </div>
            <div className="relative w-fit [font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-collection-1-primary text-[16px]  text-white  tracking-[0] leading-[24px] whitespace-nowrap">
              The web3 development platform
            </div>
          </div>
          <div className="inline-flex items-start gap-[20px] relative">
            <img className="relative w-[32px] h-[32px]" alt="Discord icon svgrepo" src={discord} />
            <img className="relative w-[32px] h-[32px]" alt="Twitter icon svgrepo" src={twitter} />
            <img className="relative w-[32px] h-[32px]" alt="Github icon svgrepo" src={github} />
          </div>
        </div>
        <div className="flex flex-col w-[479px] items-start gap-[12px] relative">
          <div className="self-stretch mt-[-1.00px] [font-family:'Satoshi_Variable-Bold',Helvetica] font-bold text-collection-1-primary text-[20px] leading-[25px] relative tracking-[0]">
            Subscribe to Our Newsletter
          </div>
          <p className="relative self-stretch opacity-80 [font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-collection-1-primary text-[16px] tracking-[0] leading-[24px]">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="inline-flex items-start gap-[16px] relative flex-[0_0_auto]">
            <div className="flex flex-col w-[245px] h-[42px] items-start justify-center gap-[16px] px-[24px] py-[8px] relative bg-collection-1-primary rounded-[10px] overflow-hidden">
              <div className="flex flex-col w-[245px] h-[42px] items-start justify-center gap-[16px] px-[24px] py-[8px] relative bg-collection-1-primary rounded-[10px] overflow-hidden">
                <input
                  type="text"
                  className="relative w-fit  text-black  opacity-70 font-family:'Satoshi_Variable-Medium',Helvetica font-medium text-collection-1-text text-[16px] tracking-[0] leading-[24px] whitespace-nowrap border border-gray-200 rounded px-2 py-1.5"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <button className="flex w-[125px] h-[42px] items-center justify-center px-[32px] py-[22px] relative bg-collection-1-accent rounded-[10px] overflow-hidden all-[unset] box-border">
              <button className="relative w-fit mt-[-11.00px] mb-[-9.00px] ml-[-6.50px] mr-[-6.50px] [font-family:'Satoshi_Variable-Bold',Helvetica] font-bold text-collection-1-primary text-[16px] text-center tracking-[0] leading-[18px] whitespace-nowrap all-[unset] box-border">
                <OrangeButton title={"Subscribe"} style={"w-40 h-[40px]"} />
              </button>
            </button>
          </div>
        </div>
      </div>
      <div className="inline-flex flex-col items-center gap-[20px] relative flex-[0_0_auto]">
        <div className="relative w-full h-px bg-[#e8eaff] opacity-70" />
        <div className="flex w-[100vh] items-start justify-between relative flex-[0_0_auto]">
          <p className="relative w-fit  [font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-collection-1-primary text-[16px] tracking-[0] leading-[24px] whitespace-nowrap">
            © 2023 Shardeum, Inc. All rights reserved.
          </p>
          <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi_Variable-Medium',Helvetica] font-medium text-collection-1-primary text-[16px] text-right tracking-[0] leading-[24px] whitespace-nowrap">
            Made with ❤️ by Decentraclassroom.com
          </p>
          {/* <img className="absolute w-[17px] h-[15px] top-[4px] left-[1023px]" alt="Heart logo" src={heartlogo} /> */}
        </div>
      </div>
    </div>
  );
}
