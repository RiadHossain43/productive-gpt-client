import React from "react";
import { BiEnvelope, BiLock, BiLogInCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import logo from "../../../assets/img/brand/logo-ai.png";
import useForm from "../../../hooks/useForm";
import PageLayout from "../components/PageLayout";
import { PiHandWaving } from "react-icons/pi";
import {
  defaultAuthDataSet,
  defaultAuthDataSetValidation,
} from "../utils/data";
import { useLogin } from "./loginStore";
const Login = () => {
  let { dataModel, handleChange, isBusy, handleSubmit, isFormValid } = useForm(
    defaultAuthDataSet,
    defaultAuthDataSetValidation
  );
  const { processing, login } = useLogin();
  return (
    <PageLayout>
      <div className="login-form">
        <img className="login-productiveai-logo mb-4" src={logo} />
        <h4 className="">
          <PiHandWaving /> Welcome!
        </h4>
        <p className="mb-5">
          Boost your business efficiency with our freetools.
        </p>
        <Form>
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
          <Link className="btn-link" to={"/accounts/recovery"}>
            <small>Forgot password?</small>
          </Link>
          <Button
            className="mt-5 mb-2 text-center"
            color="primary"
            type="submit"
            onClick={(e) => handleSubmit(e, login)}
            disabled={!isFormValid() || isBusy}
            block
          >
            {isBusy ? (
              <React.Fragment>Signing in</React.Fragment>
            ) : (
              <React.Fragment>
                Sign in <BiLogInCircle />
              </React.Fragment>
            )}
          </Button>
        </Form>
        <small>Don't have an account? Let's </small>
        <Link className="btn-link" to={"/accounts/register"}>
          <small>Get Started</small>.
        </Link>
      </div>
    </PageLayout>
  );
};

export default Login;
