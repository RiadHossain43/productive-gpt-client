import { Button, Spinner } from "reactstrap";
import React from "react";
import { IoMdRefresh } from "react-icons/io";
import logo from "../../../assets/img/brand/logo-ai.png";
import PageLayout from "../components/PageLayout";
import { USER_ACTIONS, useLogout } from "./logoutStore";
const Content = () => {
  const { processing } = useLogout();
  return (
    <PageLayout>
      <div className="login-form">
        <img className="login-productiveai-logo mb-4" src={logo} />
        <h4 className="">See you soon!</h4>
        <p className="mb-5">
          <Spinner size="sm" /> We are safely logging you out.
        </p>
        {processing[USER_ACTIONS.LOGOUT].error && (
          <React.Fragment>
            <small className="text-danger">Ops! Something went wrong.</small>
            <Button
              className="mt-2 mb-2"
              color="primary"
              onClick={() => window.location.reload()}
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
