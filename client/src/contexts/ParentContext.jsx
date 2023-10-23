import { createContext, useState } from "react";

import * as ethers from "ethers";

export const ParentContext = createContext();

export const ParentProvider = ({ children }) => {
  const [courseBought, setcourseBought] = useState(false);
  return <ParentContext.Provider value={{ courseBought, setcourseBought }}>{children}</ParentContext.Provider>;
};
