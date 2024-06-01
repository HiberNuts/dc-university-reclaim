import Editor from "@monaco-editor/react";
import { useEffect,useRef, useState } from "react";
import { solidityLanguageConfig,solidityTokensProvider } from './EditorConfig'
import * as monaco from "monaco-editor"
import solcjs from 'solc-js'
import { FaCode } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
// import { Editor } from "@monaco-editor/react";
export default function IDE(props) {
	let compiler=useRef()
	const editor=useRef(null)
	const [fontSize,setFontSize]=useState(16)
	const [output,setOutput]=useState(null)
	function setupMonaco() {
		monaco.languages.register({ id: 'solidity' })
		monaco.languages.setLanguageConfiguration(
			'solidity',
			solidityLanguageConfig
		)
		monaco.languages.setMonarchTokensProvider('solidity', solidityTokensProvider);
		monaco.editor.defineTheme('mylang-theme', {
			base: 'vs-dark',
			inherit: true,
			rules: [
			  { token: 'keyword', foreground: '#FF6600', fontStyle: 'bold' },
			  { token: 'comment', foreground: '#999999' },
			  { token: 'string', foreground: '#009966' },
			  { token: 'variable', foreground: '#006699' },
			],
			colors: {
				'editor.foreground': '#000000', 
				'editor.background': '#1e1e1e', 
				'editorCursor.foreground': '#A7A7A7', 
				'editor.lineHighlightBackground': '#1e1e1e', 
				'editorLineNumber.foreground': '#FFFFFF', 
				'editor.selectionBackground': '#88000030',
				'editor.inactiveSelectionBackground': '#88000015' 
			  }
		  });
		  monaco.languages.registerCompletionItemProvider('solidity', {
			provideCompletionItems: (model, position) => {
			  const suggestions = [
				...solidityTokensProvider.keywords.map(k => {
				  return {
					label: k,
					kind: monaco.languages.CompletionItemKind.Keyword,
					insertText: k,
				  };
				}),
			  ];
			  return { suggestions: suggestions };
			}
		  });
		  
		  const container = document.getElementById('container');
		  editor.current = monaco.editor.create(container, {
							theme: 'mylang-theme',
							language: 'solidity',
							fontFamily: 'Menlo',
							fontSize,
							value:"//write code here",
					});
	}
	const loadsolc = async () => {
		compiler.current = await solcjs("v0.5.1-stable-2018.12.03")
	}
  const execute = async () => {
    // console.log(editor.current.getValue())
    const compilerOutput=await compiler.current(editor.current.getValue())
    setOutput(compilerOutput)
  }
	useEffect(() => {
		setupMonaco()
		loadsolc()
	}, [])
  function handleEditorChange(value, event) {
    setCode(value);
  }
  return (
    <div className="h-screen w-full border flex-1">
      {/* <Editor
        height="70vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"          
        onChange={handleEditorChange}
      /> */}
	  <div className="w-full  bg-black  px-2 flex text-white items-center justify-between h-[10%]">
		<div className="flex items-center">
		<FaCode className=" text-white mr-3"/>
		<p className="text-white">Code Editor</p>
		</div>
		
		{/* <div className="flex items-center">
		<IoIosAdd className="text-white mr-3" />
		<FiMinus className="text-white"/>
		</div> */}
		

      </div>
      <div id="container" className="h-[50%]">
				
      </div>
      <div className="w-full p-3 bg-black h-[10%]" >
            <button className="bg-transparent border border-white rounded text-white p-2 mr-5" onClick={execute}>Compile</button>
			<button className="bg-transparent border border-white rounded text-white p-2" onClick={execute}>Submit</button>

      </div>
      <div className="h-[30%] bg-[#1e1e1e] p-5 text-white">

		{output && 
		<div>
			<p className="text-lg">
				byte code:
			</p>
			<p className="mt-4 whitespace-pre-line overflow-clip">
			{output[0].binary.bytecodes.bytecode}
			</p>

		</div>
		
		}

      </div>
    </div>
  );
}
