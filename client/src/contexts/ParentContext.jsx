import { createContext, useState } from "react";
export const ParentContext = createContext("");

export const ParentProvider = ({ children }) => {
  const [loggedInUserData, setloggedInUserData] = useState({});
  const [userDataIsUpdated, setuserDataIsUpdated] = useState(false);
  const [courseLoading, setcourseLoading] = useState(false);
  const [contests,setContests]=useState([])

  return (
    <ParentContext.Provider
      value={{
        loggedInUserData,
        setloggedInUserData,
        userDataIsUpdated,
        setuserDataIsUpdated,
        courseLoading,
        setcourseLoading,
        contests,
        setContests
      }}
    >
      {children}
    </ParentContext.Provider>
  );
};
