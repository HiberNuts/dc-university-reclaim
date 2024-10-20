import React from 'react';
import nftImage from '../../assets/nft-image.png'; // Replace with your actual NFT image
import polygon from '../../assets/polygon.png'
import ethereum from '../../assets/ethereum.png'
import nftbg from '../../assets/nft-bg.png'
import listicon from '../../assets/image-1.svg'

const ProofOfLearn = () => {
  return (
    <div className="flex flex-col items-center px-4 py-16 relative w-full bg-gray-900">
      {/* Background blur effect */}
      {/* polygon */}
      <div className="absolute w-[122px] h-[130px] top-[50%]  md:left-32 hidden lg:block">
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
        <div className="absolute w-[120px] h-[120px] top-[50%]  md:right-32 hidden lg:block">
          <div className="relative h-[120px] ">
            <div className="absolute w-[120px] h-[120px] top-0 left-0 bg-[#3a59fe] rounded-[60px] rotate-180 blur-[55.59px] opacity-80" />
            <img
              className="absolute w-[74px] h-[77px] top-2 left-[23px] object-cover"
              alt="Ethereum"
              src={ethereum}
            />
          </div>
        </div>

      <h2 className="lg:text-[40px] text-[20px] font-bold font-orbitron text-white mb-32 text-center">Introducing <span className='text-[#5d89ff]'>Proof Of Learn</span></h2>

    <div className='flex-col sm:flex-row flex mx-auto w-full items-center justify-center gap-[60px]'>
        {/* card 1 */}
        <div className='flex flex-col w-[412px] rounded-[20px] border border-[#5D89FF]/60'>
            <div className=' h-[200px] rounded-t-[20px] relative'>
                <img src={nftbg} alt="nftbg" className='w-full h-full object-cover' />
                <img src={nftImage} alt="nft" className='absolute -top-1/2 left-1/2 transform -translate-x-1/2 ' />
            </div>
            <div className='p-8 flex flex-col'>
                <p className='text-white text-[20px] font-bold'>NFTs</p>
                <ul className='text-white text-[16px] space-y-2'>
                <li className='flex items-start gap-2'>
                    <img src={listicon} alt="listicon" className='size-6' />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .</li>
                    <li className='flex items-start gap-2'>
                    <img src={listicon} alt="listicon" className='size-6' />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .</li>
                    <li className='flex items-start gap-2'>
                        <img src={listicon} alt="listicon" className='size-6' />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .</li>
                </ul>
            </div>

        </div>

        {/* card 2 */}
        <div className='flex flex-col w-[412px] rounded-[20px] border border-[#5D89FF]/60'>
            <div className='bg-[#5D89FF]/60 h-[200px] rounded-t-[20px]'>

            </div>
            <div className='p-8 flex flex-col'>
                <p className='text-white text-[20px] font-bold'>NFTs</p>
                <ul className='text-white text-[16px] space-y-2'>
                    <li className='flex items-start gap-2'>
                        <img src={listicon} alt="listicon" className='size-6' />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .</li>
                    <li className='flex items-start gap-2'>
                        <img src={listicon} alt="listicon" className='size-6' />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .</li>
                    <li className='flex items-center gap-2'>
                        <img src={listicon} alt="listicon" className='size-6' />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .</li>
                </ul>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ProofOfLearn;