import { useEffect, useState,useContext } from "react";
import { ParentContext } from "../../../contexts/ParentContext";
import { useParams } from "react-router-dom";
import Problem from "../Problem/Problem";
import Split from "react-split";
import IDE from "./IDE";
import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { getContestProgram,getContestByTitle } from "../../../utils/api/ContestAPI";


export default function editor() {
  const  {id,title}=useParams();
  const { loggedInUserData } = useContext(ParentContext);

  // const [code, setCode] = useState("");
  // const [compiler, setCompiler] = useState(null);
  const [darkTheme,setDarkTheme]=useState(true);
  const [contest,setContest]=useState();
  const [program,setProgram]=useState();
  const [loader,setLoader]=useState(true);
  // const loadsolc = async () => {

  // 	setCompiler(() => solidityCompiler)
  // }
  // useEffect(() => {
  // 	loadsolc()
  // }, [code])
  
  // const execute = async () => {
  //   const version = "v0.4.25-stable-2018.09.13";
  //   const solidityCompiler = await solcjs(version);
  //   console.log(solidityCompiler);
  //   const output = await solidityCompiler(code);
  //   console.log(output);
  // };
  useEffect(()=>{
    // if(title!=null)
    //   getContestByTitle(title).then(async(resp)=>{
    //     setContest(resp.data[0].attributes);
    //   })
    if(id!=null)
      getContestProgram(loggedInUserData?.accessToken,id).then(async(resp)=>{
       if(resp.error==false)
        {
          setProgram(resp.Program);
          setContest(resp.Contest);
          setLoader(false);
        }
      });
  },[id,title])
  return (
    <div className={`w-full h-screen ${darkTheme && "bg-black text-white"} transition-all duration-200 ease-linear`}>
      
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
                  loader?
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
                    loader?
                    <div className="text-center text-white my-40">
                      Loading...
                    </div>
                    :
                    <IDE  darkTheme={darkTheme} program={program}/>
                  }
                </ResizableBox>
      </Split>
    </div>
  );
}
