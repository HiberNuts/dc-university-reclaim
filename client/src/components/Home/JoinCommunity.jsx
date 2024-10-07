import React from 'react'
import polygon from '../../assets/polygon.png'
import ethereum from '../../assets/ethereum.png'
import image41 from '../../assets/image-41.png'
import line67 from '../../assets/line-67.svg'
import line68 from '../../assets/line-68.svg'
import line69 from '../../assets/line-69.svg'
import line70 from '../../assets/line-70.svg'
import logo2 from '../../assets/logo-2.svg'
import discordIconSvgrepoCom1 from '../../assets/discord-icon-svgrepo-com-1.svg'
import twitterIconSvgrepoCom2 from '../../assets/twitter-icon-svgrepo-com-2.svg'
import githubIconSvgrepoCom2 from '../../assets/github-icon-svgrepo-com-2.svg'
const JoinCommunity = () => {
  return (
    <div className="relative self-stretch w-full h-[650px] rounded-[40px] [background:linear-gradient(180deg,rgba(7,7,7,0.5)_60%,rgba(93,137,255))]">
    <div className="relative w-[1440px] h-[687px] top-[-37px]">
      <div className="absolute w-[440px] h-72 top-[71px] left-[500px]">
        <div className="relative h-72">
          <div className="relative w-[262px] h-[210px]">
            <img className="absolute w-full h-full top-[70px] left-[89px]" alt="Logo" src={logo2} />
            <div className="absolute w-full h-full top-[70px] left-[89px] bg-gradient-to-b from-transparent to-black opacity-90"></div>
            <img className="absolute w-[262px] h-[210px] top-[70px] left-[89px] opacity-15 mix-blend-overlay" alt="Logo" src={image41} />
          </div>
          <div className="absolute w-[330px] h-72 top-0 left-[55px] bg-[#4064cd] rounded-[165px/144px] blur-[300px] opacity-50" />
          <div className="absolute w-[440px] h-14 top-[138px] left-0">
            <div className="top-[52px] left-[370px] rotate-180 absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
            <div className="top-[7px] left-[381px] rotate-180 absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
            <div className="top-[39px] left-[403px] rotate-180 absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
            <div className="top-0 left-[436px] rotate-180 absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
            <div className="top-[52px] left-[66px] absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
            <div className="top-[7px] left-[55px] absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
            <div className="top-[39px] left-[33px] absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
            <div className="top-0 left-0 absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
          </div>
        </div>
      </div>
      {/* polygon icon */}
      <div className="absolute w-[122px] h-[130px] top-[202px] left-60">
        <div className="relative h-[130px]">
        <div className="absolute w-[120px] h-[120px] top-0 left-0 bg-[#3a59fe] rounded-[60px] rotate-180 blur-[55.59px] opacity-80" />
          <img
            className="absolute w-[84px] h-[84px] top-0 left-[3px] object-cover"
            alt="Polygon"
            src={polygon}
          />
        </div>
      </div>
      {/* ethereum */}
      <div className="absolute w-[120px] h-[120px] top-[270px] left-[1094px]">
        <div className="relative h-[120px] ">
          <div className="absolute w-[120px] h-[120px] top-0 left-0 bg-[#3a59fe] rounded-[60px] rotate-180 blur-[55.59px] opacity-80" />
          <img
            className="absolute w-[74px] h-[77px] top-2 left-[23px] object-cover"
            alt="Ethereum"
            src={ethereum}
          />
        </div>
      </div>
      {/* line */}
      <img className="absolute w-[328px] h-[687px] top-0 left-[1112px]" alt="Line" src={line67} />
      <img className="absolute w-[158px] h-[463px] top-[122px] left-[1282px]" alt="Line" src={line68} />
      <img className="absolute w-[292px] h-[687px] top-0 left-0" alt="Line" src={line69} />
      <img className="absolute w-[122px] h-[463px] top-[122px] left-0" alt="Line" src={line70} />
      {/* image */}
      {/* granny background */}
      <div className="absolute w-[1440px] h-[649px] top-[37px] left-0 mix-blend-overlay">
        <div className="relative w-[1468px] h-[673px] -top-6">
          <img className="w-[367px] h-[336px] top-0 left-0 absolute object-cover opacity-15 " 
          alt="Image" 
          src={image41} 
          />
          <img
            className="w-[367px] h-[336px] top-[336px] left-0 absolute object-cover opacity-15 "
            alt="Image"
            src={image41}
          />
          <img
            className="w-[367px] h-[336px] top-0 left-[367px] absolute object-cover opacity-15"
            alt="Image"
            src={image41}
          />
          <img
            className="w-[367px] h-[336px] top-[336px] left-[367px] absolute object-cover opacity-15 "
            alt="Image"
            src={image41}
          />
          <img
            className="w-[367px] h-[336px] top-0 left-[734px] absolute object-cover opacity-15"
            alt="Image"
            src={image41}
          />
          <img
            className="w-[367px] h-[336px] top-[336px] left-[734px] absolute object-cover opacity-15 "
            alt="Image"
            src={image41}
          />
          <img
            className="w-[339px] h-[336px] top-0 left-[1101px] absolute object-cover opacity-15"
            alt="Image"
            src={image41}
          />
          <img
            className="w-[339px] h-[336px] top-[336px] left-[1101px] absolute object-cover opacity-15 "
            alt="Image"
            src={image41}
          />
        </div>
      </div>
      {/* text for join our community */}
      <div className="inline-flex flex-col items-center justify-center gap-5 p-2.5 absolute top-[320px] left-[276px]">
        <div className="relative w-fit mt-[-1.00px] 
        bg-gradient-to-b from-[#ffffff] to-[#79797b] bg-clip-text font-orbitron font-bold text-transparent text-[48px] text-center tracking-[0] leading-[60px] whitespace-nowrap">
          Join Our Community
        </div>
        <p className="relative w-[868px] font-gilroy text-[#b1b0b9] text-lg text-center tracking-[0] leading-[31.5px]">
          Connect with like-minded developers on our social platforms. Dive into discussions, share insights, and
          explore the world of Web3 together. Let&#39;s learn, create, and evolve together!
        </p>
      </div>

      {/* join our community buttons */}
      <div className="inline-flex items-center justify-center gap-5 absolute top-[499px] left-[298px]">
        {/* discord */}
        <button className="all-[unset] box-border flex w-[260px] justify-center gap-7 pl-7 pr-4 py-4 bg-[#070707] rounded-lg border border-solid border-[#5d89ff80] items-center relative">
          <img className="relative w-6 h-6" alt="Discord icon svgrepo" src={discordIconSvgrepoCom1} />
          <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
            Join our Discord
          </div>
        </button>
        {/* twitter */}
        <button className="all-[unset] box-border inline-flex items-center justify-center gap-7 pl-7 pr-4 py-4 relative flex-[0_0_auto] bg-[#070707] rounded-lg border border-solid border-[#5d89ff80]">
          <img className="relative w-6 h-6" alt="Twitter icon svgrepo" src={twitterIconSvgrepoCom2} />
          <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
            Follow us on Twitter
          </div>
        </button>
        {/* github */}
        <button className="all-[unset] box-border inline-flex items-center justify-center gap-7 pl-7 pr-4 py-4 relative flex-[0_0_auto] bg-[#070707] rounded-lg border border-solid border-[#5d89ff80]">
          <img className="relative w-6 h-6" alt="Github icon svgrepo" src={githubIconSvgrepoCom2} />
          <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
            Follow us on Github
          </div>
        </button>
      </div>
    </div>
  </div>
  )
}

export default JoinCommunity