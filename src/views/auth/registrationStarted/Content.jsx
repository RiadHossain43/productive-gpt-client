import { Button, Spinner } from "reactstrap";
import { FiSend } from "react-icons/fi";
import logo from "../../../assets/img/brand/logo-ai.png";
import PageLayout from "../components/PageLayout";
import {
  useRegistrationStarted,
  USER_ACTIONS,
} from "./registratinStartedStore";
import React from "react";
import { useApplication } from "../../../stores/applicationStore";
import { Link } from "react-router-dom";
const Content = () => {
  const { processing, resendVerification } = useRegistrationStarted();
  const { currentUserData } = useApplication();
  return (
    <PageLayout varient="sign-up">
      <div className="login-form">
        <img className="login-alice-logo mb-4" src={logo} />
        <h4 className="">Email verification!</h4>
        <p className="mb-5">
          We have sent a verification email to {currentUserData?.email}. Please
          follow the link in the email and verify your account.
        </p>
        <Button
          className="mt-5 mb-2"
          color="primary"
          type="button"
          onClick={resendVerification}
          disabled={processing[USER_ACTIONS.RESEND_VERIFICATION].status}
          block
        >
          {processing[USER_ACTIONS.RESEND_VERIFICATION].status ? (
            <React.Fragment>
              Sending email <Spinner size="sm" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              Send again <FiSend />
            </React.Fragment>
          )}
        </Button>
        <small>Already a member? </small>
        <Link className="btn-link" to={"/accounts/login"}>
          <small>Sign in</small>
        </Link>
      </div>
    </PageLayout>
  );
};

export default Content;
