import React from 'react'
import line from '../../assets/line.svg'
import image41 from '../../assets/image-41.png'
import image52 from '../../assets/image-52.png'
import arrowLeft from '../../assets/arrow-left.svg'

const CohortsAndLearning = () => {
  return (
    <div className="flex flex-col items-start gap-10 pt-40 pb-[100px] px-20 relative self-stretch w-full flex-[0_0_auto]">
          <img className="absolute w-[1440px] h-[1089px] top-[-5px] left-0" alt="Line" src={line} />
          <div className="absolute w-[400px] h-[400px] top-[254px] left-[520px] bg-[#4064cd] rounded-[200px] blur-[300px] opacity-45" />
          <div className="relative w-fit mt-[-1.00px] 
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-orbitron font-bold text-transparent text-[40px] tracking-[0] leading-[50px] whitespace-nowrap">
            Interactive Learning and Cohorts
          </div>
          <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col w-[150px] items-center justify-center gap-8 p-5 relative rounded-[60px] overflow-hidden border border-solid border-[#5d89ff80] shadow-[0px_0px_10px_#3a59fe] [background:linear-gradient(180deg,rgba(14,60,200,0.5)_0%,rgb(17.85,17.85,17.85)_100%)]">
              <div className="relative w-fit mt-[-1.00px] font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                DeFi
              </div>
            </div>
            <div className="flex flex-col w-[150px] items-center justify-center gap-8 p-5 relative rounded-[60px] overflow-hidden border border-solid border-[#5d89ff80] [background:linear-gradient(180deg,rgb(7,7,7)_0%,rgb(17.85,17.85,17.85)_100%)]">
              <div className="relative w-fit mt-[-1.00px] font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                Solidity
              </div>
            </div>
            <div className="flex flex-col w-[150px] items-center justify-center gap-8 p-5 relative rounded-[60px] overflow-hidden border border-solid border-[#5d89ff80] [background:linear-gradient(180deg,rgb(7,7,7)_0%,rgb(17.85,17.85,17.85)_100%)]">
              <div className="relative w-fit mt-[-1.00px] font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                NFTs
              </div>
            </div>
            <div className="flex flex-col w-[150px] items-center justify-center gap-8 p-5 relative rounded-[60px] overflow-hidden border border-solid border-[#5d89ff80] [background:linear-gradient(180deg,rgb(7,7,7)_0%,rgb(17.85,17.85,17.85)_100%)]">
              <div className="relative w-fit mt-[-1.00px] font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                DAOs
              </div>
            </div>
            <div className="flex flex-col w-[150px] items-center justify-center gap-8 p-5 relative rounded-[60px] overflow-hidden border border-solid border-[#5d89ff80] [background:linear-gradient(180deg,rgb(7,7,7)_0%,rgb(17.85,17.85,17.85)_100%)]">
              <div className="relative w-fit mt-[-1.00px] font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                Zk Proofs
              </div>
            </div>
            <div className="flex flex-col w-[150px] items-center justify-center gap-8 p-5 relative rounded-[60px] overflow-hidden border border-solid border-[#5d89ff80] [background:linear-gradient(180deg,rgb(7,7,7)_0%,rgb(17.85,17.85,17.85)_100%)]">
              <div className="relative w-fit mt-[-1.00px] font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                Security
              </div>
            </div>
            <div className="flex flex-col w-[150px] items-center justify-center gap-8 p-5 relative rounded-[60px] overflow-hidden border border-solid border-[#5d89ff80] [background:linear-gradient(180deg,rgb(7,7,7)_0%,rgb(17.85,17.85,17.85)_100%)]">
              <div className="relative w-fit mt-[-1.00px] font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                Rust
              </div>
            </div>
          </div>
          {/*  course cards */}
          <div className="gap-7 flex items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col w-[408px] items-start justify-center gap-6 pt-5 pb-6 px-5 relative bg-[#121212] rounded-[20px] overflow-hidden border border-solid border-[#79797b80]">
              <div className="absolute w-[226px] h-[226px] top-[414px] left-[91px] bg-[#79797b] rounded-[113px] blur-[169.5px] opacity-45" />
              <div className="absolute w-[408px] h-[502px] top-0 left-0 overflow-hidden">
                <div className="relative w-[1280px] h-[502px] opacity-5">
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[223px] top-[251px] left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-[88px] h-[251px] top-0 left-80 absolute object-cover" alt="Image" src={image41} />
                  <img
                    className="w-[88px] h-[223px] top-[251px] left-80 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                  <div className="absolute w-80 h-[251px] top-[1317px] left-[-960px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                    <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                    <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                    <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  </div>
                </div>
              </div>
              <div className="relative self-stretch w-full h-[200px] bg-black rounded-xl overflow-hidden border border-solid border-[#79797b80]">
                <img className="absolute w-[368px] h-[200px] top-0 left-0 object-cover" alt="Image" src={image52} />
              </div>
              <div className="gap-4 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative self-stretch mt-[-1.00px] font-gilroybold text-white text-xl tracking-[0] leading-[30px]">
                  Learn Ethereum Programming: The Solidity Mastery Course
                </p>
                <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
                  Become a blockchain developer, with this complete course. Build Defi smart contracts.
                </p>
              </div>
              <button className="all-[unset] box-border flex justify-between pl-6 pr-3 py-3 self-stretch w-full flex-[0_0_auto] rounded-lg bg-gradient-to-b from-[#3A59FE] to-[#5d89ff]  items-center relative">
                <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                  Start Learning
                </div>
                <img className="relative w-6 h-[26px]" alt="Arrow left" src={arrowLeft} />
              </button>
            </div>
            <div className="flex flex-col w-[408px] items-start justify-center gap-6 pt-5 pb-6 px-5 relative bg-[#121212] rounded-[20px] overflow-hidden border border-solid border-[#79797b80]">
              <div className="absolute w-[226px] h-[226px] top-[414px] left-[91px] bg-[#79797b] rounded-[113px] blur-[169.5px] opacity-45" />
              <div className="absolute w-[408px] h-[502px] top-0 left-0 overflow-hidden">
                <div className="relative w-[1280px] h-[502px] opacity-5">
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[223px] top-[251px] left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-[88px] h-[251px] top-0 left-80 absolute object-cover" alt="Image" src={image41} />
                  <img
                    className="w-[88px] h-[223px] top-[251px] left-80 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                  <div className="absolute w-80 h-[251px] top-[1317px] left-[-1396px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                    <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                    <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                    <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  </div>
                </div>
              </div>
              <div className="relative self-stretch w-full h-[200px] bg-black rounded-xl overflow-hidden border border-solid border-[#79797b80]">
                <img className="absolute w-[368px] h-[200px] top-0 left-0 object-cover" alt="Image" src={image52} />
              </div>
              <div className="gap-4 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative self-stretch mt-[-1.00px] font-gilroybold text-white text-xl tracking-[0] leading-[30px]">
                  Learn Ethereum Programming: The Solidity Mastery Course
                </p>
                <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
                  Become a blockchain developer, with this complete course. Build Defi smart contracts.
                </p>
              </div>
              <button className="all-[unset] box-border flex justify-between pl-6 pr-3 py-3 self-stretch w-full flex-[0_0_auto] bg-gradient-to-b from-[#3A59FE] to-[#5d89ff]  rounded-lg items-center relative">
                <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                  Start Learning
                </div>
                <img className="relative w-6 h-[26px]" alt="Arrow left" src={arrowLeft} />
              </button>
            </div>
            <div className="flex flex-col w-[408px] items-start justify-center gap-6 pt-5 pb-6 px-5 relative bg-[#121212] rounded-[20px] overflow-hidden border border-solid border-[#79797b80]">
              <div className="absolute w-[226px] h-[226px] top-[414px] left-[91px] bg-[#79797b] rounded-[113px] blur-[169.5px] opacity-45" />
              <div className="absolute w-[408px] h-[502px] top-0 left-0 overflow-hidden">
                <div className="relative w-[1280px] h-[502px] opacity-5">
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[223px] top-[251px] left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-[88px] h-[251px] top-0 left-80 absolute object-cover" alt="Image" src={image41} />
                  <img
                    className="w-[88px] h-[223px] top-[251px] left-80 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                  <div className="absolute w-80 h-[251px] top-[1317px] left-[-1832px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                    <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                    <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                    <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  </div>
                </div>
              </div>
              <div className="relative self-stretch w-full h-[200px] bg-black rounded-xl overflow-hidden border border-solid border-[#79797b80]">
                <img className="absolute w-[368px] h-[200px] top-0 left-0 object-cover" alt="Image" src={image52} />
              </div>
              <div className="gap-4 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative self-stretch mt-[-1.00px] font-gilroybold text-white text-xl tracking-[0] leading-[30px]">
                  Learn Ethereum Programming: The Solidity Mastery Course
                </p>
                <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
                  Become a blockchain developer, with this complete course. Build Defi smart contracts.
                </p>
              </div>
              <button className="all-[unset] box-border flex justify-between pl-6 pr-3 py-3 self-stretch w-full flex-[0_0_auto] bg-gradient-to-b from-[#3A59FE] to-[#5d89ff]  rounded-lg items-center relative">
                <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                  Start Learning
                </div>
                <img className="relative w-6 h-[26px]" alt="Arrow left" src={arrowLeft} />
              </button>
            </div>
          </div>
        </div>
  )
}

export default CohortsAndLearning