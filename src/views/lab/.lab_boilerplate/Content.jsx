import { Spinner } from "reactstrap";
import React from "react";
import logo from "../../../assets/img/brand/logo-ai.png";
import { useHook } from "./store";
const Content = () => {
  const {} = useHook();
  return (
    <div className="login-form">
      <img className="login-productiveai-logo mb-4" src={logo} />
      <h4 className="">Welcome to lab!</h4>
      <p className="mb-5">
        <Spinner size="sm" /> Let's start a new project.
      </p>
    </div>
  );
};

export default Content;
