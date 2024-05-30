import { useEffect, useState } from "react";
import solcjs from "solc-js";
import Problem from "../Problem/Problem";
import Split from "react-split";
import IDE from "./IDE";

export default function editor() {
  const [code, setCode] = useState("");
  const [compiler, setCompiler] = useState(null);
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
    <div className="w-full h-screen">
      <Split
        className="flex"
        sizes={[50, 50]}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className="h-screen overflow-scroll">
        <Problem />
        </div>
        
        <IDE/>
      </Split>
    </div>
  );
}
