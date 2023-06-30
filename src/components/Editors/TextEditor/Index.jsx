import React from "react";
import TextEditorContextProvider from "./Context";
import WrappedEditor from "./WrappedEditor";
import PropTypes from "prop-types";
export default function Index(props) {
  return (
    <TextEditorContextProvider {...props}>
      <WrappedEditor {...props} />
    </TextEditorContextProvider>
  );
}
Index.propTypes = {
  /** pre populated contents in the editor */
  value: PropTypes.string,
  /** link generator function helps to  get the file links */
  linkGeneratorFn: PropTypes.func,
  /** helps to specify where any media resource should be stored */
  handleUpload: PropTypes.func,
};
