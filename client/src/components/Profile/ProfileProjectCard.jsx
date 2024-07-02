const ProfileProjectCard=(props)=>{
    return <div className="h-[275px] border rounded-[20px] col-span-1" style={{boxShadow: "6px 6px 0px 0px #00000026"}}>

        <div className="w-full h-[128px] rounded-t-[20px] bg-[#FF4C0F] border-b-[2px]">

        </div>
        <div className="py-[16px] px-[20px]">
            <p className="text-[18px] font-bold">{props.title}</p>
            <p className="text-[16px] leading-[28px] font-[400]">{props.description}</p>
        </div>

    </div>
}
export default ProfileProjectCard