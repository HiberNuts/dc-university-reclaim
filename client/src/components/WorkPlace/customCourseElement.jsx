import React, { useEffect, useRef } from "react";

export const H1 = (props) => {
  const parentContainers = useRef([]);

  useEffect(() => {
    // Find all div elements with the 'data-oembed-url' attribute
    const divs = document.querySelectorAll("div[data-oembed-url]");

    divs.forEach((element, index) => {
      // Add the 'parent_container_iframe' class to the parent container
      element.classList.add("parent_container_iframe");

      // Find the first child of the div element
      const child = element.firstChild;

      if (child) {
        // Add the 'video_container_iframe' class to the child
        child.classList.add("video_container_iframe");

        // Find the first child of the child element (the iframe)
        const iframe = child.firstChild;

        if (iframe) {
          // Add the 'video_iframe' class to the iframe
          iframe.classList.add("video_iframe");
        }
      }

      // Store a reference to the parent container for later use (if needed)
      parentContainers.current[index] = element;
    });
  }, []);
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
  console.log(`w-[${extractedNumber}%]`);
  return (
    <div className="w-full flex justify-center align-middle items-center">
      <div className={`w-[${extractedNumber}%] items-center flex justify-center flex-col`}>{props?.children}</div>
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
