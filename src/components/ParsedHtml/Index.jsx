import React from "react";
import { Button, Badge } from "reactstrap";
import { VscRunAll } from "react-icons/vsc";
import { MdContentCopy } from "react-icons/md";
import useClipboard from "../../hooks/useClipboard";
import useDualStateController from "../../hooks/useDualStateController";
import * as styles from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const ParsedHtml = ({ html, children }) => {
  const { copyPlainTextToClipBoard } = useClipboard();
  const { isOpen: isPreview, toggle: togglePreview } = useDualStateController();
  return (
    <React.Fragment>
      <Button
        size="sm"
        className="border-0"
        outline
        onClick={() => {
          togglePreview();
        }}
      >
        {!isPreview ? "Preview chart" : "View source"} <VscRunAll />
      </Button>
      <Badge outline="primary">Beta</Badge>
      <div>
        {isPreview ? (
          <iframe
            width={"100%"}
            style={{ minHeight: 500 }}
            src="data:text/html;charset=utf-8,"
            srcDoc={html}
          ></iframe>
        ) : (
          <div className="position-relative">
            <Button
              size="sm"
              className="chat-copy-code-block-button border-0"
              outline
              onClick={() => copyPlainTextToClipBoard(children)}
            >
              <MdContentCopy />
            </Button>
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={styles.vscDarkPlus}
              language={"html"}
              PreTag="div"
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default ParsedHtml;
