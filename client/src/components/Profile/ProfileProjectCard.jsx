const ProfileProjectCard=(props)=>{
    const colors=["#FF4C0F","#FF0098","#1EFFFA","#A4FF00"]
    return (
     <div className="h-[100px] border-[1px] rounded-[16px] grid grid-cols-6 gap-3 p-4 shadow-xl cursor-pointer hover:p-2 transition-padding duration-500 ease-in-out">
       <div className="rounded-[16px] w-full h-full" style={{backgroundColor:colors[props?.index]}}>
        </div>
       <div className="col-span-5 flex flex-col overflow-y-scroll">
             <p className="text-[15px] font-bold pb-1">{props?.title}</p>
             <p className="text-[13px] opacity-75">{props?.description}</p>
        </div>     
    </div>
    )
    return <div className="h-[275px] overflow-y-auto border rounded-[20px] w-[100%] col-span-1 cursor-pointer hover:w-[105%] transition-width duration-1000 ease-in-out" style={{boxShadow: "6px 6px 0px 0px #00000026"}}>

        <div className="w-full h-[128px] rounded-t-[20px] bg-[#FF4C0F] border-b-[2px]">

        </div>
        <div className="py-[16px] px-[20px]">
            <p className="text-[18px] font-bold">{props.title}</p>
            <p className="text-[16px] leading-[28px] font-[400] ">{props.description}</p>
        </div>

    </div>
}
export default ProfileProjectCard