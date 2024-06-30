import React, { useState } from 'react';
import LEFT from "../../assets/pagination_left.png";
import RIGHT from "../../assets/pagination_right.png"
const Pagination = ({ totalItems,itemsPerPage,currentPage=1,setCurrentPage}) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
      <div className="flex gap-[10px]">
        <div className='flex justify-center items-center'>
          <img src={LEFT} alt="Previous Page" onClick={() => handlePageClick(Math.max(currentPage - 1, 1))} />
        </div>
        <div>
          {
            Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`rounded-[10px] mx-1 px-4 py-2 ${index + 1 === currentPage ? 'bg-shardeumBlue text-white border-2 border-black' : 'bg-white text-shardeumBlue border-2 border-shardeumBlue'}`}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            ))
          }
        </div>
        <div  className='flex justify-center items-center'>
          <img src={RIGHT} alt="Next Page" onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))} />
        </div>
      </div>
     
  );
};

export default Pagination;
