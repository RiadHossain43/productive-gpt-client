import React from "react";
import useStore from "./useStore";
export const Context = React.createContext();
/**
 * @typedef ComponentProperties
 * @property {JSX.Element} children - children components
 * @property {Object} chatheadId - chathead takes a chathead object model. ALERT: this property is acted as default property and is uncontrolled.
 */
/**
 *
 * @param {ComponentProperties} properties
 * @returns {JSX.Element}
 */
const ContextProvider = ({ children, chatheadId = null }) => {
  let { ...store } = useStore({
    chatheadId,
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
