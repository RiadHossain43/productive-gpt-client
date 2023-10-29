import { Button } from "reactstrap";
import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/img/brand/logo-ai.png";
import PageLayout from "../components/PageLayout";
const Content = () => {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <div className="login-form">
        <img className="login-productiveai-logo mb-4" src={logo} />
        <h4 className="">Are you sure?</h4>
        <p className="mb-5">
          By clicking this action below you will be logged out.
        </p>
        <Link className="btn-link" to={"/chats"}>
          <small>
            <MdKeyboardBackspace /> Go back
          </small>
        </Link>
        <Button
          className="mt-2 mb-2"
          color="primary"
          onClick={() => navigate("/accounts/logout")}
          type="button"
          block
        >
          Log out <IoMdLogOut />
        </Button>
      </div>
    </PageLayout>
  );
};

export default Content;
