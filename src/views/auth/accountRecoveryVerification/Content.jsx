import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";
import { BiLock } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/brand/logo-ai.png";
import useForm from "../../../hooks/useForm";
import PageLayout from "../components/PageLayout";
import {
  defaultRecoveryVerificationDataSet,
  defaultRecoveryVerificationDataSetValidation,
} from "../utils/data";
import { useAccountRecoveryVerification } from "./accountRecoveryVerificationStore";
import React from "react";
const Content = () => {
  let { dataModel, handleChange, isBusy, handleSubmit, isFormValid } = useForm(
    defaultRecoveryVerificationDataSet,
    defaultRecoveryVerificationDataSetValidation
  );
  let { verifyRecovery } = useAccountRecoveryVerification();
  return (
    <PageLayout>
      <div className="login-form">
        <img className="login-alice-logo mb-4" src={logo} />
        <h4 className="">
          <CgPassword /> Password reset!
        </h4>
        <p className="mb-5">
          Setup a strong new password to secure your account.
        </p>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <BiLock />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            label="Password"
            placeholder="i.e. KH%43S(AUS@#)JASB"
            type="password"
            autoComplete="off"
            value={dataModel.password}
            onChange={(e) =>
              handleChange({
                field: "password",
                value: e.currentTarget.value,
              })
            }
          />
        </InputGroup>
        <Link className="btn-link" to={"/account/recovery"}>
          <small>Forgot password?</small>
        </Link>
        <Button
          className="mt-5 mb-2"
          color="primary"
          type="button"
          onClick={(e) => handleSubmit(e, verifyRecovery)}
          disabled={!isFormValid()}
          block
        >
          {isBusy ? (
            <React.Fragment>
              Setting up <Spinner size="sm" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              Setup <MdArrowRightAlt />
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
