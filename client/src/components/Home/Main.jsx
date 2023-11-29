import React, { Suspense, lazy } from "react";
const Hero = lazy(() => import("./Hero"));
const Community = lazy(() => import("./Community"));
const FeatureCourses = lazy(() => import("./FeatureCourses"));
const FaqHome = lazy(() => import("./FaqHome"));
const Stats = lazy(() => import("./Stats"));
import Unique from "./Unique";

export default function Main() {
  return (
    <Suspense
      fallback={
        <div className="w-screen bg-[#FCFAEF] h-screen items-center flex justify-center align-middle">SHARDEUM</div>
      }
    >
      <main className="w-full bg-shardeumWhite">
        <Hero />
        <Stats />
        <FeatureCourses />
        <Unique />

        <Community />

        <FaqHome />
      </main>
    </Suspense>
  );
}
