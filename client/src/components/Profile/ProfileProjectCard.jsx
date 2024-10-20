const ProfileProjectCard = (props) => {
    const colors = ["#FF4C0F", "#FF0098", "#1EFFFA", "#A4FF00"]
    return (
        <div className="border-[0.1px] border-[#5D89FF] h-[156px] rounded-md grid grid-cols-6 gap-3 p-2 shadow-xl cursor-pointer hover:p-2 transition-padding duration-500 ease-in-out">

            <div className="col-span-5 flex flex-col overflow-y-scroll">
                <p className="text-[15px] font-bold pb-1">{props?.title}</p>
                <p className="text-[13px] opacity-75">{props?.description}</p>
            </div>
        </div>
    )

}
export default ProfileProjectCard