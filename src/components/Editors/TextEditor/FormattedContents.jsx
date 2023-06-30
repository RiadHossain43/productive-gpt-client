import React from "react";
import TextEditorContextProvider from "./Context";
import TextEditor from "./TextEditor";
const FormatedContents = (props) => {
  return (
    <TextEditorContextProvider {...props}>
      <TextEditor {...props} readOnly={true} />
    </TextEditorContextProvider>
  );
};

export default FormatedContents;
