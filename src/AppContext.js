import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const currentUserIsInGroup = (accessGroup) => {
    const accessGroupArray = currentUser.accessGroups
      .split(",")
      .map((m) => m.trim());
    return accessGroupArray.includes(accessGroup);
  };

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentUserIsInGroup,
        backendUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
