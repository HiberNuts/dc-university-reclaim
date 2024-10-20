import React from 'react'
import image41 from '../../assets/image-41.png'
import twitter from '../../assets/twitter.svg'


const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-2 md:p-20 relative self-stretch w-full flex-[0_0_auto]">
      <div className="absolute w-[400px] h-[400px] top-[-47px] left-[520px] bg-[#4064cd] rounded-[200px] blur-[300px] opacity-45" />
      <div className="relative w-fit mt-[-1.00px] 
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-orbitron font-bold text-transparent  text-[20px] md:text-[30px] lg:text-[40px] tracking-[0] leading-[50px] whitespace-nowrap">
        Testimonials
      </div>
      {/* testimonials cards */}
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col items-start gap-5 relative flex-1 grow">
          <div className="flex flex-col items-center gap-7 p-7 self-stretch w-full flex-[0_0_auto] bg-[#121212] rounded-xl border border-solid border-[#79797b80] relative overflow-hidden">
            <div className="absolute w-[226px] h-[226px] top-[235px] left-[202px] bg-[#4064cd] rounded-[113px] blur-[169.5px] opacity-45" />
            <div className="absolute w-[350px] h-[344px] top-0 left-[140px] overflow-hidden">
              <div className="relative w-[1280px] h-[502px] top-[-158px] opacity-50 mix-blend-overlay">
                <img className="w-80 h-[93px] top-[158px] left-0 absolute object-cover"
                  alt="Image"
                  src={image41}
                />
                <img
                  className="w-80 h-[143px] top-[251px] left-0 absolute object-cover"
                  alt="Image"
                  src={image41}
                />
                <img
                  className="w-[30px] h-[93px] top-[158px] left-80 absolute object-cover"
                  alt="Image"
                  src={image41}
                />
                <img
                  className="w-[30px] h-[143px] top-[251px] left-80 absolute object-cover"
                  alt="Image"
                  src={image41}
                />
                <div className="absolute w-80 h-[251px] top-[-659px] left-[-1100px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                </div>
              </div>
            </div>
            <div className="flex h-10 items-center justify-between relative self-stretch w-full">
              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                <div className="relative w-10 h-10 rounded-[40px] border border-solid border-black bg-white bg-[url(assets/image-47.png)] z-50 bg-cover bg-[50%_50%]" />
                <div className="inline-flex flex-col items-start justify-center gap-1 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] font-gilroysemibold text-neutral-50 text-base tracking-[0] leading-4 whitespace-nowrap">
                    Rick Astley
                  </div>
                  <div className="relative w-fit font-gilroy text-[#9b9b9b] text-sm tracking-[0] leading-[14px] whitespace-nowrap">
                    Finance Controller
                  </div>
                </div>
              </div>
              <img className="relative w-9 h-9" alt="Twitter" src={twitter} />
            </div>
            <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
              Never gonna give you up, Never gonna let you down, Never gonna run around and desert you, Never gonna
              make you cry, Never gonna say goodbye, Never gonna tell a lie and hurt you, Never gonna give you up,
              Never gonna let you down, Never gonna run around and desert you,
            </p>
          </div>
          <div className="flex flex-col items-center gap-7 p-7 self-stretch w-full flex-[0_0_auto] bg-[#121212] rounded-xl border border-solid border-[#79797b80] relative overflow-hidden">
            <div className="absolute w-[226px] h-[226px] top-[177px] left-[202px] bg-[#4064cd] rounded-[113px] blur-[169.5px] opacity-45" />
            <div className="absolute w-[350px] h-[344px] top-0 left-[140px] overflow-hidden">
              <div className="relative w-[1280px] h-[502px] top-[-158px] opacity-50 mix-blend-overlay">
                <img className="w-80 h-[93px] top-[158px] left-0 absolute object-cover " alt="Image" src={image41} />
                <img className="w-80 h-[87px] top-[251px] left-0 absolute object-cover " alt="Image" src={image41} />
                <img
                  className="w-[30px] h-[93px] top-[158px] left-80 absolute object-cover "
                  alt="Image"
                  src={image41}
                />
                <img
                  className="w-[30px] h-[87px] top-[251px] left-80 absolute object-cover "
                  alt="Image"
                  src={image41}
                />
                <div className="absolute w-80 h-[251px] top-[-915px] left-[-1100px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                </div>
              </div>
            </div>
            <div className="flex h-10 items-center justify-between relative self-stretch w-full">
              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                <div className="relative w-10 h-10 rounded-[40px] border border-solid border-black bg-white bg-[url(assets/image-47.png)] z-50 bg-cover bg-[50%_50%]" />
                <div className="inline-flex flex-col items-start justify-center gap-1 relative flex-[0_0_auto]">
                  <div className="relative w-fit font-gilroysemibold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                    Rick Astley
                  </div>
                  <div className="relative w-fit font-gilroy text-[#9b9b9b] text-sm tracking-[0] leading-[14px] whitespace-nowrap">
                    Finance Controller
                  </div>
                </div>
              </div>
              <img className="relative w-9 h-9" alt="Twitter" src={twitter} />
            </div>
            <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
              Never gonna give you up, Never gonna let you down, Never gonna run around and desert you, Never gonna
              make you cry, Never gonna say goodbye, Never
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5 relative flex-1 grow">
          <div className="flex flex-col items-center gap-7 p-7 self-stretch w-full flex-[0_0_auto] bg-[#121212] rounded-xl border border-solid border-[#79797b80] relative overflow-hidden">
            <div className="absolute w-[226px] h-[226px] top-[177px] left-[202px] bg-[#4064cd] rounded-[113px] blur-[169.5px] opacity-45" />
            <div className="absolute w-[350px] h-[344px] top-0 left-[140px] overflow-hidden">
              <div className="relative w-[1280px] h-[502px] top-[-158px] opacity-50 mix-blend-overlay">
                <img className="w-80 h-[93px] top-[158px] left-0 absolute object-cover" alt="Image" src={image41} />
                <img className="w-80 h-[87px] top-[251px] left-0 absolute object-cover" alt="Image" src={image41} />
                <img
                  className="w-[30px] h-[93px] top-[158px] left-80 absolute object-cover"
                  alt="Image"
                  src={image41}
                />
                <img
                  className="w-[30px] h-[87px] top-[251px] left-80 absolute object-cover"
                  alt="Image"
                  src={image41}
                />
                <div className="absolute w-80 h-[251px] top-[-659px] left-[-1750px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                </div>
              </div>
            </div>
            <div className="flex h-10 items-center justify-between relative self-stretch w-full">
              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                <div className="relative w-10 h-10 rounded-[40px] border border-solid border-black bg-white bg-[url(assets/image-47.png)] z-50 bg-cover bg-[50%_50%]" />
                <div className="inline-flex flex-col items-start justify-center gap-1 relative flex-[0_0_auto]">
                  <div className="relative w-fit font-gilroysemibold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                    Rick Astley
                  </div>
                  <div className="relative w-fit font-gilroy text-[#9b9b9b] text-sm tracking-[0] leading-[14px] whitespace-nowrap">
                    Finance Controller
                  </div>
                </div>
              </div>
              <img className="relative w-9 h-9" alt="Twitter" src={twitter} />
            </div>
            <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
              Never gonna give you up, Never gonna let you down, Never gonna run around and desert you, Never gonna
              make you cry, Never gonna say goodbye, Never
            </p>
          </div>
          <div className="flex flex-col items-center gap-7 p-7 self-stretch w-full flex-[0_0_auto] bg-[#121212] rounded-xl border border-solid border-[#79797b80] relative overflow-hidden">
            <div className="absolute w-[226px] h-[226px] top-[235px] left-[202px] bg-[#4064cd] rounded-[113px] blur-[169.5px] opacity-45" />
            <div className="absolute w-[350px] h-[344px] top-0 left-[140px] overflow-hidden">
              <div className="relative w-[1280px] h-[502px] top-[-158px] opacity-50 mix-blend-overlay">
                <img className="w-80 h-[93px] top-[158px] left-0 absolute object-cover" alt="Image" src={image41} />
                <img
                  className="w-80 h-[143px] top-[251px] left-0 absolute object-cover"
                  alt="Image"
                  src={image41}
                />
                <img
                  className="w-[30px] h-[93px] top-[158px] left-80 absolute object-cover"
                  alt="Image"
                  src={image41}
                />
                <img
                  className="w-[30px] h-[143px] top-[251px] left-80 absolute object-cover"
                  alt="Image"
                  src={image41}
                />
                <div className="absolute w-80 h-[251px] top-[-859px] left-[-1750px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                  <img className="w-80 h-[251px] top-0 left-0 absolute object-cover" alt="Image" src={image41} />
                </div>
              </div>
            </div>
            <div className="flex h-10 items-center justify-between relative self-stretch w-full">
              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                <div className="relative w-10 h-10 rounded-[40px] border border-solid border-black bg-white bg-[url(assets/image-47.png)] z-50 bg-cover bg-[50%_50%]" />
                <div className="inline-flex flex-col items-start justify-center gap-1 relative flex-[0_0_auto]">
                  <div className="relative w-fit font-gilroysemibold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                    Rick Astley
                  </div>
                  <div className="relative w-fit font-gilroy text-[#9b9b9b] text-sm tracking-[0] leading-[14px] whitespace-nowrap">
                    Finance Controller
                  </div>
                </div>
              </div>
              <img className="relative w-9 h-9" alt="Twitter" src={twitter} />
            </div>
            <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
              Never gonna give you up, Never gonna let you down, Never gonna run around and desert you, Never gonna
              make you cry, Never gonna say goodbye, Never gonna tell a lie and hurt you, Never gonna give you up,
              Never gonna let you down, Never gonna run around and desert you,
            </p>
          </div>
        </div>
        {/* end of testimonials cards */}
      </div>
    </div>
  )
}

export default Testimonials