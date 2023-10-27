import React, { useState, useEffect } from "react";
import SkeletonLoader from "./SkeletonLoader";
import { Toaster, toast } from "react-hot-toast";
import { getAllCourses } from "../../utils/PolybaseUtils";

import { motion } from "framer-motion";
import { slideAnimateVariants } from "../animate/animate";
import FeaturedCourseCard from "./featuredCourseCard/FeaturedCourseCard";

export default function AllCourses() {
  const [courseData, setcourseData] = useState([]);
  const [loader, setloader] = useState(true);
  const [searchNotFound, setsearchNotFound] = useState(false);

  const [query, setQuery] = useState("");

  const getCourseData = async () => {
    setloader(true);
    const data = await getAllCourses();
    let arr = [];
    data.forEach((d) => {
      arr.push(d.data);
    });
    setcourseData(arr);
    setloader(false);
  };

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <div className="flex justify-center ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full">
        <main>
          <section className="px-10 flex flex-col gap-24 pb-20">
            <div className="flex flex-col  items-center justify-center align-middle w-full">
              <div className="flex w-full flex-col align-middle justify-center text-center p-8">
                <motion.h1
                  className="text-[1.5rem] md:text-2xl font-bold mb-5"
                  variants={slideAnimateVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  custom={1}
                >
                  A broad selection of courses
                </motion.h1>
                <motion.p
                  className="hidden md:text-l md:block"
                  variants={slideAnimateVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  custom={3}
                >
                  Intersting videos with all the information you need to get started in the world of web3 and blockchain
                </motion.p>
              </div>

              {loader && <SkeletonLoader></SkeletonLoader>}
              <div className="w-[100%] flex justify-center align-middle">
                <div className="flex mb-6 w-[90%] md:w-[50%] h-11 justify-center align-middle ">
                  <input
                    className=" align-middle   w-full"
                    style={{
                      fontSize: "20px",
                      borderRadius: "50px",
                      fontFamily: "monospace",
                      background: "white",
                      padding: "20px",
                    }}
                    placeholder=" &#128270; Search course by title"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center content-center text-center bg-white md:rounded-[100px] rounded-[30px] md:py-20 py-10 text-black flex-wrap mb-10 md:container gap-8 md:content-center justify-center align-middle">
                {loader == false &&
                  courseData
                    .filter((course) => {
                      if (query == "") {
                        // setsearchNotFound(false);
                        return course;
                      } else if (course?.courseName?.toLowerCase().includes(query.toLowerCase())) {
                        // setsearchNotFound(false);
                        return course;
                      }
                    })
                    .map((course) => {
                      return <FeaturedCourseCard />;
                    })}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
