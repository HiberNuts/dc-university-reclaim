import { useEffect, useState } from "react";
import { getContestSolution } from "../../../utils/api/ContestAPI"
import { useParams } from "react-router-dom"
import 'react-resizable/css/styles.css';
import Split from "react-split";
import Problem from "../../editor/Problem/Problem";

export default function Solution() {
  const { title } = useParams();
  const [loader, setLoader] = useState(true);
  const [program, setProgram] = useState(null);
  const [contest, setContest] = useState(null);
  const [darkTheme, setDarkTheme] = useState(true);
  const [error,setError]=useState('');
  useEffect(() => {
    getContestSolution(title).then((resp) => {
      if (resp.error == false) {
        console.log(resp.data)
        setContest(resp.data.contest);
        setProgram(resp.data.program);
        if(resp.data.program?.solution=='')
        {
          setError("Solution is not added yet!");
          console.log("Solution is not added in db")
          return;
        }
        setLoader(false);
      }
      else
      {
         setError(resp.message);
      }
    })
  }, [title])
  return (
    <div>
      {
        loader ? error!=''?
        <div className="h-screen flex justify-center items-center text-[30px]">
            {error}
          </div>  
        :
          <div className="h-screen flex justify-center items-center text-[30px]">
            ...
          </div> :
          <div>
            <div className={`w-full h-screen overflow-auto ${darkTheme && "bg-black text-white"} transition-all duration-200 ease-linear py-14`}>

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
                  {
                    loader ?
                      <div className="text-center text-white my-40">
                        Loading...
                      </div>
                      :
                      <Problem darkTheme={darkTheme} toggleTheme={() => setDarkTheme(theme => !theme)} contest={contest} program={program} />
                  }
                </div>
                {/* <ResizableBox width={800} height={800}
                minConstraints={[100, 100]} maxConstraints={[300, 300]}>
                  {
                    loader?
                    <div className="text-center text-white my-40">
                      Loading...
                    </div>
                    :
                    <div className="h-full">
                        <Editor
                            className="border-black h-full"
                            defaultLanguage="solidity"
                            defaultValue={program?.solution??''}
                            theme={darkTheme ? "vs-dark" : "light"}
                        />
                    </div>
                  }
                </ResizableBox> */}
              </Split>
              <div className="w-full p-10">
                <p className="text-[35px] font-bold mb-5 underline" >Solution</p>
                <p dangerouslySetInnerHTML={{ __html: program?.solution?.replace(/\n/g, '<br>') }} />
              </div>
                  
            </div>
          </div>
      }

    </div>
  )
}