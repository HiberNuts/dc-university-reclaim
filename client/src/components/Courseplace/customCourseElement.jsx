import React from "react";

export const H1 = (props) => {
    console.log(props);
  return (
    <div className="w-full flex justify-center align-middle">
      <figure className="items-center flex flex-col justify-center align-middle">{props.children}</figure>
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
