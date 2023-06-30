import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";
import { BiEnvelope, BiLock, BiLogInCircle } from "react-icons/bi";
import { MdOutlineWavingHand } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/brand/logo-ai.png";
import useForm from "../../../hooks/useForm";
import PageLayout from "../components/PageLayout";
import { BiRocket } from "react-icons/bi";
import {
  defaultAuthDataSet,
  defaultAuthDataSetValidation,
} from "../utils/data";
import { useLogin } from "./loginStore";
import React from "react";
import { MoonLoader, PuffLoader, PulseLoader } from "react-spinners";
const Login = () => {
  let { dataModel, handleChange, isBusy, handleSubmit, isFormValid } = useForm(
    defaultAuthDataSet,
    defaultAuthDataSetValidation
  );
  const { processing, login } = useLogin();
  return (
    <PageLayout>
      <div className="login-form">
        <img className="login-alice-logo mb-4" src={logo} />
        <h4 className="">Welcome!</h4>
        <p className="mb-5">
          Boost your business efficiency with AI technology.
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
