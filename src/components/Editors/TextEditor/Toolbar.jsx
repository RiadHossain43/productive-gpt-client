import React from "react";
import { TextEditorContext } from "./Context";
import toolTypes from "./toolTypes";
import ButtonSeparator from "./ButtonSeparator";
import { Button } from "reactstrap";
import FilePicker from "./FilePicker";
import classNames from "classnames";
export default function ToolBar(props) {
  const {
    getFileInputProps,
    isToolActive,
    handleToolClick,
    focusedForEditing,
  } = React.useContext(TextEditorContext);
  return (
    <>
      <FilePicker {...getFileInputProps()} />
      {Object.keys(toolTypes).map((type, index) => {
        return (
          <React.Fragment key={type}>
            {toolTypes[type]?.map((tool) => {
              return (
                <Button
                  title={tool?.label}
                  type="button"
                  color="link"
                  className={classNames("text-toolbar-btn", {
                    "text-muted": !focusedForEditing,
                    "text-secondary": focusedForEditing,
                    "text-primary": isToolActive(tool) && focusedForEditing,
                  })}
                  key={tool?.style}
                  onMouseDown={(e) => handleToolClick(tool, e)}
                >
                  {tool.icon ? (
                    <i
                      className={classNames("", {
                        "text-primary": isToolActive(tool),
                      })}
                    >
                      {tool.icon}
                    </i>
                  ) : (
                    tool?.label
                  )}
                </Button>
              );
            })}
            {index < Object.keys(toolTypes).length - 1 && <ButtonSeparator />}
          </React.Fragment>
        );
      })}
    </>
  );
}
