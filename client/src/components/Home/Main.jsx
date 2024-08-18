import React, { Suspense, lazy } from "react";
import Unique from "./Unique";
import img1 from "../../assets/soonBG.svg"
import img2 from "../../assets/circle.svg"
const Hero = lazy(() => import("./Hero"));
const Community = lazy(() => import("./Community"));
const FeatureCourses = lazy(() => import("./FeatureCourses"));
const FaqHome = lazy(() => import("./FaqHome"));
const Stats = lazy(() => import("./Stats"));
// const Contest = lazy(() => import('./Contest'))

export default function Main() {
  return (
    <Suspense
      fallback={<div className="w-screen bg-[#FCFAEF] h-screen items-center flex justify-center align-middle"></div>}
    >
      <main className="w-full bg-shardeumWhite">
        <Hero />
        <Stats />
        <FeatureCourses />
        <div className="w-full mt-4 flex flex-col bg-shardeumWhite p-[12px] sm:p-[80px] text-black items-center  justify-center align-middle">
          <div className="relative w-full">
            <img src={img1} alt="Background" className="hidden sm:block w-full" />
            <img src={img2} alt="Background" className="sm:hidden w-full" />

          </div>
        </div>
        {/* <Contest /> */}
        <Unique />

        <Community />

        <FaqHome />
      </main>
    </Suspense>
  );
}
