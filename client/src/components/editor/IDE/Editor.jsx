import { useEffect, useState } from "react";
import solcjs from "solc-js";
import Problem from "../Problem/Problem";
import Split from "react-split";
import IDE from "./IDE";
import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
export default function editor() {
  const [code, setCode] = useState("");
  const [compiler, setCompiler] = useState(null);
  const [darkTheme,setDarkTheme]=useState(true)
  // const loadsolc = async () => {

  // 	setCompiler(() => solidityCompiler)
  // }
  // useEffect(() => {
  // 	loadsolc()
  // }, [code])
  
  const execute = async () => {
    const version = "v0.4.25-stable-2018.09.13";
    const solidityCompiler = await solcjs(version);
    console.log(solidityCompiler);
    const output = await solidityCompiler(code);
    console.log(output);
  };
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
              <Problem darkTheme={darkTheme} toggleTheme={()=>setDarkTheme(theme=>!theme)}/>
            </div>
            <ResizableBox width={800} height={800}
            minConstraints={[100, 100]} maxConstraints={[300, 300]}>
              
                <IDE  darkTheme={darkTheme}/>
            </ResizableBox>
      </Split>
    </div>
  );
}
