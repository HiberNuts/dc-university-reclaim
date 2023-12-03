import React, { Suspense, lazy } from "react";
const Main = lazy(() => import("./Main"));
import logo from "../../assets/navlogoBlack.svg";
export default function Home() {
  return (
    <div className="wrapper flex  justify-center">
      <Suspense
        fallback={
          <div className="w-screen bg-[#FCFAEF]  h-screen items-center flex justify-center align-middle">
            <img className="w-[260px] h-[30px]" src={logo} />
          </div>
        }
      >
        <Main />
      </Suspense>
    </div>
  );
}
