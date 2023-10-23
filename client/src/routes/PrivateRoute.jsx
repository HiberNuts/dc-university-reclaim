import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAccount } from "wagmi";

const PrivateRoute = ({ exact, component: Component, authed, ...rest }) => {
  const { address, isConnected } = useAccount();

  return isConnected ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
