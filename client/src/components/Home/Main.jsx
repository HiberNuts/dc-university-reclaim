import React from "react";
import FeatureCourses from "./FeatureCourses";
import Courses from "./Courses";
import Hero from "./Hero";
import Start from "./Start";
import Stats from "./Stats";


export default function Main() {
  return (
    <main className="w-full">
      <Hero />
      <Stats />
      <FeatureCourses />
      <Start />
      <Courses />
    </main>
  );
}
