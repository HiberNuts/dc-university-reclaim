import { useEffect, useState, useContext } from "react";
import { ParentContext } from "../../../contexts/ParentContext";
import { useParams } from "react-router-dom";
import Problem from "../Problem/Problem";
import Split from "react-split";
import IDE from "./IDE";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { getContestProgram } from "../../../utils/api/ContestAPI";


export default function Editor() {
  const { id, title } = useParams();
  const { loggedInUserData } = useContext(ParentContext);
  const [darkTheme, setDarkTheme] = useState(true);
  const [contest, setContest] = useState();
  const [program, setProgram] = useState();
  const [completed, setCompleted] = useState({ completed: false });
  const [loader, setLoader] = useState(true);

  useEffect(() => {

    if (id != null)
      getContestProgram(loggedInUserData?.accessToken, id).then(async (resp) => {
        if (resp.error === false) {
          setProgram(resp.data.Program);
          setContest(resp.data.Contest);
          setLoader(false);
        }
        if (resp.error === true) {
          if (resp?.data?.code) {
            setProgram(resp.data.Program);
            setContest(resp.data.Contest);
            const submittedData = {
              completed: true,
              submittedCode: resp.data.code,
              testResults: resp.data.testResults
            }
            setCompleted(submittedData);
            setLoader(false);
          }
        }
      });
  }, [id, title, loggedInUserData])
  return (
    <div className={`w-full h-screen overflow-auto ${darkTheme && "bg-black text-white"} transition-all duration-200 ease-linear py-14`}>

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

        <div className="h-screen overflow-scroll flex-1 relative">
          <div
          />
          {
            loader ?
              <div className="text-center text-white my-40">
                Loading...
              </div>
              :
              <Problem darkTheme={darkTheme} toggleTheme={() => setDarkTheme(theme => !theme)} contest={contest} program={program} />
          }
        </div>
        <ResizableBox width={800} height={800}
          minConstraints={[100, 100]} maxConstraints={[300, 300]}>
          {
            loader ?
              <div className="text-center text-white my-40">
                Loading...
              </div>
              :
              <IDE completed={completed} submissionID={id} darkTheme={darkTheme} program={program} />
          }
        </ResizableBox>
      </Split>
    </div>
  );
}
