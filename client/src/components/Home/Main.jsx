import React, { Suspense, lazy } from "react";
const Hero = lazy(() => import("./Hero"));
const Community = lazy(() => import("./Community"));
const FeatureCourses = lazy(() => import("./FeatureCourses"));
const FaqHome = lazy(() => import("./FaqHome"));
const Stats = lazy(() => import("./Stats"));
import logo from "../../assets/navlogoBlack.png";

export default function Main() {
  return (
    <main className="w-full">
      <Suspense
        fallback={
          <div className="w-screen bg-[#FCFAEF] h-screen items-center flex justify-center align-middle">
            <img src={logo} />
          </div>
        }
      >
        <Hero />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <Stats />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <FeatureCourses />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <Community />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <FaqHome />
      </Suspense>
    </main>
  );
}
