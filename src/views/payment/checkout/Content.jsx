import cardValidator from "card-validator";
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Spinner
} from "reactstrap";
import React from "react";
import { BiLock } from "react-icons/bi";
import { BsCalendar3, BsCreditCard2Front } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { VscDebugStart } from "react-icons/vsc";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/brand/logo-ai.png";
import useForm from "../../../hooks/useForm";
import PageLayout from "../components/PageLayout";
import { cardUIHelpers, getCardImage } from "../utils/card";
import {
  defaultPaymentDetailsDataSet,
  defaultPaymentDetailsDataSetValidation,
} from "../utils/data";
import { useCheckout } from "./store";
const Content = ({ onSubmit }) => {
  const { subscribe } = useCheckout();
  let { dataModel, handleChange, isBusy, handleSubmit, isFormValid } = useForm(
    defaultPaymentDetailsDataSet,
    defaultPaymentDetailsDataSetValidation
  );
  return (
    <PageLayout>
      <div className="y-centered payment-form">
        <img className="login-alice-logo mb-4" src={logo} />
        <h4 className="">Payment details!</h4>
        <p className="mb-5">
          Subscribe to AI_PRODUCT_NAME - Enterprice{" "}
          <span className="text-dark">£20.00</span>/<sub>month</sub>
        </p>
        <InputGroup>
          <InputGroupText>
            <FiUser />
          </InputGroupText>
          <Input
            placeholder="Name on card"
            autoComplete="off"
            value={dataModel.nameOnCard}
            onChange={(e) =>
              handleChange({
                field: "nameOnCard",
                value: e.currentTarget.value,
              })
            }
          />
        </InputGroup>
        <InputGroup>
          <InputGroupText>
            <BsCreditCard2Front />
          </InputGroupText>
          <Input
            placeholder="0000 0000 0000 0000"
            autoComplete="off"
            value={cardUIHelpers.convertToCardNumberFormat(
              dataModel.cardNumber
            )}
            onChange={(e) =>
              handleChange({
                field: "cardNumber",
                value: e.currentTarget.value,
              })
            }
          />
          <InputGroupText>
            <img
              className="card-type-image"
              src={getCardImage(
                cardValidator.number(parseInt(dataModel.cardNumber))?.card?.type
              )}
            />
          </InputGroupText>
        </InputGroup>
        <Row>
          <Col sm="6">
            <InputGroup className="input-group-expire-date">
              <InputGroupText>
                <BsCalendar3 />
              </InputGroupText>
              <Input
                autoComplete="off"
                value={cardUIHelpers.convertToCardExpDateFormat(
                  dataModel.cardExpDate
                )}
                placeholder="MM/YY"
                onChange={(e) =>
                  handleChange({
                    field: "cardExpDate",
                    value: e.currentTarget.value,
                  })
                }
              />
            </InputGroup>
          </Col>
          <Col sm="6">
            <InputGroup>
              <InputGroupText>
                <BiLock />
              </InputGroupText>
              <Input
                placeholder="CVC"
                autoComplete="off"
                value={cardUIHelpers.convertToCardCvcFormat(dataModel.cardCvc)}
                onChange={(e) =>
                  handleChange({
                    field: "cardCvc",
                    value: e.currentTarget.value,
                  })
                }
              />
            </InputGroup>
          </Col>
        </Row>
        <small>You can always cancel your subscription plan later.</small>
        <Button
          className="mt-4 mb-2"
          color="primary"
          type="button"
          onClick={(e) => handleSubmit(e, subscribe)}
          disabled={!isFormValid() || isBusy}
          block
        >
          {isBusy ? (
            <React.Fragment>
              Subscribing <Spinner size="sm" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              Subscribe <VscDebugStart />
            </React.Fragment>
          )}
        </Button>
        <small>Back to </small>
        <Link className="btn-link" to={"/accounts/settings"}>
          <small>Account settings</small>
        </Link>
      </div>
    </PageLayout>
  );
};

export default Content;
