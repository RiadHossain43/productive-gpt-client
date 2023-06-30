import { Button, Spinner } from "reactstrap";
import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/brand/logo-ai.png";
import PageLayout from "../components/PageLayout";
import { USER_ACTIONS, useUnsubscribe } from "./store";
const Content = () => {
  const { unsubscribe, processing } = useUnsubscribe();
  return (
    <PageLayout>
      <div className="login-form">
        <img className="login-alice-logo mb-4" src={logo} />
        <h4 className="">Premium customer.</h4>
        <p className="mb-5">
          You are already a premium customer of Alice. In can case you are
          looking to cancel your subsciption you can follow the link bellow.
        </p>
        <Link className="btn-link" to={"/chats"}>
          <small>
            <MdKeyboardBackspace /> Go back to chats
          </small>
        </Link>
        <Button
          className="mt-2 mb-2"
          color="danger"
          onClick={() => unsubscribe()}
          type="button"
          block
        >
          {processing[USER_ACTIONS.UNSUBSCRIBE].status ? (
            <React.Fragment>
              Canceling <Spinner size="sm" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              Cancel subscription <IoMdLogOut />
            </React.Fragment>
          )}
        </Button>
      </div>
    </PageLayout>
  );
};

export default Content;
