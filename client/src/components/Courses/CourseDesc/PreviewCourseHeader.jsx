import React, { useContext, useEffect, useState } from "react";
import timeIcon from "../../../assets/timeIcon.svg";
import profileIcon from "../../../assets/profileIcon.svg";
import levelIcon from "../../../assets/levelIcon.svg";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../../utils/generateSlug";
import { ParentContext } from "../../../contexts/ParentContext";
import { courseProgressAPI, enrollCourseAPI } from "../../../utils/api/CourseAPI";
import { useAccount } from "wagmi";
import { toast, Toaster } from "react-hot-toast";
import GreenButton from "../../button/GreenButton";
const PreviewCourseHeader = ({ props }) => {
    const { loggedInUserData } = useContext(ParentContext);
    const navigate = useNavigate();
    const { isConnected } = useAccount();
    const [isCourseEnrolled, setisCourseEnrolled] = useState(false);



    // useEffect(() => {
    //   getuserProgress();
    // }, [loggedInUserData, props, isCourseEnrolled]);

    return (
        <div className="flex flex-wrap w-full md:px-[100px]  py-[80px]  sm:px-[60px] px-[30px] justify-between gap-8 align-middle">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="description-div lg:flex-1 flex-wrap flex flex-col gap-[32px]  justify-between">
                <div className="header-div">
                    <div
                        className=" text-shardeumBlue  md:text-[80px]"
                        style={{
                            lineHeight: "70px",
                            fontSize: "64px",
                            fontWeight: 700,
                        }}
                    >
                        <p className="font-helvetica-neue-bold">{props?.attributes?.title}</p>
                    </div>
                    <p className="text-[18px] mt-6  font-helvetica-neue-roman">{props?.attributes?.description}</p>
                </div>
                <div className="author-div flex ">
                    <div className="flex ">
                        <img
                            class="inline-block h-8 w-8 rounded-full ring-2 ring-white "
                            src="https://pbs.twimg.com/profile_images/1660782439340576768/9rIZjmMt_400x400.jpg"
                            alt=""
                        />
                        <p className="text-[18px] items-center text-center font-semibold ml-2 font-helvetica-neue">Shardeum Team</p>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="flex gap-4">
                        <div className="flex gap-2">
                            <img className="w-5 h-5 mt-1" src={timeIcon} />
                            <span className="font-helvetica-neue font-normal">{props?.attributes?.duration} Hrs</span>
                        </div>
                        <p>|</p>
                        <div className="flex gap-2">
                            <img className="w-5 h-5 mt-1" src={profileIcon} />
                            <span className="font-helvetica-neue font-normal">{props?.attributes?.usersEnrolled?.length} Students</span>
                        </div>
                        <p>|</p>
                        <div className="flex gap-2">
                            <img className="w-5 h-5 mt-1" src={levelIcon} />
                            <span className="font-helvetica-neue font-normal">{props?.attributes?.level}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <GreenButton
                        boxShadow={true}
                        onClick={() => {

                            navigate(`/previewworkplace/${props.id}`);

                        }}
                        text={"Continue"}
                        iconRight={faAngleRight}
                    />
                </div>

            </div>
            <div className="banner-div rounded-xl lg:flex-1 flex w-full justify-center align-middle">
                {/* <div className=""> */}
                <img
                    style={{ borderRadius: "200px !important" }}
                    className="w-[600px] sm:h-[400px] h-auto object-contain rounded-[12px]"
                    src={props?.attributes?.banner?.data[0].attributes?.url}
                />
                {/* </div> */}
            </div>
        </div>
    );
};

export default PreviewCourseHeader;
