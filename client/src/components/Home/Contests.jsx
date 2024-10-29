import React from 'react'
import line3 from '../../assets/line-3.svg'
import line2 from '../../assets/line-2.svg'
import seperator from '../../assets/seperator.svg'
import image41 from '../../assets/image-41.png'
import chevron from '../../assets/chevron.svg'
import chevron2 from '../../assets/chevron-2.svg'
import arrowLeft from '../../assets/arrow-left.svg'
import { useState, useEffect } from 'react'
import { getLatestContest } from '../../utils/api/ContestAPI'
import SkeletonLoader from '../Courses/SkeletonLoader'
import { LazyLoadImage } from "react-lazy-load-image-component";
import ContestCard from '../Contest/Card'


const Contests = () => {
  const [latestContest, setLatestContest] = useState(null)
  useEffect(() => {
    getLatestContest().then(data => {
      if (data?.error == false) {
        setLatestContest(data.data)
      }
    })
  }, [])
  return (
    <div className="flex flex-col items-start gap-10 px-2 md:px-20 py-[100px] relative self-stretch w-full flex-[0_0_auto]">
      <div className="absolute w-[400px] h-[400px] top-[123px] right-10 pointer-events-none bg-[#3a59fe] rounded-[200px] blur-[300px] opacity-45" />
      <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] 
            bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-montserrat-bold text-transparent text-[20px] md:text-[30px] lg:text-[40px] tracking-[0] leading-[50px] whitespace-nowrap">
          Contests
        </div>
        <div className="inline-flex gap-4 flex-[0_0_auto] items-center relative">
          <img className="relative w-8 h-8 cursor-pointer" alt="Chevron" src={chevron2} />
          <img className="relative w-8 h-8 cursor-pointer" alt="Chevron" src={chevron} />
          <button className="all-[unset] box-border inline-flex justify-center gap-7 pl-7 pr-4 py-3 flex-[0_0_auto] bg-[#070707] rounded-lg border border-solid border-[#5d89ff80] items-center relative">
            <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              View All
            </div>
            <img className="relative w-6 h-[26px]" alt="Arrow left" src={arrowLeft} />
          </button>
        </div>
      </div>
      {latestContest ? <ContestCard id={latestContest._id} {...latestContest} /> : <SkeletonLoader></SkeletonLoader>}
    </div>
  )
}

export default Contests