import React from "react";

const FeaturedCourseCard = () => {
  return (
    <div className="w-[400px] font-satoshi flex flex-col border border-black p-[14.4px] rounded-[35px]">
      <div>
        <img
          className="rounded-[35px] h-[250px] object-center border border-black"
          src="https://gateway.lighthouse.storage/ipfs/QmToDciCFsxxcsrr5qJnszYVH1VWLCF5NSeeJsxZ9Xw3N2"
        />
      </div>
      <p className="text-[22px] mt-3 font-semibold">How do you clone a smart contract?</p>
      <div className="author flex mt-3 align-middle ">
        <img
          class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <p className="text-[22px] items-center text-center font-semibold ml-2">Raghav Jindal</p>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;
