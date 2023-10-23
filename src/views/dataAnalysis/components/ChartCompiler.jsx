import React, { useEffect, useRef } from "react";
import { postMarkup, preMarkup } from "./compilerMarups";

const ChartCompiler = ({ injectedCode = " " }) => {
  const chartPreviewFrame = useRef(null);
  useEffect(() => {
    if (chartPreviewFrame.current) {
      const chartPreview =
        chartPreviewFrame.current?.contentDocument ||
        chartPreviewFrame.current?.contentWindow.document;
      chartPreview.open();
      chartPreview.write(preMarkup + injectedCode + postMarkup);
      chartPreview.close();
    }
  }, [injectedCode]);
  return <iframe ref={chartPreviewFrame}></iframe>;
};

export default ChartCompiler;
