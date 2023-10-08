import React from "react";
import About from "./About";
import Courses from "./Courses";
import Explore from "./Explore";
import Start from "./Start";
import Why from "./Why";

import Truster from "./Truster";

export default function Main() {
  return (
    <main className=" w-[99vw] md:w-[99%] overflow-x-hidden">
      <Explore />
      <Why />

      <Truster></Truster>
      <About />
      <Start />
      <Courses />
    </main>
  );
}
