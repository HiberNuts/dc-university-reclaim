import React, { Suspense, lazy } from "react";
import Unique from "./Unique";
import img1 from "../../assets/soonBG.svg"
import img2 from "../../assets/circle.svg"
import vector from "../../assets/vector.svg"
const Hero = lazy(() => import("./Hero"));
const NewHero = lazy(() => import("./NewHero"));
const CohortsAndLearning = lazy(() => import("./CohortsAndLearning"));
const Contests = lazy(() => import("./Contests"));
const KeyFeatures = lazy(() => import("./KeyFeatures"));
const Testimonials = lazy(() => import("./Testimonials"));
const JoinCommunity = lazy(() => import("./JoinCommunity"));
const FAQ = lazy(() => import("./FAQ"));
const Community = lazy(() => import("./Community"));
const FeatureCourses = lazy(() => import("./FeatureCourses"));
const FaqHome = lazy(() => import("./FaqHome"));
const Stats = lazy(() => import("./Stats"));
const ProofOfLearn = lazy(() => import("./ProofOfLearn"));
// const Contest = lazy(() => import('./Contest'))

export default function Main() {
  return (
    <Suspense
      fallback={<div className="w-screen bg-black h-screen items-center flex justify-center align-middle"></div>}
    >
      {/* <main className="w-full bg-shardeumWhite">
        <Hero />
        <Stats />
        <FeatureCourses />
        <div className="w-full mt-4 flex flex-col bg-shardeumWhite p-[12px] sm:p-[80px] text-black items-center  justify-center align-middle">
          <div className="relative w-full">
            <img src={img1} alt="Background" className="hidden sm:block w-full" />
            <img src={img2} alt="Background" className="sm:hidden w-full" />

          </div>
        </div>
        <Contest />
        <Unique />

        <Community />

        <FaqHome />
      </main> */}
      <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] bg-black">
        {/* new hero */}
        <NewHero />

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
