import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";
import { BiEnvelope } from "react-icons/bi";
import { RiRefreshLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { RiRotateLockLine } from "react-icons/ri";
import logo from "../../../assets/img/brand/logo-ai.png";
import useForm from "../../../hooks/useForm";
import PageLayout from "../components/PageLayout";
import {
  defaultRecoveryDataSet,
  defaultRecoveryDataSetValidation,
} from "../utils/data";
import { useAccountRecovery } from "./accountRecoveryStore";
import React from "react";
const Content = () => {
  let { dataModel, handleChange, isBusy, handleSubmit, isFormValid } = useForm(
    defaultRecoveryDataSet,
    defaultRecoveryDataSetValidation
  );
  const { recoverySuccessEmail, recoverAccount } = useAccountRecovery();
  return (
    <PageLayout>
      <div className="login-form">
        <img className="login-productiveai-logo mb-4" src={logo} />
        <h4 className="">
          <RiRotateLockLine /> Forgot password!
        </h4>
        <p className="mb-5">
          Please enter your email address so that we can assist you in
          recovering your account.
        </p>
        {recoverySuccessEmail && (
          <p className="text-success mb-2">
            A verificaion email has been sent to {recoverySuccessEmail}.
          </p>
        )}
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <BiEnvelope />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            label="Email"
            placeholder="i.e. your.email@domain.com"
            type="email"
            autoComplete="off"
            value={dataModel.email}
            onChange={(e) =>
              handleChange({
                field: "email",
                value: e.currentTarget.value,
              })
            }
          />
        </InputGroup>
        <Link className="btn-link" to={"/accounts/login"}>
          <small>Login</small>
        </Link>
        <Button
          className="mt-5 mb-2"
          color="primary"
          type="button"
          onClick={(e) => handleSubmit(e, recoverAccount)}
          disabled={!isFormValid() || isBusy}
          block
        >
          {isBusy ? (
            <React.Fragment>
              Sending recovery email <Spinner size="sm" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              Recover account <RiRefreshLine />
            </React.Fragment>
          )}
        </Button>
        <small>Don't have an account? Let's </small>
        <Link className="btn-link" to={"/accounts/register"}>
          <small>Get Started</small>.
        </Link>
      </div>
    </PageLayout>
  );
};

export default Content;
