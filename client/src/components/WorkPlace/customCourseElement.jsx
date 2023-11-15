import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

export const CustomFigure = (props) => {
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
