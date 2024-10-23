const ProfileProjectCard = (props) => {
    const colors = ["#FF4C0F", "#FF0098", "#1EFFFA", "#A4FF00"]
    return (
        <div className="border-[0.1px] border-[#5D89FF] h-[156px] rounded-[12px] grid grid-cols-6 gap-3 p-2 shadow-xl cursor-pointer hover:p-2 transition-padding duration-500 ease-in-out  [background:linear-gradient(180deg,rgb(19.6,19.6,20)_60%,rgba(58,89,254,0.3)_100%)]">

            <div className="col-span-5 flex flex-col overflow-y-scroll">
                <p className="text-[16px] font-gilroybold pb-1 text-[#B7C2FD]">{props?.title}</p>
                <p className="text-[14px] leading-[21px] text-[#B1B0B9]">{props?.description}</p>
            </div>
        </div>
    )

}
export default ProfileProjectCard