import React from "react";
import { Col, Container, Row } from "reactstrap";
import logo from "../../../assets/img/brand/logo-ai.png";
import { BiLockOpenAlt } from "react-icons/bi";
const FreeAlert = () => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md="4" className="mx-auto mt-5">
            <div className="">
              <img className="login-productiveai-logo mb-4" src={logo} />
              <h4 className="">
                <BiLockOpenAlt /> Beta Exchange
              </h4>
              <p className="mb-5">
                We are currently offering our software at no cost to gather
                valuable customer feedback.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default FreeAlert;
