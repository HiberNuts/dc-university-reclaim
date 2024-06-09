import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
export default function Problem(props) {
  return (
    <div className={`px-[40px] py-[64px] relative ${props.className}`}>
      <div className="flex justify-between items-center">

      <p className={`text-3xl font-bold text-[26px] ${props.darkTheme && "text-[#CAFFEF]"}`}>2. Set Intersection size at least Two</p>
      {props.darkTheme?<IoSunny className="text-white text-lg cursor-pointer absolute top-5 right-5" onClick={props.toggleTheme}/>
		:<IoMoon className=" text-lg cursor-pointer absolute top-5 right-5" onClick={props.toggleTheme}/>
		}
      </div>
      <div className="rounded-[40px] border-[1px] py-[14px] px-[16px] w-[192px] mt-4">
            <span className="font-bold text-[16px]">Difficulty level:</span>
            <span className="font-[500] text-[16px] text-[#FF4C0F] ml-1">Hard</span>
      </div>
      <p className="text-lg leading-[31.5px] mt-5">
        In a quaint town, a central bulletin board is the heart of community
        communication. However, there's no way to track the popularity of each
        announcement. To solve this, the town creates the "Community Counter"
        smart contract. Whenever a resident interacts with an announcement—be it
        checking event details or reading a notice—the counter increments.
        Weekly, the town council reviews the counts to gauge community interest.
        This simple solution empowers the town to better serve its residents and
        strengthen community bonds. Your smart contract must contain the
        following public functions / constructor
      </p>
      <p className="text-lg leading-[31.5px] mt-5">
        In a quaint town, a central bulletin board is the heart of community
        communication. However, there's no way to track the popularity of each
        announcement. To solve this, the town creates the "Community Counter"
        smart contract. Whenever a resident interacts with an announcement—be it
        checking event details or reading a notice—the counter increments.
        Weekly, the town council reviews the counts to gauge community interest.
        This simple solution empowers the town to better serve its residents and
        strengthen community bonds. Your smart contract must contain the
        following public functions / constructor
      </p>
      <p className="text-lg leading-[31.5px] mt-5">
        In a quaint town, a central bulletin board is the heart of community
        communication. However, there's no way to track the popularity of each
        announcement. To solve this, the town creates the "Community Counter"
        smart contract. Whenever a resident interacts with an announcement—be it
        checking event details or reading a notice—the counter increments.
        Weekly, the town council reviews the counts to gauge community interest.
        This simple solution empowers the town to better serve its residents and
        strengthen community bonds. Your smart contract must contain the
        following public functions / constructor
      </p>
      <p className="text-lg leading-[31.5px] mt-5">
        In a quaint town, a central bulletin board is the heart of community
        communication. However, there's no way to track the popularity of each
        announcement. To solve this, the town creates the "Community Counter"
        smart contract. Whenever a resident interacts with an announcement—be it
        checking event details or reading a notice—the counter increments.
        Weekly, the town council reviews the counts to gauge community interest.
        This simple solution empowers the town to better serve its residents and
        strengthen community bonds. Your smart contract must contain the
        following public functions / constructor
      </p>
    </div>
    
  );
}
