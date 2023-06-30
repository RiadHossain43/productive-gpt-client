import React from "react";
import TextEditor from "./TextEditor";
import { TextEditorContext } from "./Context";
import ToolBar from "./Toolbar";
import classnames from "classnames";
export default function WrappedEditor(props) {
  const { forceFocusEditorEnd, focusedForEditing } =
    React.useContext(TextEditorContext);
  return (
    <div
      className={classnames("document-editor-container d-flex flex-column", {
        "editor-disabled": props.readOnly,
        "editor-active": focusedForEditing,
        "editor-breathing": props.breathing,
      })}
    >
      {!props.readOnly && focusedForEditing && (
        <div className="bg-light toolbar">
          <ToolBar {...props} />
          {/* <hr></hr> */}
        </div>
      )}
      <div
        className={classnames("", {
          "d-flex flex-column input-area": !props.readOnly,
        })}
      >
        <div
          className={classnames("", {
            "px-3 pt-3": !props.readOnly,
          })}
        >
          <TextEditor {...props} />
        </div>
        {/**
         * following portion helps to focus on the actual text area
         * when unedited remaing area is clicked.
         */}
        {!props.readOnly && (
          <div className="mt-2 flex-grow-1" onMouseDown={forceFocusEditorEnd}></div>
        )}
      </div>
    </div>
  );
}
