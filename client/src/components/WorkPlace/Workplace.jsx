import React, { useEffect, useState } from 'react';
import Quiz from '../Quiz/Quiz';


const Workplace = () => {
  

  return (
    <div className='h-screen bg-red-200 text-slate-80 flex flex-col items-center justify-center p-3'>
      <Quiz />
    </div>
  );
};

export default Workplace;
