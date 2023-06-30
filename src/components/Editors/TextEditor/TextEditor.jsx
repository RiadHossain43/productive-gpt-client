import React from "react";
import { Editor } from "draft-js";
import { TextEditorContext } from "./Context";
import { editorMediaBlockRenderer } from "./entities/editorMediaBlockRenderer";
import AiAssistant from "./components/aiAssistant/Index";
export default function TextEditor({ readOnly = false, ...props }) {
  const {
    editorRef,
    editorState,
    handleEditorStateChange,
    handleDroppedFiles,
    handlePastedFiles,
    handleKeyCommand,
    activateEditor,
    deactivateEditor,
    editMode,
  } = React.useContext(TextEditorContext);
  return (
    <React.Fragment>
      {/* {aiassistantActive && <AiAssistant />} */}
      <Editor
        ref={editorRef}
        blockRendererFn={editorMediaBlockRenderer}
        placeholder={props.placeholder}
        onChange={handleEditorStateChange}
        editorState={editorState}
        spellCheck={true}
        handleKeyCommand={handleKeyCommand}
        handleDroppedFiles={handleDroppedFiles}
        handlePastedFiles={handlePastedFiles}
        readOnly={readOnly || editMode !== "draft-editor"}
        onFocus={activateEditor}
        onBlur={deactivateEditor}
      />
    </React.Fragment>
  );
}
