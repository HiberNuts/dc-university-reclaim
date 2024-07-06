const AllContestLoader=()=>{
    return <div
    className="relative flex gap-[20px] card-container lg:h-[364px] bg-white border-[2px] shadow flex-col lg:flex-row justify-center align-middle w-full sm:w-[1240px] rounded-[16px] z-5 overflow-hidden"
    >
           <div className="flex-[2] overflow-hidden">

           <div class="h-full bg-slate-700 w-full rounded-lg"></div>

           </div>                    
           <div className="flex-[3] flex flex-col justify-between px-[20px]  py-[32px]">

           <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-700 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                <div class="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>

          <div class="flex-1 space-y-6 py-1 mb-[5rem]">
            <div class="h-2 bg-slate-700 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                <div class="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>

          
              
               
           </div> 
           
    </div>
}
export default AllContestLoader