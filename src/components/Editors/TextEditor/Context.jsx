import React from "react";
import useTextEditor from "./useTextEditor";
export const TextEditorContext = React.createContext();
const TextEditorContextProvider = ({ children, ...rest }) => {
  let { ...editorUtils } = useTextEditor({
    handleUpload: rest.handleUpload || async function () {},
    linkGeneratorFn: rest.linkGeneratorFn,
    onDataStructureChange: rest.onDataStructureChange || function () {},
    value: rest.value || null,
  });
  return (
    <TextEditorContext.Provider
      value={{
        ...editorUtils,
        mentionSuggestions: rest.mentionSuggestions || [],
      }}
    >
      {children}
    </TextEditorContext.Provider>
  );
};
export default TextEditorContextProvider;
