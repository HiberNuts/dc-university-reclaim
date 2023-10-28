import React, { useRef } from "react";
import FeatureCourses from "./FeatureCourses";
import Hero from "./Hero";
import Stats from "./Stats";
import { motion } from "framer-motion";
import Community from "./Community";
import Acordian from "../Accordian/Acordian";

export default function Main() {
  const scrollRef = useRef(null);
  return (
    <main className="w-full">
      <Hero />
      <Stats />
      <FeatureCourses />
      <Community />

      <div className="w-full my-[80px] flex flex-col items-center justify-center align-middle gap-4">
        <p className="font-satoshi text-[48px] font-extrabold items-center text-center  ">
          Frequently Asked <span className="BlueGradientFade">Questions</span>
        </p>
        <div className="w-[80%] md:mt-10 gap-4 grid">
          <Acordian
            title={"What is Shardeum and why is it the best website?"}
            desc={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas ut sagittis tincidunt phasellus elit etiam cursus orci in. Id sed montes. "
            }
          />
          <Acordian
            title={"What is Shardeum and why is it the best website?"}
            desc={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas ut sagittis tincidunt phasellus elit etiam cursus orci in. Id sed montes. "
            }
          />
          <Acordian
            title={"What is Shardeum and why is it the best website?"}
            desc={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas ut sagittis tincidunt phasellus elit etiam cursus orci in. Id sed montes. "
            }
          />
          <Acordian
            title={"What is Shardeum and why is it the best website?"}
            desc={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas ut sagittis tincidunt phasellus elit etiam cursus orci in. Id sed montes. "
            }
          />
          <Acordian
            title={"What is Shardeum and why is it the best website?"}
            desc={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas ut sagittis tincidunt phasellus elit etiam cursus orci in. Id sed montes. "
            }
          />
        </div>
      </div>
    </main>
  );
}
