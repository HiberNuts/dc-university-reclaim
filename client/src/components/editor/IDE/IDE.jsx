import React, { useEffect, useRef, useState, Fragment,useContext } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { FaCode } from 'react-icons/fa';
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import Editor from "@monaco-editor/react";
import Split from "react-split";
import { useAccount } from "wagmi";
import { ParentContext } from "../../../contexts/ParentContext";
import { getUserData } from "../../../utils/api/UserAPI";
import { compile, compileAndSubmit } from "../../../utils/api/ContestAPI";
import { solidityLanguageConfig, solidityTokensProvider } from "./EditorConfig";
import solcjs from "solc-js";
import TRI_IMG from "../../../assets/triangle_logo_editor.svg";
import GreenButton from "../../button/GreenButton";
export default function IDE(props) {
  const compiler = useRef();
  const { loggedInUserData, setloggedInUserData } = useContext(ParentContext);
  const editor = useRef(null);
  const { isConnected,address } = useAccount();
  const [fontSize, setFontSize] = useState(16);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [byteCode, setByteCode] = useState("");
  const [compileError, setCompileError] = useState(null);
  const [testCases, setTestCases] = useState(null);
  const [currentTestCase, setCurrentTestCase] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [editWalletAddress,setEditWalletAddress]=useState(false);
  const [walletAddress,setWalletAddress]=useState("");

  function setupMonaco(monaco) {
    monaco.languages.register({ id: "solidity" });
    monaco.languages.setLanguageConfiguration("solidity", solidityLanguageConfig);
    monaco.languages.setMonarchTokensProvider("solidity", solidityTokensProvider);
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
  }

  const loadsolc = async () => {
    compiler.current = await solcjs("v0.5.1-stable-2018.12.03");
  };

  const execute = async () => {
    try {
      setTestCases(null);
      await compile(input).then((response) => {
        if (response.error === true) {
          setByteCode("");
          setCompileError(true);
          setOutput(response.message.replace(/\n/g, '<br />'));
          setTimeout(() => {
            setOutput("");
            setCompileError(null);
          }, 50000);
        } else {
          setCompileError(false);
          setOutput(response.message);
          setByteCode(response.byteCode);
        }
      });
    } catch (er) {
      setOutput(er.message);
    }
  };

  const handleSubmitAndTest = async () => {
    try {
      setTestCases(null);
      setIsDialogOpen(false);
      await compileAndSubmit(input, props?.submissionID,walletAddress).then((result) => {
        if(result.error){
          setCompileError(true);
          setOutput("Failed to run test cases");
        }else
        {
          setCompileError(false);
          setOutput("Compiled Successfully");
          setTestCases(result);
          //TO UPDATE XP IN NAVBAR AFTER SUBMISSION
          if(loggedInUserData?.shardId)
          {
            const getUserProfileData=async()=>{
              await getUserData(loggedInUserData?.shardId).then((response)=>{
                 if(response.error==false)
                 {
                   setloggedInUserData({...response.data,accessToken: loggedInUserData.accessToken})
                 } 
              })
            }
            getUserProfileData();
          }
        }
      });
    } catch (error) {
      console.log("ERROR IN TESTING :",error);
    }
  };

  function handleEditorChange(value, event) {
    setInput(value);
  }

  const handleEditorWillMount = (monaco) => {
    setupMonaco(monaco);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, () => {
      // Do nothing
    });

    // Disable cut (Ctrl+X and Cmd+X)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX, () => {
      // Do nothing
    });

    // Disable paste (Ctrl+V and Cmd+V)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
      // Do nothing
    });
    editor.updateOptions({
      fontFamily: "Menlo",
      fontSize: 14,
    });
  };

  useEffect(() => {
    if (props?.completed?.completed === true) {
      setTestCases({ testResults: props.completed?.testResults });
    }

    if (props?.completed?.completed === true) {
      setInput(props?.completed?.submittedCode);
    } else {
      const boilerplateCode = props?.program?.boilerplate_code
        ? `// SPDX-License-Identifier: UNLICENSED\npragma solidity ^0.8.4;\n${props?.program?.boilerplate_code}`
        : `// SPDX-License-Identifier: UNLICENSED\npragma solidity ^0.8.4;\n\n`;
      setInput(boilerplateCode);
    }
  }, [props.completed]);
  useEffect(()=>{
    setWalletAddress(address);
  },[address])

  return (
    <div className="h-screen w-full border flex-1 z-10 rounded-[12px]">
     <Transition className="absolute top-1/3 left-1/3" appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="absolute z-10" onClose={() => setIsDialogOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="flex font-medium leading-6 text-gray-900 bg-shardeumPink px-5 py-5 background_dots">
                <div className="flex-1 text-5xl  font-helvetica-neue-bold">Confirm your submission</div>
                <div className="flex-1 text-[20px] cursor-pointer font-semibold flex justify-end items-end"><span onClick={() => setIsDialogOpen(false)}><IoMdClose/></span></div>
              </Dialog.Title>
              <div className="px-5 border-b pb-5">
                  <p className="pt-5 pb-2 text-[15px]">Once you submit this code, you cannot compile or submit again for this contest.  </p>
                  <p className="font-semibold pb-2 text-[15px]">This is your wallet address</p>
                  <div className="flex gap-2">
                  <input type="text" value={walletAddress} onChange={(e)=>setWalletAddress(e.target.value)} disabled={!editWalletAddress?true:false} className={`w-full border-[1px] px-2 py-2 rounded-[12px] ${editWalletAddress?'border-shardeumBlue':''}`} /> 
                  <p onClick={()=>setEditWalletAddress(!editWalletAddress)} className="cursor-pointer border-[1px] border-shardeumBlue text-shardeumBlue text-[20px] p-4 rounded-[12px] flex justify-center items-center"><RiPencilFill /></p>
                  </div>
              </div>
             <div className="py-3 px-5 flex justify-end">
                     <div className="">
                      <GreenButton
                      isHoveredReq={true}
                      onClick={() => handleSubmitAndTest()} 
                      text={"Confirm Submission"}
                      />
                    
                     </div>
                     
             </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      <div className="w-full relative z-10 overflow-hidden px-8 flex items-center justify-between h-[10%]">
        <div className="flex items-center">
          <FaCode className="mr-3" />
          <p className={`text-overflow-ellipsis font-helvetica-neue ${props?.darkTheme?'text-[#CAFFEF]':'text-black'}`}>Code Editor</p>
        </div>
        <img src={TRI_IMG} className="absolute z-20 right-5 top-2 "/>
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
          gutterElement.className = `bg-gray-500 cursor-row-resize w-full h-5 flex items-center justify-center hover:bg-gray-400 z-10`;
          return gutterElement;
        }}
      >
        <div className="border-t border-b h-[60%]">
          <Editor
            className="border-black h-full"
            defaultLanguage="solidity"
            defaultValue={input}
            theme={props.darkTheme ? "vs-dark" : "light"}
            onChange={handleEditorChange}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="w-full h-[40%] overflow-y-scroll">
          {testCases === null && props.completed?.completed === false &&
            <div className="w-full flex justify-end py-5 px-8 border-b">
              <button
                className={`border-[1px] border-shardeumGreen rounded-[10px]  px-8  py-[6px] mr-5   text-semibold  hover:text-black ${props?.darkTheme?'bg-transparent text-shardeumGreen hover:bg-shardeumGreen':'bg-green-500 border-green-500 text-white'}`}
                onClick={() => execute()}
              >
                Compile
              </button>
              {compileError === false &&
                <button
                  className={`border-[1px] border-shardeumGreen  rounded-[10px]  px-8  py-[6px] mr-5  font-semibold text-black ${props?.darkTheme?'bg-shardeumGreen':'bg-green-500 border-green-500 text-white hover:text-black'}`}
                  onClick={()=>setIsDialogOpen(true)}
                >
                  Submit
                </button>
              }
            </div>
          }
          <div className={`${output!=""&&''} px-6`}>
            {output !== "" && compileError ?
              <div className="px-2 py-4">
                <p className={`text-wrap text-lg text-red-500`}>Compilation Failed<br /><br /></p>
                <pre className="text-wrap" dangerouslySetInnerHTML={{ __html: output }}></pre>
              </div>
              :
              <div className="text-wrap  p-2">
                <p className={`text-lg ${props?.darkTheme?'text-shardeumGreen':'text-green-500'}`}>{output}</p>
              </div>
            }
            {testCases != null &&
              <div className="p-2">
                <div className="grid grid-cols-8 gap-4">
                  <div className="col-span-2    rounded-[4px] flex flex-col gap-4 justify-center">
                    {testCases?.testResults?.map((single, index) =>
                      <p key={index} onClick={() => setCurrentTestCase(index)} className={`flex flex-row gap-2 border-[1px] rounded-[12px] py-3 px-2  ${currentTestCase === index ? `cursor-pointer ${single?.passed?'border-shardeumGreen':'border-red-500'}  text-white ${props?.darkTheme ? '  ' : ' bg-black text-white '}` : ''} cursor-pointer`}>
                        {single?.passed === true ?
                          <div className={`flex justify-center items-center  text-[20px] ${props?.darkTheme?'text-shardeumGreen':'text-green-500'}`}>
                            <IoMdCheckmark/>
                          </div>
                          :
                          <div className="flex justify-center items-center text-red-500 text-[20px]">
                            <IoMdClose/>
                          </div>
                          // <FontAwesomeIcon icon={IoMdClose} style={{ color: 'red' }} />
                        }
                        <div>
                         <span className="">Test Case {index + 1}</span>
                        </div>
                      </p>
                    )}
                  </div>
                  <div className="col-span-6 border-[0.5px] rounded-[12px] p-5">
                    {testCases?.testResults[currentTestCase].description}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </Split>
    </div>
  );
}
