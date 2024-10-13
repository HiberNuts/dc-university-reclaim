import React from "react";

const SkeletonLoader = () => {
  return (
    <div class="border border-blue-300 shadow rounded-md p-4  w-full mx-auto min-h-[250px]">
      <div class="animate-pulse flex flex-row space-x-4">
        <div class="h-[200px] bg-slate-700 flex-1"></div>

        <div class="flex-[3]">

          <div class="flex-1 space-y-6 py-1 mb-10">
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
    </div>
  );
};

export default SkeletonLoader;
