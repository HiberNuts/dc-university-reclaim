import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";

import Footer from "./components/Footer";
import { ethers } from "ethers";

import Header from "./components/Home/Header";

import Pages from "./routes";
import PrivateRoute from "./routes/PrivateRoute";
import { useAccount } from "wagmi";
import Communtiy from "./components/Community/Communtiy";
import { Career } from "./components/Career/Career";
import Courses from "./components/Courses/Courses";
import Course from "./components/Courses/Course/Course";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import Mentorship from "./components/Mentor/Mentorship";
import Courseplace from "./components/Courseplace/Courseplace";

function App() {
  const chainID = 80001;
  const [account, setAccount] = useState(null);
  const coursesRef = useRef(null);

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  const RedirectAs404 = ({ location }) => <Navigate to={Object.assign({}, location, { state: { is404: true } })} />;
  const { address, isConnected } = useAccount();
  return (
    <>
      <Header />
      <Routes>
        {/* Auth Pages */}

        <Route exact path="/" element={<Home />} />
        {/*Error Pages*/}
        <Route path="/community" element={<Communtiy />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<Course />} />
        {/*Main Routes*/}
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/workplace" element={<Courseplace />} />
        </Route>

        <Route component={RedirectAs404}></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
