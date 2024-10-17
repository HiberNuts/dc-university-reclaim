import { motion, useScroll } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../Carousel/Carousel";
import ContestCard from "../Card";
import GreenButton from "../../button/GreenButton";
import { CALENDAR_MONTH as CALENDER } from "../../../Constants/Assets";
import {
  upcomingContests,
  getPastContests,
} from "../../../utils/api/ContestAPI";
import { formatTimestamp } from "../../../utils/time";
import { generateSlug } from "../../../utils/generateSlug";
import Pagination from "../../Pagination/Pagination";
import PastContestCardLoader from "../ContestLoaders/PastContestCardLoader";
import AllContestLoader from "../ContestLoaders/AllContestLoader";
import vector from "../../../assets/vector.svg"
import { CourseCard } from "../../Home/CohortsAndLearning";
import DCButton from "../../button/DCButton";
import line from "../../../assets/line.svg"

export default function AllContests() {
  const [latestContests, setLatestContests] = useState([
    <AllContestLoader />,
    <AllContestLoader />,
    <AllContestLoader />,
  ]);
  const [pastContests, setPastContest] = useState([]);
  const navigate = useNavigate();
  //for pagination
  const [totalItems, setTotalItems] = useState(0);
  const contestsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [pastContestExists, setPastContestExists] = useState(true);
  useEffect(() => {
    upcomingContests().then((resp) => {
      if (resp.error == false)
        if (resp.data && resp.data.length == 0) {
          console.log(false);
          setLatestContests([]);
          return;
        }
      setLatestContests(
        resp.data.map((contest, index) => {
          return <ContestCard key={index} id={contest._id} {...contest} className={" w-[90%]"} />;
        })
      );
    });
  }, []);
  //USE EFFECT FOR PAGINATION
  useEffect(() => {
    setPastContest([]);
    getPastContests(currentPage, contestsPerPage).then((resp) => {
      if (resp.error == false) {
        setTotalItems(resp.data.totalItems);
        setPastContest(resp.data.pastContests.map((contest, index) => contest));
      } else {
        setPastContestExists(false);
      }
    });
  }, [currentPage]);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["0 3", "1 2"],
  });

  return (
    <div className="bg-black">
      <div className="flex justify-center items-center">
        <div className="relative text-center w-fit mt-[-1.00px] 
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-orbitron font-bold text-transparent text-[30px] tracking-[0] leading-[50px] whitespace-nowrap">
          Hop into our Contests
        </div>
      </div>
      {latestContests.length > 0 && (
        <div className="corousel-container  min-h-[500px] py-10 sm:py-0 px-2 flex justify-center items-center">
          <div className="h-[100%] w-full">
            <Carousel slides={latestContests} />
          </div>
        </div>
      )}
      <div className="py-5 ">
        <img className="relative w-full h-[42px]" alt="Vector" src={vector} />
      </div>
      <div className="past-contents-container  min-h-[300px] pt-5 md:pt-20 px-1 md:px-28 relative">
        <div className="absolute top-0 left-0">
          <LazyLoadImage
            className=" z-10 rotate-[60deg]"
            src={line}
          />
        </div>
        <div className="size-[400px] bg-[#4064CD] rounded-full absolute top-24 blur-[200px] left-1/2 -translate-x-1/2 "></div>
        <div className="flex justify-center items-center">
          <div className="relative text-center w-fit mt-[-1.00px] 
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text font-orbitron font-bold text-transparent text-[30px] tracking-[0] leading-[50px] whitespace-nowrap mb-10">
            Past Contest
          </div>
        </div>
        {pastContestExists ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 pb-10">
            {pastContests.length > 0
              ? pastContests.map((single) => (
                <CourseCard title={single.title} description={single?.description} image={single.image} date={single.endDate} btnContent={"View Details"}
                />
              ))
              : Array.from({ length: 3 }).map((_, index) => (
                <PastContestCardLoader className="my-10" />
              ))}


          </div>

        ) : (
          <div className="w-full flex items-center justify-center p-10">
            {/* <LazyLoadImage
              style={{ width: "50px", height: "50px" }}
              alt=""
              src="https://shardeum-university-storage.blr1.cdn.digitaloceanspaces.com/4238c25d47bc0b871b0b61ab6fcaeea6.png"
              width="280px"
            /> */}
            <p className="font-bold text-[30px] ml-5">No contests</p>
          </div>
        )}
        {pastContestExists && <div className="flex justify-center items-center pb-3">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={contestsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <br />
          <br />
          <br />
        </div>}
      </div>
    </div>
  );
}
