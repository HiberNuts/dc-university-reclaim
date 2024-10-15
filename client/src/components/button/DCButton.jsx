import arrowLeft from '../../assets/arrow-left.svg'



const DCButton = ({ btnContent = "", onClick }) => {
    return (
        <button onClick={onClick} className="all-[unset] box-border flex justify-between pl-6 pr-3 py-3 self-stretch max-w-48 flex-[0_0_auto] bg-gradient-to-b from-[#3A59FE] to-[#5d89ff] rounded-lg items-center relative">
            <div className="relative w-fit font-gilroybold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                {btnContent}
            </div>
            <img className="relative w-6 h-[26px]" alt="Arrow left" src={arrowLeft} />
        </button>
    )
}

export default DCButton;