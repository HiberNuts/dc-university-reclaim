import React, { Suspense, lazy } from "react";
import vector from "../../assets/vector.svg"
const Hero = lazy(() => import("./Hero"));
const CohortsAndLearning = lazy(() => import("./CohortsAndLearning"));
const Contests = lazy(() => import("./Contests"));
const KeyFeatures = lazy(() => import("./KeyFeatures"));
const Testimonials = lazy(() => import("./Testimonials"));
const JoinCommunity = lazy(() => import("./JoinCommunity"));
const FAQ = lazy(() => import("./FAQ"));
const ProofOfLearn = lazy(() => import("./ProofOfLearn"));
// const Contest = lazy(() => import('./Contest'))

export default function Main() {
  return (
    <Suspense
      fallback={<div className="w-screen bg-black h-screen items-center flex justify-center align-middle"></div>}
    >

      <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] bg-black">
        {/* new hero */}
        <Hero />

        {/* vector line */}
        <img className="relative w-[1440px] h-[42px]" alt="Vector" src={vector} />

        {/* cohorts and learning */}
        <CohortsAndLearning />

        {/* contests */}
        <Contests />

        {/* key features */}
        <KeyFeatures />

        {/* proof of learn */}
        <ProofOfLearn />

        {/* testimonials */}
        <Testimonials />

        {/* join community */}
        <JoinCommunity />

        {/* FAQ */}
        <FAQ />
      </div>
    </Suspense>
  );
}
