import React, { Suspense, lazy, startTransition } from "react";
const Main = lazy(() => import("./Main"));
import logo from "../../assets/navlogoBlack.png";
export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-screen bg-[#FCFAEF] h-screen items-center flex justify-center align-middle">
          <img src={logo} />
        </div>
      }
    >
      <div className="wrapper flex  justify-center">
        <Suspense
          fallback={
            <div className="w-screen bg-[#FCFAEF] h-screen items-center flex justify-center align-middle">
              <img src={logo} />
            </div>
          }
        >
          <Main />
        </Suspense>
      </div>
    </Suspense>
  );
}
