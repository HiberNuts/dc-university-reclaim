import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';
import { useEffect } from "react";
export default function IDE() {
    // useEffect(() => {
    //     // Define a new language
    //     monaco.languages.register({ id: 'myCustomLanguage' });

    //     // Register a tokens provider for the language
    //     monaco.languages.setMonarchTokensProvider('myCustomLanguage', {
    //         tokenizer: {
    //             root: [
    //                 [/\b\w+\b/, 'identifier'],
    //                 [/\b\d+\b/, 'number'],
    //                 [/".*?"/, 'string'],
    //                 [/\/\/.*/, 'comment'],
    //                 [/\/\*.*?\*\//, 'comment'],
    //                 [/[{}()\[\]]/, '@brackets'],
    //                 [/[;,]/, 'delimiter']
    //             ]
    //         }
    //     });

    //     // Set the default configuration for the language
    //     monaco.languages.setLanguageConfiguration('myCustomLanguage', {
    //         comments: {
    //             lineComment: '//',
    //             blockComment: ['/*', '*/']
    //         },
    //         brackets: [
    //             ['{', '}'],
    //             ['[', ']'],
    //             ['(', ')']
    //         ],
    //         autoClosingPairs: [
    //             { open: '{', close: '}' },
    //             { open: '[', close: ']' },
    //             { open: '(', close: ')' },
    //             { open: '"', close: '"' }
    //         ]
    //     });

        
    // }, []);
  function handleEditorChange(value, event) {
    setCode(value);
  }
  return (
    <div className="h-full">
      <Editor
        height="70vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"          
        onChange={handleEditorChange}
      />
      <div className="w-full p-3 bg-black">
            <button className="bg-transparent border border-white rounded text-white p-2">Compile</button>
      </div>
      <div>

      </div>
    </div>
  );
}
