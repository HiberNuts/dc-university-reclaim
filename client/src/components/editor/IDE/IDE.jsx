import React, { useEffect, useState, Fragment, useContext } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { FaCode } from 'react-icons/fa';
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import Editor from "@monaco-editor/react";
import Split from "react-split";
import { useAccount } from "wagmi";
import { ParentContext } from "../../../contexts/ParentContext";
import { getUserData } from "../../../utils/api/UserAPI";
import { test } from "../../../utils/api/ContestAPI";
import { solidityLanguageConfig, solidityTokensProvider } from "./EditorConfig";
import { TRIANGLE_LOGO_EDITOR as TRI_IMG } from "../../../Constants/Assets";
import toast, { Toaster } from "react-hot-toast";
import DCButton from "../../button/DCButton";

const IDE = (props) => {
  const { loggedInUserData, setloggedInUserData } = useContext(ParentContext);
  const { address } = useAccount();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [compileError, setCompileError] = useState(null);
  const [testCases, setTestCases] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [currentTestCase, setCurrentTestCase] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editWalletAddress, setEditWalletAddress] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (props?.completed?.completed === true) {
      setTestCases(props.completed?.testResults);
      setSubmitted(true);
      setInput(props?.completed?.submittedCode);
    }
  }, [props.completed]);

  useEffect(() => {
    if (props?.program?.boilerplate_code) {
      setInput(props?.program?.boilerplate_code);
    }
  }, [props?.program]);

  useEffect(() => {
    setWalletAddress(address);
  }, [address]);

  const setupMonaco = (monaco) => {
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
          ...solidityTokensProvider.keywords.map((k) => ({
            label: k,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: k,
          })),
        ];
        return { suggestions };
      },
    });
  };
  const handleSubmitAndTest = async (isCompile = true) => {
    try {
      setSubmitLoader(true);
      setTestCases(null);
      setIsDialogOpen(false);
      const isPreviewComponent = props?.preview || isCompile || false;
      const response = await test(input, props?.program?.test_file_content, props?.submissionID, walletAddress, props?.course, props?.course_id, props?.user_id, props?.program_id, props?.module_id, isPreviewComponent);
      if (response?.error) {
        setCompileError(true);
        setOutput(response?.message);
        setSubmitLoader(false);
        if (response?.message === "Sorry. The Contest has ended!") {
          toast.error(response?.message);
          return;
        }
      }
      setCompileError(false);

      //Update the user course progress in workplace
      if (props.course === true) {
        props.handleCourseProgramUpdate(response.userCourseProgress)
      }
      //setting the test cases
      setTestCases(response?.results);
      setOutput(isCompile ? "Compiled Successfully" : "Compile  d Successfully & Test Cases Submitted Successfully");
      if (!isPreviewComponent && !props.course && !isCompile) {
        setSubmitted(true)
      }
      if (!isCompile && loggedInUserData?.shardId) {
        const getUserProfileData = async () => {
          const response = await getUserData(loggedInUserData?.shardId);
          if (!response.error) {
            setloggedInUserData({ ...response.data, accessToken: loggedInUserData.accessToken });
          }
        };
        getUserProfileData();
      }
      setSubmitLoader(false);
      props?.setIsProgramSubmited(!props?.isProgramSubmited)
    } catch (error) {
      console.log("ERROR IN TESTING :", error);
    }
  };

  const handleEditorChange = (value) => setInput(value);

  const handleEditorWillMount = (monaco) => setupMonaco(monaco);

  const handleEditorDidMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, () => { });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX, () => { });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => { });
    editor.updateOptions({ fontFamily: "Menlo", fontSize: 14 });
  };

  return (
    <div className="h-screen w-full border flex-1 z-10 rounded-[12px]">
      <Toaster />
      <Transition className="absolute h-screen top-1/3 left-1/3" appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="absolute h-screen z-10" onClose={() => setIsDialogOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-black text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="flex font-medium leading-6 text-gray-900 bg-black px-5 py-5 background_dots">
                <div className="flex-1 relative self-stretch mt-[-1.00px] font-gilroy font-semibold text-white text-5xl tracking-[0] leading-[30px]">Confirm your submission</div>
                <div className="flex-1 text-[20px] cursor-pointer font-semibold flex justify-end items-end">
                  <span onClick={() => setIsDialogOpen(false)}><IoMdClose /></span>
                </div>
              </Dialog.Title>
              <div className="px-5 border-b pb-5">
                <p className="pt-5 pb-2 relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">Once you submit this code, you cannot compile or submit again for this program.</p>
                <p className="pb-2 relative self-stretch font-gilroy text-[#b1b0b9] text-base tracking-[0] leading-7">This is your wallet address</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    disabled={!editWalletAddress}
                    className={`w-full border-[1px] px-2 py-2 rounded-[12px] ${editWalletAddress ? 'border-shardeumBlue text-black' : ''}`}
                  />
                  <p onClick={() => setEditWalletAddress(!editWalletAddress)} className="cursor-pointer border-[1px] border-shardeumBlue text-shardeumBlue text-[20px] p-4 rounded-[12px] flex justify-center items-center">
                    <RiPencilFill />
                  </p>
                </div>
              </div>
              <div className="py-3 px-5 flex justify-end">
                <DCButton
                  variant="primary"
                  btnContent="Confirm Submission"
                  onClick={() => handleSubmitAndTest(false)}
                />
                {/* <GreenButton isHoveredReq={true} onClick={() => handleSubmitAndTest(false)} text={"Confirm Submission"} /> */}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      <div className="w-full relative z-10 overflow-hidden px-8 flex items-center justify-between h-[10%]">
        <div className="flex items-center">
          <FaCode className="mr-3" />
          <p className={`text-overflow-ellipsis font-helvetica-neue ${props?.darkTheme ? 'text-[#CAFFEF]' : 'text-black'}`}>Code Editor</p>
        </div>
        <img alt="tri" src={TRI_IMG} className="absolute z-20 right-5 top-2" />
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
            value={input}
            theme={props.darkTheme ? "vs-dark" : "light"}
            onChange={handleEditorChange}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="w-full h-[40%] overflow-y-scroll">
          {!submitted && props.completed?.completed === false && (
            <div className="w-full flex justify-end py-5 px-8 border-b">
              <button
                disabled={submitLoader}
                className={`${submitLoader ? 'cursor-not-allowed' : ''} border-[1px] border-shardeumGreen rounded-[10px] px-8 py-[6px] mr-5 text-semibold hover:text-black ${props?.darkTheme ? 'bg-transparent text-shardeumGreen hover:bg-shardeumGreen' : 'bg-green-500 border-green-500 text-white'}`}
                onClick={() => handleSubmitAndTest(true)}
              >
                Compile
              </button>
              {compileError === false && (
                <button
                  disabled={submitLoader}
                  className={`${submitLoader ? 'cursor-not-allowed' : ''} border-[1px] border-shardeumGreen rounded-[10px] px-8 py-[6px] mr-5 font-semibold text-black ${props?.darkTheme ? 'bg-shardeumGreen' : 'bg-green-500 border-green-500 text-white hover:text-black'}`}
                  onClick={() => {
                    if (props.course === true) {
                      handleSubmitAndTest(false)
                    } else {
                      setIsDialogOpen(true)
                    }
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          )}
          {submitLoader ? (
            <Loader />
          ) : (
            <OutputSection output={output} compileError={compileError} testCases={testCases} currentTestCase={currentTestCase} setCurrentTestCase={setCurrentTestCase} darkTheme={props?.darkTheme} />
          )}
        </div>
      </Split >
    </div >
  );
};

const Loader = () => (
  <div className="px-6 py-6">
    <div className="flex-1 space-y-6 py-1">
      <div className="space-y-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const OutputSection = ({ output, compileError, testCases, currentTestCase, setCurrentTestCase, darkTheme }) => (
  <div className={`${output !== "" && ''} px-6`}>
    {output !== "" && compileError ? (
      <div className="px-2 py-4">
        <p className="text-wrap text-lg text-red-500">Compilation Failed<br /><br /></p>
        <pre className="text-wrap" dangerouslySetInnerHTML={{ __html: output }}></pre>
      </div>
    ) : (
      <div className="text-wrap p-2">
        <p className={`text-lg ${darkTheme ? 'text-shardeumGreen' : 'text-green-500'}`}>{output}</p>
      </div>
    )}
    {testCases && (
      <div className="p-2">
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-2 rounded-[4px] flex flex-col gap-4 justify-center">
            {testCases.map((single, index) => (
              <p key={index} onClick={() => setCurrentTestCase(index)} className={`flex flex-row gap-2 border-[1px] rounded-[12px] py-3 px-2 ${currentTestCase === index ? `cursor-pointer ${single?.passed ? 'border-shardeumGreen' : 'border-red-500'} text-white ${darkTheme ? '' : 'bg-black text-white'}` : ''} cursor-pointer`}>
                {single?.passed ? (
                  <div className={`flex justify-center items-center text-[20px] ${darkTheme ? 'text-shardeumGreen' : 'text-green-500'}`}>
                    <IoMdCheckmark />
                  </div>
                ) : (
                  <div className="flex justify-center items-center text-red-500 text-[20px]">
                    <IoMdClose />
                  </div>
                )}
                <div>
                  <span>Test Case {index + 1}</span>
                </div>
              </p>
            ))}
          </div>
          <div className="col-span-6 border-[0.5px] rounded-[12px] p-2 pt-3">
            <p>{testCases[currentTestCase].description}</p>
            <br />
            {testCases[currentTestCase]?.error && <p>{testCases[currentTestCase]?.error}</p>}
          </div>
        </div>
      </div>
    )}
  </div>
);

export default IDE;