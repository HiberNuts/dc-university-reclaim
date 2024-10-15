import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import GreenButton from "../button/GreenButton";

import { formatTimestamp, checkTimeLeft } from "../../utils/time";
import { generateSlug } from "../../utils/generateSlug";
import line3 from '../../assets/line-3.svg'
import line2 from '../../assets/line-2.svg'
import seperator from '../../assets/seperator.svg'
import image41 from '../../assets/image-41.png'

import arrowLeft from '../../assets/arrow-left.svg'
import DCButton from "../button/DCButton";
export default function ContestCard(props) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ status: false });

  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 1"] });

  const handleClick = async () => {
    navigate(`/contest/register/${generateSlug(props.title)}`);
  }

  useEffect(() => {
    if (props?.startDate) {
      const updateTimer = () => {
        const status = checkTimeLeft(props?.startDate, props?.endDate);
        setTimeLeft(status);
      };
      updateTimer();
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    }
  }, [props])
  return (
    <div className={`relative  h-[390px] [border-radius:12px_12px_20px_20px] overflow-hidden bg-[linear-gradient(180deg,rgb(7,7,7,0.5)_20%,rgb(92.65,136.59,255))] ${props?.className ?? 'w-full'}`}>
      <div className="absolute inset-0  border-2 border-transparent [border-image:linear-gradient(to_bottom,rgb(93,137,255),rgba(93,137,255,0))_1]">
      </div>

      <div className="relative w-[1280px] h-[390px] ">
        <img className="absolute w-[438px] h-[254px] top-[136px] left-[842px]" alt="Line" src={line3} />
        <img className="absolute w-[446px] h-[268px] top-[122px] left-[834px]" alt="Line" src={line2} />
        <div className="absolute w-[1280px] h-[390px] top-0 left-0 overflow-hidden opacity-60">
          <div className="relative h-[502px] opacity-15">
            <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
            <img className="w-80 h-[139px] top-[251px] left-0 absolute object-cover" alt="Image" src={image41} />
            <img className="w-80 h-[251px] top-0 left-80 absolute object-cover" alt="Image" src={image41} />
            <img className="w-80 h-[139px] top-[251px] left-80 absolute object-cover" alt="Image" src={image41} />
            <img className="w-80 h-[251px] top-0 left-[640px] absolute object-cover" alt="Image" src={image41} />
            <img
              className="w-80 h-[139px] top-[251px] left-[640px] absolute object-cover"
              alt="Image"
              src={image41}
            />
            <img className="w-80 h-[251px] top-0 left-[960px] absolute object-cover" alt="Image" src={image41} />
            <img
              className="w-80 h-[139px] top-[251px] left-[960px] absolute object-cover"
              alt="Image"
              src={image41}
            />
          </div>
        </div>
        {/* contest card */}
        <div className="absolute w-[1200px] h-[330px] top-[30px] left-10 ">
          <div className="flex flex-col w-[756px] items-start gap-12 absolute top-7 left-[444px]">
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative self-stretch mt-[-1.00px] font-gilroybold text-white text-[30px] tracking-[0] leading-[30px]">
                {props?.title}
              </p>
              <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-lg tracking-[0] leading-[31.5px]">
                {props?.description.slice(0, 140) + (props?.description.length > 180 ? "..." : "")}
              </p>
            </div>
            <div className="gap-8 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto] rounded-xl">
                <div className="inline-flex flex-col items-start gap-2 relative self-stretch flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-gilroy text-[#efedf5] text-xs text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                    {"{"} DIFFICULTY LEVEL {"}"}
                  </div>
                  <div className="relative w-fit font-gilroysemibold text-neutral-50 text-xl text-center tracking-[0] leading-[30px] whitespace-nowrap">
                    {props.level}
                  </div>
                </div>
                <img className="relative flex-1 grow h-12" alt="Seperator" src={seperator} />
                <div className="inline-flex flex-col items-start gap-2 relative self-stretch flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-gilroysemibold text-[#efedf5] text-xs text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                    {"{"} PARTICIPANTS {"}"}
                  </div>
                  <div className="relative w-fit font-orbitron font-semibold text-neutral-50 text-xl text-center tracking-[0] leading-[30px] whitespace-nowrap">
                    {props.participants}
                  </div>
                </div>
                <img className="relative flex-1 grow h-12" alt="Seperator" src={seperator} />
                <div className="inline-flex flex-col items-start gap-2 relative self-stretch flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-gilroysemibold text-[#efedf5] text-xs text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                    {"{"} PRICE {"}"}
                  </div>
                  <div className="relative w-fit font-orbitron font-semibold text-neutral-50 text-xl text-center tracking-[0] leading-[30px] whitespace-nowrap">
                    $ {props?.prize}
                  </div>
                </div>
                <img className="relative flex-1 grow h-12" alt="Seperator" src={seperator} />
                <div className="inline-flex flex-col items-start gap-2 relative self-stretch flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-gilroysemibold text-[#efedf5] text-xs text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                    {"{"} ENDING IN {"}"}
                  </div>
                  <p className="relative w-fit font-orbitron font-semibold text-neutral-50 text-xl text-center tracking-[0] leading-[30px] whitespace-nowrap">
                    {timeLeft?.timeleft}
                  </p>
                </div>
              </div>
              <DCButton
                btnContent="Register"
                onClick={handleClick}
              />
            </div>
          </div>
          <div className="absolute w-[408px] h-[330px] top-0 left-0 bg-[#202020] rounded-[20px] overflow-hidden">
            <div className="relative w-[468px] h-[502px] top-[-30px] left-[-30px]">
              <div className="absolute w-[226px] h-[226px] top-[82px] left-[121px] bg-[#79797b] rounded-[113px] blur-[169.5px] opacity-45" />
              <div className="absolute w-[468px] h-[502px] top-0 left-0 overflow-hidden">
                <div className="relative w-[1280px] h-[502px] opacity-15">
                  <img
                    className="w-[290px] h-[221px] top-[30px] left-[30px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                  <img
                    className="w-[290px] h-[109px] top-[251px] left-[30px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                  <img
                    className="w-[118px] h-[221px] top-[30px] left-80 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                  <img
                    className="w-[118px] h-[109px] top-[251px] left-80 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                  <div className="absolute w-80 h-[251px] top-[553px] left-[-970px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                    <img
                      className="w-80 h-[251px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />
                    <img
                      className="w-80 h-[251px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />
                    <img
                      className="w-80 h-[251px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-[185px] left-[168px] opacity-50 font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                IMAGE/BANNER
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end of contest card */}
    </div>
  )
}