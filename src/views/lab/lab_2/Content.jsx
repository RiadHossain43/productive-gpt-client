import React from "react";
import DocumentEditor from "../../../components/DocumentEditor/DocumentEditor";
import { useHook } from "./store";
const Content = () => {
  const {} = useHook();
  return <DocumentEditor />;
};

export default Content;
