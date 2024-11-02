import React, { Suspense, lazy } from "react";
import logo from "../../assets/LogoName.svg";
const Main = lazy(() => import("./Main"));
export default function Home() {
  return (
    <div className="wrapper flex  justify-center overflow-x-hidden">
      <Suspense
        fallback={
          <div className="w-screen bg-black h-screen items-center flex justify-center align-middle">
            <img className="w-[300px] h-[300px]" src={logo} />
          </div>
        }
      >
        <Main />
      </Suspense>
    </div>
  );
}
