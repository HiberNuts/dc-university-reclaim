import arrowLeft from '../../assets/arrow-left.svg'
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";



const DCButton = ({ btnContent = "", onClick, variant = "default" }) => {

    const [isHovered, setIsHovered] = useState(false);

    const ArrowAnimation = ({ variant, animate }) => (
        <div className={`w-[24px] h-[26px] flex items-center justify-center ${variant === 'default' ? 'bg-black' : 'bg-[#3A59FE]'} rounded-[4px] overflow-hidden flex-shrink-0`}>
            <motion.div
                className="flex flex-row space-x-2"
                animate={animate ? "hover" : "initial"}
                variants={{
                    initial: { x: -10 },
                    hover: { x: 10 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <FaArrowRight className='text-white' size={14} />
                <FaArrowRight className='text-white' size={14} />
            </motion.div>
        </div>
    );

   

    if (variant == "primary")
        return (
            <button 
                onClick={onClick} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="all-[unset] box-border inline-flex items-center justify-center gap-7 pl-7 pr-4 py-4 relative flex-[0_0_auto] bg-[#070707] rounded-lg"
            >
                <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                    {btnContent}
                </div>
                <ArrowAnimation variant={variant} animate={isHovered} />
            </button>
        )
    if (variant == "dark")
        return (
            <button 
                onClick={onClick} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`all-[unset] cursor-pointer box-border flex justify-between  pl-6 pr-3 py-3 self-stretch max-w-48 flex-[0_0_auto] bg-gradient-to-b  rounded-lg items-center relative from-black to-black `}
            >
                <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                    {btnContent}
                </div>
                <ArrowAnimation variant={variant} animate={isHovered} />
            </button>
        )
    return (
        <button 
            onClick={onClick} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`all-[unset] cursor-pointer box-border flex justify-between pl-6 pr-3 py-3 self-stretch  flex-[0_0_auto] bg-gradient-to-b  rounded-lg items-center relative from-[#3A59FE] to-decentraBlue`}
        >
            <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                {btnContent}
            </div>
            <ArrowAnimation variant={variant} animate={isHovered} />
        </button>
    )
}

export default DCButton;