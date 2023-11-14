import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

export const H1 = (props) => {
  const extractNumberFromString = (inputString) => {
    const regex = /([\d.]+)/; // This regex captures one or more digits or dots
    const match = regex.exec(inputString);

    if (match) {
      const extractedNumber = match[0];
      return extractedNumber;
    } else {
      return "No match found";
    }
  };
  const extractedNumber = extractNumberFromString(props.style);
  console.log(props);
  return (
    <div className="w-full flex justify-center align-middle items-center">
      {props.class == "media" ? (
        <div className="w-full flex justify-center align-middle">
          <ReactPlayer
            width={"100%"}
           height={"500px"}
            controls={true}
            className="w-full"
            url={props?.children?.props?.url}
          />
        </div>
      ) : (
        <div className={`w-[${extractedNumber}%] items-center flex justify-center flex-col`}>{props?.children}</div>
      )}

      {/* <div className={`w-[23.21%]`}>{props?.children}</div> */}
    </div>
  );
};
export const H2 = (props) => {
  return <h1 className="font-bold text-[1.125rem] md:text-[1.875rem]">{props.children}</h1>;
};
export const H3 = (props) => {
  return <h1 className="font-bold text-[1.125rem] md:text-[1.5rem]">{props.children}</h1>;
};
export const H4 = (props) => {
  return <h1 className="font-bold text-[1.25rem] ">{props.children}</h1>;
};
export const UL = (props) => {
  return <ul className="list-disc px-5">{props.children}</ul>;
};
export const OL = (props) => {
  return <ol className="list-decimal px-5">{props.children}</ol>;
};
export const LI = (props) => {
  return <li className="">{props.children}</li>;
};
