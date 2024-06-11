import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { solidityLanguageConfig, solidityTokensProvider } from "./EditorConfig";
// import * as monaco from "monaco-editor"
import solcjs from "solc-js";
import { FaCode } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { compile } from "../../../utils/api/ContestAPI";

import axios from "axios";

// import { Editor } from "@monaco-editor/react";
export default function IDE(props) {
  let compiler = useRef();
  const editor = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const [input,setInput]=useState("");
  const [output, setOutput] = useState("");
  const [compileError,setCompileError]=useState(false);
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
      await compile(input).then((response)=>{
          if(response.error==true) 
              setCompileError(true);
          setOutput(response.message)
          setTimeout(() => {
              setOutput("")
              setCompileError(false);
          },20000);
        })
    } catch (er) {
        setOutput(er.message);
    }
  };
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
  return (
    <div className="h-screen w-full border flex-1 z-10">
      <div className="w-full  z-10   px-8 flex  items-center justify-between h-[10%]">
        <div className="flex items-center">
          <FaCode className=" mr-3 " />
          <p className="">Code Editor</p>
        </div>

        {/* <div className="flex items-center">
		<IoIosAdd className="text-white mr-3" />
		<FiMinus className="text-white"/>
		</div> */}
      </div>
      {/* <div id="container" className="w-full resize-x h-[50%]">
				
      </div> */}
      <div className="border-black ">
        <Editor
          className="border-black "
          height="50vh"
          defaultLanguage="solidity"
          defaultValue={props?.program?.boilerplate_code??'//Write your code here'}
          theme={props.darkTheme ? "vs-dark" : "light"}
          onChange={handleEditorChange}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
        />
      </div>

      <div className="w-full py-3 px-8 h-[10%]">
        <button
          className="bg-transparent border  rounded  p-2 mr-5 hover:bg-green-500"
          onClick={()=>execute()}
        >
          Compile
        </button>
        <button
          className="bg-transparent border rounded  p-2"
          onClick={execute}
        >
          Submit
        </button>
      </div>
      <div className="h-[30%]  p-5 border-y">
        {/* {output && (
          <div>
            <p className="text-lg">byte code:</p>
            <p className="mt-4 whitespace-pre-line ">
              {output[0].binary && output[0].binary.bytecodes.bytecode}
              {output[0].type == "ParserError" && output[0].formattedMessage}
            </p>
          </div>
        )} */}
        {
          output!=""&&
          <div>
             <p className={`text-lg ${compileError?'text-red-500':'text-green-500'}`}>{output}</p>      
          </div>
        }
      </div>
    </div>
  );
}
