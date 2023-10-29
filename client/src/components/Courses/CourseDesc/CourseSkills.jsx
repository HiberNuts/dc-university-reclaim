import React from "react";
import { OrangeButton } from "../../button/OrangeButton";

const CourseSkills = () => {
  return (
    <div className="w-full  flex justify-center items-center align-middle">
      <div className="w-[80%] flex flex-col">
        <p className="font-satoshi text-[48px] font-extrabold items-center text-center  ">
          Skills You'll <span className="BlueGradientFade">Gain</span>
        </p>
        <div className="skills-div flex flex-wrap w-full justify-start md:justify-between mt-6 gap-10 items-start">
          <OrangeButton style={"h-10 px-10"} title={"Cryptography"} />
          <OrangeButton style={"h-10 px-5"} title={"Remix IDE"} />
          <OrangeButton style={"h-10 px-5"} title={"Cryptography"} />
          <OrangeButton style={"h-10 px-5"} title={"Cryptography"} />
          <OrangeButton style={"h-10 px-5"} title={"Cryptography"} />
        </div>
      </div>
    </div>
  );
};

export default CourseSkills;
