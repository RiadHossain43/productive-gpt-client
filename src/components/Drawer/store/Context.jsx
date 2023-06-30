import React from "react";
import useDocumentStore from "./useDrawerStore";
export const DrawerContext = React.createContext();
const DrawerContextProvider = ({ children, ...rest }) => {
  let { ...store } = useDocumentStore({});
  return (
    <DrawerContext.Provider
      value={{
        ...store,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
export default DrawerContextProvider;
