import { useEffect, useState,useContext } from "react";
import { getProgramScreenData,checkAuthinStrapi } from "../../../utils/api/ContestAPI";
import { useParams } from "react-router-dom";
import Split from "react-split";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Problem from "../../editor/Problem/Problem";
import IDE from "../../editor/IDE/IDE";
import { mapRichTextNodesToSchema } from "../../../utils/mapRichText";
import { ParentContext } from "../../../contexts/ParentContext";
import { useNavigate } from "react-router-dom";

const EditorPreviewContest=()=>{
  const navigate=useNavigate();
  const { loggedInUserData } = useContext(ParentContext);

    const {id}=useParams();
    const [contest,setContest]=useState(null);
    const [program,setProgram]=useState(null);
    const [darkTheme,setDarkTheme]=useState(true);
    let completion={
        completed:false,
        // submittedCode:resp.data.code,
        // testResults:resp.data.testResults
      }

    const mapContestForProblemComponentFromStrapi=(contest)=>{
         let obj={};
         obj.title=contest.title;
         obj.startDate=contest?.startDate;
         obj.endDate=contest?.endDate;
         obj.level=contest?.level;
         return obj;
    }
    // const mapDescriptionForProgramFromStrapi=(program)=>{
    //     let obj={...program,description:mapRichTextNodesToSchema(program.description[0].children)};
    //     return obj;
    // }

    useEffect(()=>{

        if(id!=null)
            getProgramScreenData(id).then((response)=>{
              console.log(":::::",response);
              if(response?.data)
              {
                setContest(mapContestForProblemComponentFromStrapi(response?.data.attributes));
                setProgram(response?.program[0].attributes);
              }
            })
    },[])

    useEffect(()=>{
      if(loggedInUserData?.walletAddress)
        checkAuthinStrapi(loggedInUserData?.walletAddress).then((response)=>{
            if(response.exists==false)
            {
               navigate("/")   
            }
        })
      },[loggedInUserData])

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
                  contest==null||program==null?
                  <div className="text-center text-white my-40">
                      Loading...
                  </div> 
                  :
                  <Problem darkTheme={darkTheme} toggleTheme={()=>setDarkTheme(theme=>!theme)} contest={contest} program={program}/>
                }
                </div>
                <ResizableBox width={800} height={800}
                minConstraints={[100, 100]} maxConstraints={[300, 300]}>
                  {
                    program==null?
                    <div className="text-center text-white my-40">
                      Loading...
                    </div>
                    :
                    <div>
                        <IDE preview={true} completed={completion} darkTheme={darkTheme} program={program}/>
                    </div>
                  }
                </ResizableBox>
      </Split>
    </div>
    )
}
export default EditorPreviewContest;