import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { solidityLanguageConfig, solidityTokensProvider } from "./EditorConfig";
// import * as monaco from "monaco-editor"
import solcjs from "solc-js";
import { FaCode } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { compile,compileAndSubmit } from "../../../utils/api/ContestAPI";
import Split from "react-split";

import axios from "axios";

// import { Editor } from "@monaco-editor/react";
export default function IDE(props) {
  let compiler = useRef();
  const editor = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const [input,setInput]=useState("");
  const [output, setOutput] = useState("");
  const [byteCode,setByteCode]=useState("");
  const [compileError,setCompileError]=useState(null);
  const [testCases,setTestCases]=useState(null);
  const [currentTestCase,setCurrentTestCase]=useState(0);
  function setupMonaco(monaco) {
    monaco.languages.register({ id: "solidity" });
    monaco.languages.setLanguageConfiguration(
      "solidity",
      solidityLanguageConfig
    );
    monaco.languages.setMonarchTokensProvider(
      "solidity",
      solidityTokensProvider
    );
    monaco.editor.defineTheme("mylang-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "#FF6600", fontStyle: "bold" },
        { token: "comment", foreground: "#999999" },
        { token: "string", foreground: "#009966" },
        { token: "variable", foreground: "#006699" },
      ],
      colors: {
        "editor.foreground": "#000000",
        "editor.background": "#1e1e1e",
        "editorCursor.foreground": "#A7A7A7",
        "editor.lineHighlightBackground": "#1e1e1e",
        "editorLineNumber.foreground": "#FFFFFF",
        "editor.selectionBackground": "#88000030",
        "editor.inactiveSelectionBackground": "#88000015",
      },
    });
    monaco.languages.registerCompletionItemProvider("solidity", {
      provideCompletionItems: (model, position) => {
        const suggestions = [
          ...solidityTokensProvider.keywords.map((k) => {
            return {
              label: k,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: k,
            };
          }),
        ];
        return { suggestions: suggestions };
      },
    });

    //   const container = document.getElementById('container');
    //   editor.current = monaco.editor.create(container, {
    // 					theme: 'mylang-theme',
    // 					language: 'solidity',
    // 					fontFamily: 'Menlo',
    // 					fontSize,
    // 					value:"//write code here",
    // 			});
  }
  const loadsolc = async () => {
    compiler.current = await solcjs("v0.5.1-stable-2018.12.03");
  };
  const execute = async () => {
    try {
      setTestCases(null);
      await compile(input).then((response)=>{
          if(response.error==true) 
            {
              setByteCode("");
              setCompileError(true);
              setOutput(response.message.replace(/\n/g, '<br />'))
              setTimeout(() => {
                  setOutput("")
                  setCompileError(null);
              },50000);
            }
            else
            {
               setCompileError(false);
               setOutput(response.message);
               setByteCode(response.byteCode);
            }
        })
    } catch (er) {
        setOutput(er.message);
    }
  };
  const handleSubmitAndTest=async()=>{
    try {
          setTestCases(null);
          await compileAndSubmit(input,props?.submissionID).then((result)=>{
             console.log("TEST CASES--->",result);
             setCompileError(false);
             setOutput("Compiled Successfully");
             setTestCases(result);
          });
      } catch (error) {
        console.log("ERROR IN TESTING");
      }
  }
  // useEffect(() => {
  // 	setupMonaco()
  // 	// loadsolc()
  // }, [props.darkTheme])
  function handleEditorChange(value, event) {
    setInput(value);
  }
  const handleEditorWillMount = (monaco) => {
    setupMonaco(monaco);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editor.updateOptions({
      fontFamily: "Menlo",
      fontSize: 14,
    });
  };
  useEffect(()=>{
      if(props?.completed?.completed==true)
        {
          setTestCases({testResults:props.completed?.testResults});
        }
  },[props.completed])
  return (
    <div className="h-screen w-full border flex-1 z-10">
      <div className="w-full  z-10   px-8 flex  items-center justify-between h-[10%]">
        <div className="flex items-center">
          <FaCode className=" mr-3 " />
          <p className="">Code Editor</p>
        </div>
      </div>
      <Split
        className="flex flex-col h-[90%]"
        sizes={[50, 50]}
        minSize={100}
        expandToMin={true}
        gutterSize={5}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="vertical"
        gutter={(index, direction) => {
          const gutterElement = document.createElement('div');
          gutterElement.className = `bg-gray-500 cursor-row-resize w-full h-5 flex items-center justify-center hover:bg-gray-400   z-10`;
          return gutterElement;
        }}
      >
      <div className="border h-[70%]">
        <Editor
          className="border-black h-full"
          defaultLanguage="solidity"
          defaultValue={props?.completed?.completed==true?props?.completed?.submittedCode:props?.program?.boilerplate_code?`// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;\n\n ${props?.program?.boilerplate_code}`:`// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;\n\n`}
          theme={props.darkTheme ? "vs-dark" : "light"}
          onChange={handleEditorChange}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="w-full h-[30%] overflow-y-scroll">

  {
    testCases==null&&props.completed?.completed==false&&
        <div className="w-full py-3 px-8 ">
          
            
            <button
              className="bg-transparent border  rounded  p-2 mr-5 hover:bg-green-500"
              onClick={()=>execute()}
            >
              Compile
            </button>
          
          {
            compileError==false&&
            <button
              className="bg-transparent border rounded  p-2 hover:bg-green-500"
              onClick={handleSubmitAndTest}
            >
              Submit
            </button>
          }
        </div>
  }

      <div className="h-full  px-5 py-10 border-y">
        
        {
          output!=""&&
          compileError?
          <div className="text-wrap overflow-y-auto max-h-[250px]  p-2  ">
            <p className={`text-lg text-red-500`}>Compilation Failed<br/><br/></p>
            <pre dangerouslySetInnerHTML={{ __html: output }}></pre>
          </div>
          :
          <div className="text-wrap overflow-y-auto max-h-[250px]  p-2  ">
            <p className={`text-lg text-green-500`}>{output}</p>
        </div>
        }
        {
          testCases!=null&&
          <div className="p-2">
            <div className="grid grid-cols-5 gap-1">
              <div className="col-span-1 border-[0.5px] rounded-[4px] flex flex-col justify-center">
                {
                  testCases?.testResults?.map((single,index)=>
                    <p onClick={()=>setCurrentTestCase(index)} className={`${index+1==testCases.testResults.length?'':'border-b-[1px]'} py-3 px-2 ${currentTestCase==index?`cursor-pointer  text-black ${props?.darkTheme?' bg-gray ':' bg-black text-white '}`:''} cursor-pointer`}>
                      <span className="pr-2" >Test case {index+1}</span>
                     {
                      single?.passed==true?
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />
                      :
                      <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} />
                     }
                    </p>
                  )
                }
              </div>
              <div className="col-span-4  border-[0.5px] rounded-[4px] p-5">
                 {
                  testCases?.testResults[currentTestCase].description
                 }
              </div>    
            </div>  
          </div>

        }
      </div>

      </div>
      
      </Split>

      
      
      {/* <Split
        className="flex flex-col h-full"
        sizes={[50, 50]}
        minSize={100}
        expandToMin={true}
        gutterSize={5}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="vertical"
        gutter={(index, direction) => {
          const gutterElement = document.createElement('div');
          gutterElement.className = `bg-gray-500 cursor-row-resize w-full h-5 flex items-center justify-center hover:bg-gray-400   z-10`;
          return gutterElement;
        }}
      >
      <div className="border-black ">
        <Editor
          className="border-black "
          defaultLanguage="solidity"
          defaultValue={props?.program?.boilerplate_code?`// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;\n\n ${props?.program?.boilerplate_code}`:`// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;\n\n`}
          theme={props.darkTheme ? "vs-dark" : "light"}
          onChange={handleEditorChange}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="w-full h-[50%] border">

      </div>
      </Split> */}
    </div>
  );
}
