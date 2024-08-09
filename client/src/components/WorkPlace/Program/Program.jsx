import { useEffect, useState } from "react";
import Problem from "../../editor/Problem/Problem.jsx";
import IDE from "../../editor/IDE/IDE.jsx";
import Split from "react-split";
import 'react-resizable/css/styles.css';
import SuccessModal from "../../Quiz/SuccessModal.jsx";

const WorkPlaceProgram = ({ currentModule, courseContent, user_id, isProgramSubmited, setIsProgramSubmited, loggedInUserData, userCourseProgress,
  setuserCourseProgress, }) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [completed, setcompleted] = useState(false);
  const [userProgramData, setUserProgramData] = useState({})
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const enrolledCourse = loggedInUserData.enrolledCourses.find(course => course.courseId.toString() == courseContent._id)
    const module = enrolledCourse?.modules?.find(
      mod => mod._id.toString() === currentModule._id
    );
    if (module?.program?.status === "full") {
      setcompleted(true)
      setUserProgramData(module.program)
    } else {
      setcompleted(false)
    }
  }, [loggedInUserData, isProgramSubmited])

  const handleCourseProgramUpdate = async (updatedCourseProgress) => {
    if (updatedCourseProgress) {
      setuserCourseProgress(updatedCourseProgress);
      setIsProgramSubmited(true)
    }
    if (currentModule.programStatus == "full") {
      setModalIsOpen(true);
    }
  };
  return (
    <div className={`${darkTheme && "bg-black text-white"} py-5 px-2 transition-all duration-200 ease-linear w-full`}>
      <Split
        className="flex"
        sizes={[50, 50]}
        minSize={100}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        gutter={(index, direction) => {
          const gutterElement = document.createElement('div');
          gutterElement.className = `bg-gray-500 cursor-col-resize w-10 h-screen flex items-center justify-center hover:bg-gray-400   z-10`;
          return gutterElement;
        }}
      >
        <div className="flex-1 relative">
          <Problem program={currentModule?.program} contest={courseContent} darkTheme={darkTheme} toggleTheme={() => setDarkTheme(theme => !theme)} />
        </div>
        <div className="">
          <IDE setIsProgramSubmited={setIsProgramSubmited} isProgramSubmited={isProgramSubmited} course={true} isProgram user_id={user_id} course_id={courseContent._id} program_id={currentModule?.program._id} module_id={currentModule._id} program={currentModule?.program} darkTheme={darkTheme} completed={{ completed: completed, testResults: userProgramData.testResults, submittedCode: userProgramData.code }} handleCourseProgramUpdate={handleCourseProgramUpdate} />
        </div>
      </Split>
      {<SuccessModal currentModule={currentModule} isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />}
    </div>
  )
}

export default WorkPlaceProgram;