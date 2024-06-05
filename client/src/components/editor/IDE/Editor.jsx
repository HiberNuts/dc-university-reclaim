import { useEffect, useState } from "react";
import solcjs from "solc-js";
import Problem from "../Problem/Problem";
import Split from "react-split";
import IDE from "./IDE";
import { Resizable, ResizableBox } from 'react-resizable';
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
        cursor="col-resize"
      >
        
            <div className="h-screen overflow-scroll flex-1">
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
