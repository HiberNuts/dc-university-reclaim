import React, { useRef } from "react";
import FeatureCourses from "./FeatureCourses";
import Hero from "./Hero";
import Stats from "./Stats";
import { motion } from "framer-motion";
import Community from "./Community";

export default function Main() {
  const scrollRef = useRef(null);
  return (
    <main className="w-full">
      <Hero />
      <Stats />
      <FeatureCourses />
      <Community />
    </main>
  );
}
