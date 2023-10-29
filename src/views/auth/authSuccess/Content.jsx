import React from "react";
import { Button, Spinner } from "reactstrap";
import { IoMdRefresh } from "react-icons/io";
import logo from "../../../assets/img/brand/logo-ai.png";
import PageLayout from "../components/PageLayout";
import { USER_ACTIONS, useAuthSuccess } from "./authSuccessStore";
import { useNavigate } from "react-router-dom";
const Content = () => {
  const { processing } = useAuthSuccess();
  const navigate = useNavigate();
  return (
    <PageLayout varient="sign-up">
      <div className="login-form">
        <img className="login-productiveai-logo mb-4" src={logo} />
        <h4 className="">Getting ready!</h4>
        <p className="mb-5">
          <Spinner size="sm" /> We are getting everything ready for you.
        </p>
        {processing[USER_ACTIONS.GET_USER_INFO].error && (
          <React.Fragment>
            <small className="text-danger">Ops! Something went wrong.</small>
            <Button
              className="mt-2 mb-2"
              color="primary"
              onClick={() => navigate("/accounts/login")}
              type="button"
              block
            >
              Try again! <IoMdRefresh />
            </Button>
          </React.Fragment>
        )}
      </div>
    </PageLayout>
  );
};

export default Content;
