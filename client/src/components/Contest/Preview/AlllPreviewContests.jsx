import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPreviewContest } from "../../../utils/api/ContestAPI";
import { motion, useScroll } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CALENDAR_MONTH as CALENDER } from "../../../Constants/Assets";
import { formatTimestamp } from "../../../utils/time";
import GreenButton from "../../button/GreenButton";
import { checkAuthinStrapi } from "../../../utils/api/ContestAPI";
import { ParentContext } from "../../../contexts/ParentContext";
const AllPreviewContests = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const { loggedInUserData } = useContext(ParentContext);
    useEffect(() => {
        getAllPreviewContest().then((response) => {
            if (response?.data) {
                setCourses(response?.data);
            }
        })

    }, [])
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["0 3", "1 2"] });
    useEffect(() => {
        if (loggedInUserData?.walletAddress)
            checkAuthinStrapi(loggedInUserData?.walletAddress).then((response) => {
                if (response.exists == false) {
                    navigate("/")
                }
            })
    }, [loggedInUserData])
    return (
        <div className="h-full px-5">
            {
                courses.map((single) =>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">

                        <motion.div
                            ref={scrollRef}
                            style={{
                                scale: scrollYProgress,
                                opacity: scrollYProgress,
                                boxShadow: "0px 4px 20px 0px rgba(195, 200, 255, 0.30)",
                            }}
                            className="flex flex-col card-container space-y-3 border-2  bg-white p-5 my-10 mx-5 shadow rounded-[20px] "
                        >
                            <div className="">
                                <LazyLoadImage
                                    className="w-full h-[300px]  rounded-[16px]"
                                    src={single.attributes.image.data.attributes.url}
                                />
                            </div>
                            <div>
                                <p className="text-[32px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold font-bold">
                                    {single.attributes.title}
                                </p>
                            </div>
                            <div>
                                <p className="text-[16px] mt-2 text-black font-helvetica-neue-roman leading-[25px] opacity-[70%]">
                                    {single?.attributes?.description?.slice(0, 100) + (single?.attributes.description?.length > 100 ? "..." : "")}
                                </p>
                            </div>
                            <div>
                                <p className="text-[14px] ">
                                    <span className="flex gap-x-1 pr-2">
                                        <div className="pt-[2px] leading-tight text-overflow-ellipsis font-helvetica-neue-bold">
                                            <LazyLoadImage
                                                src={CALENDER}
                                            />
                                        </div>
                                        <div className="">
                                            {formatTimestamp(single.attributes.startDate)}
                                        </div>
                                    </span>
                                </p>
                            </div>
                            <div className="pt-3 h-full flex items-end">
                                <GreenButton text={"Register Now"} isHoveredReq={true} onClick={() => navigate(`/previewcontests/${single?.id}`)} />
                            </div>
                        </motion.div>
                    </div>
                )
            }
        </div>
    )
}

export default AllPreviewContests;