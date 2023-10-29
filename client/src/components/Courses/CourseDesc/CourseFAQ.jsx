import React from "react";
import Acordian from "../../Accordian/Acordian";

const CourseFAQ = () => {
  return (
    <div className="w-full  flex justify-center items-center align-middle">
      <div className="w-[80%] flex flex-col">
        <p className="font-satoshi text-[48px] font-extrabold items-center text-center  ">
          Frequently Asked <span className="BlueGradientFade">Questions</span>
        </p>
        <div className="w-full flex justify-center align-middle items-center">
          <div className="learn-div grid md:grid-cols-2  flex-wrap  justify-between w-full mt-6 gap-10">
            <div className="w-full">
              <Acordian
                title={"What is Shardeum and why is it the best website?"}
                desc={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas ut sagittis tincidunt phasellus elit etiam cursus orci in. Id sed montes. "
                }
              />
            </div>
            <div className="w-full">
              <Acordian
                title={"What is Shardeum and why is it the best website?"}
                desc={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas ut sagittis tincidunt phasellus elit etiam cursus orci in. Id sed montes. "
                }
              />
            </div>
            <div className="w-full">
              <Acordian
                title={"What is Shardeum and why is it the best website?"}
                desc={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas ut sagittis tincidunt phasellus elit etiam cursus orci in. Id sed montes. "
                }
              />
            </div>
            <div className="w-full">
              <Acordian
                title={"What is Shardeum and why is it the best website?"}
                desc={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas ut sagittis tincidunt phasellus elit etiam cursus orci in. Id sed montes. "
                }
              />
            </div>
            <div className="w-full">
              <Acordian
                title={"What is Shardeum and why is it the best website?"}
                desc={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus euismod dictum egestas orci netus feugiat ut egestas ut sagittis tincidunt phasellus elit etiam cursus orci in. Id sed montes. "
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFAQ;
