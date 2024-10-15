import { LazyLoadImage } from "react-lazy-load-image-component";
import GreenButton from "../../button/GreenButton";
import toast, { Toaster } from "react-hot-toast";
import Leaderboard from "../Leaderboard/Leaderboard";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { ParentContext } from "../../../contexts/ParentContext";
import { formatTimestamp, checkTimeLeft } from "../../../utils/time";
import { generateSlug } from "../../../utils/generateSlug";
import { getContestByTitle, registerContest, alreadyRegistered, getLeaderboard } from "../../../utils/api/ContestAPI";
import ContestDetailsLoader from "../ContestLoaders/ContestDetailsLoader";
import { renderContent } from "../../../utils/mapRichText";
import DCButton from "../../button/DCButton";


export default function ContestRegsiter() {
  const { title } = useParams("title");
  const { loggedInUserData } = useContext(ParentContext);
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [contestID, setContestID] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [btn, setBtn] = useState("");
  const [timeLeft, setTimeLeft] = useState({ status: false });
  useEffect(() => {
    getContestByTitle(title).then((res) => {
      if (res.error == false) {
        setContest(res.data[0])
        setContestID(res.data[0]._id);

        //function to check if user already registered
        const checkUserAlreadyRegistered = async () => {
          await alreadyRegistered(loggedInUserData?.accessToken, res.data[0]._id).then((resp) => {
            if (resp.error == false && resp.message == "User already registered for the contest!")
              setBtn("Continue");
            else
              setBtn("Register Now")

          })
        }
        checkUserAlreadyRegistered();

      }

    }
    );
  }, [loggedInUserData]);

  const handleRegister = async () => {
    if (btn === "View Solution") {
      navigate(`/contest/${generateSlug(contest?.title)}/solution`)
      return;
    }
    await registerContest(loggedInUserData?.accessToken, contestID).then((resp) => {
      try {
        if (resp.error === false)
          navigate(`/editor/${title}/${resp.data.submissionId}`);
        else {
          if (resp.message === "Unauthorized")
            toast.error("Please login to Register for the contest!");
          else
            toast.error(resp.message);
        }
      } catch (error) {
        toast.error("Please login to continue")
      }
    })
  }
  const getLeaderboardRank = async () => {
    await getLeaderboard(contest?._id).then((resp) => {
      if (resp.error == false)
        setLeaderboard(resp.data);
    });
  }
  useEffect(() => {
    if (contest != null) {
      const updateTimer = () => {
        const status = checkTimeLeft(contest?.startDate, contest?.endDate);
        setTimeLeft(status);
      };
      updateTimer();
      const intervalId = setInterval(updateTimer, 1000);
      //FOR LEADERBOARD
      if (contest?.leaderboard == true)
        getLeaderboardRank();
      //CONDITION TO DISABLE REGISTER BUTTON AFTER CONTEST IS OVER
      if (contest?.endDate) {
        const givenDate = new Date(contest?.endDate);
        const now = new Date();

        if (givenDate < now) {
          setBtn("View Solution")
        }
      }
      return () => clearInterval(intervalId);
    }
  }, [contest, btn])
  return contest ? (
    <div className="bg-black pb-10">
      <Toaster />
      <div className="contest-header grid grid-cols-1 md:grid-cols-2 px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[50px] bg-black">
        <div className='order-2 md:order-1 pr-2 relative'>
          <div className="relative text-left w-fit mt-[-1.00px] 
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text text-wrap font-orbitron font-bold text-transparent text-[30px] tracking-[0] leading-[50px] whitespace-nowrap">
            {contest?.title}
          </div>
          <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
            {contest.description}
          </p>
          <div className="grid grid-cols-2 my-5">
            {
              !timeLeft.status &&
              <div className="flex flex-col">
                <p className="relative self-stretch font-semibold text-[#b1b0b9] text-[12px] tracking-[0] leading-7">
                  START:
                </p>
                <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
                  {formatTimestamp(contest.startDate)}</p>
              </div>
            }
            <div className="flex flex-col">
              <p className="relative self-stretch font-semibold text-[#b1b0b9] text-[12px] tracking-[0] leading-7">
                DIFFICULTY LEVEL:
              </p>
              <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
                {contest.level}</p>
            </div>
            {
              !timeLeft.status &&
              <div className="flex flex-col">
                <p className="relative self-stretch font-semibold text-[#b1b0b9] text-[12px] tracking-[0] leading-7">
                  END:
                </p>
                <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
                  {formatTimestamp(contest.endDate)}</p>
              </div>
            }
            <div className="flex flex-col">
              <p className="relative self-stretch font-semibold text-[#b1b0b9] text-[12px] tracking-[0] leading-7">
                PARTICIPANTS:
              </p>
              <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
                {contest.participants}</p>
            </div>
            {
              timeLeft.status &&
              <div className="flex flex-col">
                <p className="relative self-stretch font-semibold text-[#b1b0b9] text-[12px] tracking-[0] leading-7">
                  ENDS IN:
                </p>
                <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
                  {timeLeft?.timeleft}</p>
              </div>
            }

          </div>

          <div className='py-2 mt-10'>
            {
              btn != "" &&
              <DCButton
                btnContent={btn}
                onClick={handleRegister}
              />
            }
          </div>
          <div className="hidden lg:block absolute z-10 bottom-[2rem] right-[-30%] border-2 p-3 rounded-lg">
            <div className="text-[16px] text-right leading-[18px]  text-overflow-ellipsis font-helvetica-neue-bold">Prize Money</div>
            <div className="text-[42px] text-right leading-[42px]  text-overflow-ellipsis font-helvetica-neue-bold text-shardeumRed">$ {contest.prize}</div>
          </div>
        </div>
        <div className='order-1 md:order-2 flex justify-center md:justify-end items-center'>
          <LazyLoadImage
            className="h-[375px] py-2 rounded-[20px]"
            src={contest?.image}
          />
        </div>
      </div>
      {
        leaderboard.length > 0 &&
        <div className="px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[30px]">
          <div className="py-5">
            <p className="my-2 text-[64px]  leading-tight text-overflow-ellipsis font-helvetica-neue-bold">Leaderboard</p>
          </div>

          <Leaderboard data={leaderboard} />

        </div>
      }
      <div className="contest-details grid grid-cols-2 lg:grid-cols-3 px-5 sm:px-10 md:px-[50px] lg:px-[100px] py-[30px]">
        <div className='col-span-2 md:pr-8'>
          <div className='contest-details-title'>
            <div className="relative text-left w-fit mt-[-1.00px] 
          bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text text-wrap font-orbitron font-bold text-transparent text-[30px] tracking-[0] leading-[50px] whitespace-nowrap">
              Contest Details
            </div>
          </div>
          <div className='contest-details-description'>
            <p className="relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">
              {contest?.details}
            </p>
          </div>
          <div className='contest-details-rules py-5'>
            <p className="relative self-stretch font-semibold text-[#b1b0b9] text-[12px] tracking-[0] leading-7">RULES:</p>
            <ul className='mx-1'>
              {contest.rules.map((item, index) => (
                <React.Fragment key={index}>{renderContent(item)}</React.Fragment>
              ))}
            </ul>
          </div>
          <div className='contest-details-rules py-5'>
            <p className="relative self-stretch font-semibold text-[#b1b0b9] text-[12px] tracking-[0] leading-7">WINNINGS:</p>
            <ul className='mx-1'>
              {contest.warnings.map((item, index) => (
                <React.Fragment key={index}>{renderContent(item)}</React.Fragment>
              ))}

            </ul>
          </div>
        </div>
        <div className='col-span-1'></div>
      </div>
    </div>
  ) : (
    <ContestDetailsLoader />
  );
}
