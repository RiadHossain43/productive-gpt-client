import React from "react";
import TextEditor from "../Editors/TextEditor/Index";

export default function DocumentEditor({ body = "" }) {
  return (
    <React.Fragment>
      <TextEditor placeholder="New block..." />
    </React.Fragment>
  );
}
