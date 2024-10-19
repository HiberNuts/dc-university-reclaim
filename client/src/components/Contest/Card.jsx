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
    <div className={`relative border-[0.1px] border-[#5D89FF] [border-radius:12px_12px_20px_20px] overflow-hidden bg-[linear-gradient(180deg,rgb(7,7,7,0.5)_20%,rgb(92.65,136.59,255))] ${props?.className ?? 'w-full'}`}>


      <div className="absolute  w-full h-[390px] pointer-events-none">
        <img className="absolute w-[438px] h-[254px] bottom-10 right-10 pointer-events-none" alt="Line" src={line3} />
        <img className="absolute w-[446px] h-[268px] top-32 right-10 pointer-events-none" alt="Line" src={line2} />
        <div className="absolute w-full h-[390px] top-0 left-0 overflow-hidden opacity-60 pointer-events-none">
          <div className="relative h-[502px] opacity-15 pointer-events-none overflow-hidden">
            <img className=" h-[251px] top-0 left-0 absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[139px] top-[251px] left-0 absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[251px] top-0 left-[23%] absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[139px] top-[251px] left-[23%] absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[251px] top-0 left-[45%] absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[139px] top-[251px] left-[45%] absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[251px] top-0 left-[60%] absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[139px] top-[251px] left-[60%] absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[251px] top-0 left-[75%] absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[139px] top-[251px] left-[75%] absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[251px] top-0 left-[90%] absolute object-cover pointer-events-none" alt="Image" src={image41} />
            <img className=" h-[139px] top-[251px] left-[90%] absolute object-cover pointer-events-none" alt="Image" src={image41} />
          </div>
        </div>
      </div>

      {/* contest card */}
      <div className=" w-full p-4 md:p-10 grid grid-cols-6 gap-4">
        <div className="col-span-6 md:col-span-2  w-full flex justify-center items-center">
          <img src={props?.image} className="w-full h-full rounded-xl" />
        </div>
        <div className="col-span-6 md:col-span-4  md:pl-10 h-full ">
          <div className="flex flex-col items-start gap-8   top-7 ">
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative self-stretch mt-[-1.00px] font-gilroybold text-white text-[30px] tracking-[0] leading-[30px]">
                {props?.title}
              </p>
              <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-lg tracking-[0] leading-[31.5px] text-wrap">
                {props?.description.slice(0, 180) + (props?.description.length > 180 ? "..." : "")}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center w-full rounded-xl">
              <div className="flex flex-row">
                <div className="flex-1 inline-flex flex-col items-start gap-2">
                  <div className="font-gilroy text-[#efedf5] text-xs text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                    {"{"} DIFFICULTY LEVEL {"}"}
                  </div>
                  <div className="font-gilroysemibold text-neutral-50 text-xl text-center leading-[30px] whitespace-nowrap">
                    {props.level}
                  </div>
                </div>
                <div>
                  <img className="relative flex-1 grow h-12" alt="Seperator" src={seperator} />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex-1 inline-flex flex-col items-start gap-2">
                  <div className="font-gilroysemibold text-[#efedf5] text-xs text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                    {"{"} PARTICIPANTS {"}"}
                  </div>
                  <div className="font-orbitron font-semibold text-neutral-50 text-xl text-center leading-[30px] whitespace-nowrap">
                    {props.participants}
                  </div>
                </div>
                <div>
                  <img className="relative flex-1 grow h-12" alt="Seperator" src={seperator} />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex-1 inline-flex flex-col items-start gap-2">
                  <div className="font-gilroysemibold text-[#efedf5] text-xs text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                    {"{"} PRICE {"}"}
                  </div>
                  <div className="font-orbitron font-semibold text-neutral-50 text-xl text-center leading-[30px] whitespace-nowrap">
                    $ {props?.prize}
                  </div>
                </div>
                <div>
                  <img className="relative flex-1 grow h-12" alt="Seperator" src={seperator} />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex-1 inline-flex flex-col items-start gap-2">
                  <div className="font-gilroysemibold text-[#efedf5] text-xs text-center tracking-[1.44px] leading-3 whitespace-nowrap">
                    {"{"} ENDING IN {"}"}
                  </div>
                  <p className="max-w-[160px]   font-orbitron font-semibold text-neutral-50 text-xl text-center leading-[30px] whitespace-nowrap">
                    {timeLeft?.timeleft}
                  </p>
                </div>
              </div>
            </div>
            <DCButton
              btnContent="Register"
              onClick={handleClick}
              variant="dark"
            />
          </div>
        </div>

      </div>
    </div>

  )
}