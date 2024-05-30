import Editor from "@monaco-editor/react";
import { useEffect,useRef, useState } from "react";
import { solidityLanguageConfig,solidityTokensProvider } from './EditorConfig'
import * as monaco from "monaco-editor"
import solcjs from 'solc-js'
import { FaCode } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

export default function IDE() {
	let compiler=useRef()
	const editor=useRef(null)
	const [fontSize,setFontSize]=useState(16)
	function setupMonaco() {
		monaco.languages.register({ id: 'solidity' })
		monaco.languages.setLanguageConfiguration(
			'solidity',
			solidityLanguageConfig
		)
		monaco.languages.setMonarchTokensProvider('solidity', solidityTokensProvider);
		monaco.editor.defineTheme('mylang-theme', {
			base: 'vs',
			inherit: true,
			rules: [
			  { token: 'keyword', foreground: '#FF6600', fontStyle: 'bold' },
			  { token: 'comment', foreground: '#999999' },
			  { token: 'string', foreground: '#009966' },
			  { token: 'variable', foreground: '#006699' },
			],
			colors: {
				'editor.foreground': '#000000', 
				'editor.background': '#FFFFFF', 
				'editorCursor.foreground': '#A7A7A7', 
				'editor.lineHighlightBackground': '#FFFFFF', 
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
							value:"nasim",
				
					});
	}
	const loadsolc = async () => {
		compiler.current = await solcjs("v0.5.1-stable-2018.12.03")
	}
  const execute = async () => {
    // console.log(editor.current.getValue())
    const output=await compiler.current(editor.current.getValue())
    console.log(output)
  }
	useEffect(() => {
		setupMonaco()
		loadsolc()
	}, [])
  function handleEditorChange(value, event) {
    setCode(value);
  }
  return (
    <div className="h-screen w-full">
      {/* <Editor
        height="70vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"          
        onChange={handleEditorChange}
      /> */}
	  <div className="w-full  bg-black py-1 px-2 flex items-center justify-between">
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
      <div className="w-full p-3 bg-black">
            <button className="bg-transparent border border-white rounded text-white p-2" onClick={execute}>Compile</button>
			<button className="bg-transparent border border-white rounded text-white p-2" onClick={execute}>Submit</button>

      </div>
      <div>

      </div>
    </div>
  );
}
