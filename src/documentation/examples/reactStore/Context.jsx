import React from "react";
import useStore from "./useStore";
export const Context = React.createContext();
const ContextProvider = ({
  children,
  aNicePropertyNameOne,
  aNicePropertyNameTwo,
}) => {
  let { ...store } = useStore({
    aNicePropertyNameOne,
    aNicePropertyNameTwo,
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
