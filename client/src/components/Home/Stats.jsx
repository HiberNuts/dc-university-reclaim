import React, { useRef } from "react";
import "./Home.css";


export default function Stats() {
  
  return (
    <div className="w-full gap-5 mt-[50px] mb-4 flex flex-row flex-wrap justify-evenly align-middle">
      <div className="statsCard">
        <span>10+</span>
        <p>Courses</p>
      </div>
      <div className="statsCard">
        <span>3+</span>
        <p>Mentors</p>
      </div>
      <div className="statsCard">
        <span>10,000+</span>
        <p>Students</p>
      </div>
    </div>
  );
}
