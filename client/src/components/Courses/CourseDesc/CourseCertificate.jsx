import React from "react";
import polygon from '../../../assets/polygon.png'
import ethereum from '../../../assets/ethereum.png'
import image41 from '../../../assets/image-41.png'
import line67 from '../../../assets/line-67.svg'
import line68 from '../../../assets/line-68.svg'
import line69 from '../../../assets/line-69.svg'
import line70 from '../../../assets/line-70.svg'
import logo2 from '../../../assets/logo-2.svg'
import nftbg from '../../../assets/nft-bg.png'
import GreenButton from "../../button/GreenButton";
import DCButton from "../../button/DCButton";




const CourseCertificate = ({ props, title }) => {


  return (
    <div className="relative self-stretch w-full rounded-[40px] [background:linear-gradient(180deg,rgba(7,7,7,0.5)_60%,rgba(93,137,255))]">
      <div className="relative  min-h-[687px] top-[-37px]">
        {/* box  */}

        <div className="mt-40 h-72">
          <div className="relative w-full h-72 flex items-center justify-center ">
            <div className="absolute w-[200px] h-[200px]  bg-[#3a59fe] rounded-[60px] rotate-180 blur-[100px] opacity-30" />

            <div className="relative w-[270px] h-[330px] z-10 top-5 ">
              <img className="absolute  w-full h-full rounded-t-xl " alt="Logo" src={props} />
              {/* <img className="absolute w-[262px] h-[210px] top-[70px] left-[89px] opacity-15 mix-blend-overlay" alt="Logo" src={image41} /> */}
              {/* <div className="absolute  h-14 top-[138px] left-0">
                <div className="top-[32px] left-[300px] rotate-180 absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
                <div className="top-[0px] left-[280px] rotate-180 absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
                <div className="top-[20px] left-[333px] rotate-180 absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
                <div className="top-[-50px] left-[356px] rotate-180 absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
                <div className="top-[-50px] left-[-66px] absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
                <div className="top-[0px] left-[-55px] absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
                <div className="top-[32px] left-[-33px] absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
                <div className="top-0 left-0 absolute w-1 h-1 bg-[#9eaeff] rounded-sm" />
              </div> */}
            </div>
            <div className="absolute top-24 w-[600px] h-[228px] rounded-[30px] border-t border-l border-r border-[#4064cd] z-0">

                <img src={nftbg} alt="nft bg" className="h-full w-full object-cover rounded-[30px]"/>
            </div>
            <div className="absolute w-[330px] h-72 top-0 left-[55px] bg-[#4064cd] rounded-[165px/144px] blur-[300px] opacity-50" />

          </div>
        </div>
        {/* polygon icon */}
        {/* <div className="absolute w-[122px] h-[130px] top-[10%] md:top-[25%] left-2 md:left-48">
          <div className="relative h-[130px]">
            <div className="absolute w-[120px] h-[120px] top-0 left-0 bg-[#3a59fe] rounded-[60px] rotate-180 blur-[55.59px] opacity-80" />
            <img
              className="absolute w-[84px] h-[84px] top-0 left-[3px] object-cover"
              alt="Polygon"
              src={polygon}
            />
          </div>
        </div> */}
        {/* ethereum */}
        {/* <div className="absolute w-[120px] h-[120px] top-[10%] md:top-[25%] right-2 md:right-48">
          <div className="relative h-[120px] ">
            <div className="absolute w-[120px] h-[120px] top-0 left-0 bg-[#3a59fe] rounded-[60px] rotate-180 blur-[55.59px] opacity-80" />
            <img
              className="absolute w-[74px] h-[77px] top-2 left-[23px] object-cover"
              alt="Ethereum"
              src={ethereum}
            />
          </div>
        </div> */}
        {/* line */}
        <img className="absolute w-[328px] h-[687px] top-0 right-0" alt="Line" src={line67} />
        <img className="absolute w-[158px] h-[463px] top-[122px] right-0" alt="Line" src={line68} />
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
        <div className="inline-flex flex-col items-center justify-center gap-5 px-2.5 mt-7 ">
          <div className="relative w-fit mt-[-1.00px] 
        bg-gradient-to-b from-[#ffffff] to-[#79797b] bg-clip-text font-orbitron font-bold text-transparent text-[20px]  lg:text-[40px] text-center tracking-[0] leading-[60px] whitespace-nowrap">
            Earn Your Certificate
          </div>
          <p className="pt-5 px-4 md:px-[276px] relative text-center font-gilroy text-[#b1b0b9] text-lg  tracking-[0] leading-[31.5px]">
          Complete the Ethereum Developer Bootcamp to ear an NFT Certificate. Complete the Ethereum Developer Bootcamp to ear an NFT Certificate.  Complete the Ethereum Developer Bootcamp to ear an 
          </p>
        </div>

        <div className="flex  justify-center mt-20">
        <DCButton btnContent="Start learning" />
        </div>
      </div>
    </div>
  );
};

export default CourseCertificate;
