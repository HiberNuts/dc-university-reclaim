import { useState } from "react";
import Problem from "../../editor/Problem/Problem.jsx";
import IDE from "../../editor/IDE/IDE.jsx";
import Split from "react-split";
import 'react-resizable/css/styles.css';

const WorkPlaceProgram=({currentModule,courseContent})=>{
  const [darkTheme,setDarkTheme]=useState(true);

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
                   <Problem program={currentModule?.program} contest={courseContent} darkTheme={darkTheme}  toggleTheme={()=>setDarkTheme(theme=>!theme)}  />
                 </div>  
                 <div className="">
                   <IDE program={currentModule?.program} darkTheme={darkTheme} completed={{completed:false}}/>
                 </div>  
       </Split>
   </div> 
    )
}

export default WorkPlaceProgram;