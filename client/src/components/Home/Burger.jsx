import React, { useState } from "react";

const Burger = ({ isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-shardeumOrange transition ease transform duration-300`;

  return (
    <button className="flex flex-col h-10 w-10 justify-center items-center group" onClick={() => setIsOpen(!isOpen)}>
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "rotate-45 translate-y-3 opacity-100" : "opacity-100"
        }`}
      />
      <div className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-100"}`} />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "-rotate-45 -translate-y-3 opacity-100" : "opacity-100"
        }`}
      />
    </button>
  );
};

export default Burger;
