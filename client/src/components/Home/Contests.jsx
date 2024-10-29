import React from 'react'
import chevron from '../../assets/chevron.svg'
import chevron2 from '../../assets/chevron-2.svg'
import arrowLeft from '../../assets/arrow-left.svg'
import { useState, useEffect } from 'react'
import { getLatestContest } from '../../utils/api/ContestAPI'
import SkeletonLoader from '../Courses/SkeletonLoader'
import { LazyLoadImage } from "react-lazy-load-image-component";
import ContestCard from '../Contest/Card'
import DCButton from '../button/DCButton'


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
          <DCButton variant='primary' btnContent='View All' onClick={() => window.location.href = "/contests"} />
        </div>
      </div>
      {latestContest ? <ContestCard id={latestContest._id} {...latestContest} /> : <SkeletonLoader></SkeletonLoader>}
    </div>
  )
}

export default Contests