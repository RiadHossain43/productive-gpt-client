import React from "react";
import useStore from "./useStore";
export const Context = React.createContext();
const ContextProvider = ({ children, onSelectionChange = () => {} }) => {
  let { ...store } = useStore({
    onSelectionChange: onSelectionChange,
  });
  return (
    <Context.Provider
      value={{
        ...store,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
