import arrowLeft from '../../assets/arrow-left.svg'



const DCButton = ({ btnContent = "", onClick, variant = "default" }) => {
    if (variant == "primary")
        return (
            <button onClick={onClick} className="all-[unset] box-border inline-flex items-center justify-center gap-7 pl-7 pr-4 py-4 relative flex-[0_0_auto] bg-[#070707] rounded-lg">
                <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                    {btnContent}
                </div>
                <img className="relative w-6 h-[26px]" alt="Arrow left" src={arrowLeft} />
            </button>
        )
    if (variant == "dark")
        return (
            <button onClick={onClick} className={`all-[unset] cursor-pointer box-border flex justify-between pl-6 pr-3 py-3 self-stretch max-w-48 flex-[0_0_auto] bg-gradient-to-b  rounded-lg items-center relative from-black to-black `}>
                <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                    {btnContent}
                </div>
                <img className="relative w-6 h-[26px]" alt="Arrow left" src={arrowLeft} />
            </button>
        )
    return (
        <button onClick={onClick} className={`all-[unset] cursor-pointer box-border flex justify-between pl-6 pr-3 py-3 self-stretch max-w-48 flex-[0_0_auto] bg-gradient-to-b  rounded-lg items-center relative from-[#3A59FE] to-[#5d89ff]`}>
            <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                {btnContent}
            </div>
            <img className="relative w-6 h-[26px]" alt="Arrow left" src={arrowLeft} />
        </button>
    )
}

export default DCButton;