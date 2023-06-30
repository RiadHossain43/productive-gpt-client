import { Button, Spinner } from "reactstrap";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import logo from "../../../assets/img/brand/logo-ai.png";
import PageLayout from "../components/PageLayout";
import {
  USER_ACTIONS,
  useAccountVerfication,
} from "./accountVerificationStore";
const Content = () => {
  const { verifyRegistration, processing } = useAccountVerfication();
  return (
    <PageLayout varient="sign-up">
      <div className="login-form">
        <img className="login-alice-logo mb-4" src={logo} />
        <h4 className="">Almost there!</h4>
        <p className="mb-5">
          You are just a step away from unleashing the power of Alice.
        </p>
        <Button
          className="mt-5 mb-2"
          color="primary"
          type="button"
          onClick={verifyRegistration}
          disabled={processing[USER_ACTIONS.VERIFY_REGISTRATION].status}
          block
        >
          {processing[USER_ACTIONS.VERIFY_REGISTRATION].status ? (
            <React.Fragment>
              Verifiying account <Spinner size="sm" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              Verify account <FiCheckCircle />
            </React.Fragment>
          )}
        </Button>
      </div>
    </PageLayout>
  );
};

export default Content;
