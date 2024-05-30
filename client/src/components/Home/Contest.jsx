import ContestCard from "../Contest/Card"

export default function Contest(){
  return(
    <div className="w-full mt-4 flex flex-col bg-shardeumWhite p-[12px] sm:p-[80px] text-black items-center  justify-center align-middle">
        <div className="flex flex-col w-full space-y-12">
           <p className="font-helvetica-neue-bold text-[64px]  items-center text-center  ">Upcoming Contest</p>
           <div className="flex justify-center items-center">
                <ContestCard></ContestCard>
           </div>
        </div>
    </div>
   )
}