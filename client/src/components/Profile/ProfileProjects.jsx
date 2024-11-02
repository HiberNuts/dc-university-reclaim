import { useState } from 'react';
import ProfileProjectCard from "./ProfileProjectCard";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ProfileProjects = ({ projects = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNext = () => {
        if (isAnimating || currentIndex >= projects.length - 2) return;

        setIsAnimating(true);
        setCurrentIndex(prev => prev + 1);

        setTimeout(() => setIsAnimating(false), 500);
    };

    const handlePrev = () => {
        if (isAnimating || currentIndex <= 0) return;

        setIsAnimating(true);
        setCurrentIndex(prev => prev - 1);

        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className="w-full">
            <div className="flex flex-row">
                <div className="flex-1 justify-center">
                    <p className="relative text-left bg-gradient-to-r from-[#ffffff] to-[#79797b] bg-clip-text text-wrap font-montserrat-semibold text-transparent text-[24px] tracking-[0] leading-[50px] whitespace-nowrap">
                        Projects
                    </p>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex <= 0 || isAnimating}
                        className="transform -translate-y-1/2 bg-gray-800 text-white border-2 border-decentraBlue p-2 rounded-full opacity-50 hover:opacity-75 disabled:opacity-25 disabled:cursor-not-allowed"
                    >
                        <IoIosArrowBack />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= projects.length - 2 || isAnimating}
                        className="transform -translate-y-1/2 bg-gray-800 text-white border-2 border-decentraBlue p-2 rounded-full opacity-50 hover:opacity-75 disabled:opacity-25 disabled:cursor-not-allowed"
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
            {projects.length > 0 ? (
                <div className="relative mt-5 overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * 30}%)`,
                            width: `${(projects.length == 1 ? projects.length + 1 : projects.length) * 50}%`, // Each project takes 50% width
                        }}
                    >
                        {projects.map((project, i) => (
                            <div
                                key={project.id}
                                className="w-1/2 px-4" // Each project takes up half the container width
                            >
                                <ProfileProjectCard {...project} index={i} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>-</p>
            )}
        </div>
    );
};

export default ProfileProjects;