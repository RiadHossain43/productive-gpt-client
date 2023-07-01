import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";
import { BiEnvelope, BiLock, BiUser } from "react-icons/bi";
import { RxRocket } from "react-icons/rx";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/brand/logo-ai.png";
import useForm from "../../../hooks/useForm";
import PageLayout from "../components/PageLayout";
import {
  defaultRegisterDataSet,
  defaultRegisterDataSetValidation,
} from "../utils/data";
import { useRegistration } from "./registratinStore";
import React from "react";
const Register = () => {
  let { dataModel, handleChange, isBusy, handleSubmit, isFormValid } = useForm(
    defaultRegisterDataSet,
    defaultRegisterDataSetValidation
  );
  const { registerAccount } = useRegistration();
  return (
    <PageLayout varient="sign-up">
      <div className="login-form">
        <img className="login-alice-logo mb-4" src={logo} />
        <h4 className="">
          <MdOutlineAutoFixHigh /> Get Started!
        </h4>
        <p className="mb-5">
          Register with any personal or business email to unlock the power of
          our freetools.
        </p>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <BiUser />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            label="Name"
            placeholder="Full name"
            autoComplete="off"
            value={dataModel.name}
            onChange={(e) =>
              handleChange({
                field: "name",
                value: e.currentTarget.value,
              })
            }
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <BiEnvelope />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            label="Email"
            placeholder="Email"
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
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <BiLock />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            label="Password"
            placeholder="Password"
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
        <Button
          className="mt-5 mb-2"
          color="primary"
          type="button"
          onClick={(e) => handleSubmit(e, registerAccount)}
          disabled={!isFormValid() || isBusy}
          block
        >
          {isBusy ? (
            <React.Fragment>
              Signing up <Spinner size="sm" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              Sign up <RxRocket />
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

export default Register;
