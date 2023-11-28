import React from 'react';
import './Home.css';

const Burger = ({ isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-1 z-2 w-5 my-1 bg-shardeumGreen rounded-full transition ease transform duration-300`;

  return (
    <div className="btnContainer">
      <button
        className="flex flex-col h-[50px] w-[50px] justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`${genericHamburgerLine}  ${
            isOpen ? 'rotate-45 translate-y-3  opacity-100 ' : 'opacity-100'
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? '-rotate-45 -translate-y-3 opacity-100' : 'opacity-100'
          }`}
        ></div>
      </button>
    </div>
  );
};

export default Burger;
