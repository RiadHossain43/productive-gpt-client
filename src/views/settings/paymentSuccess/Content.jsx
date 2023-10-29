import { Col, Container, Row, Spinner } from "reactstrap";
import logo from "../../../assets/img/brand/logo-ai.png";
import React from "react";
const Content = () => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md="4" className="mx-auto mt-5">
            <div className="">
              <img className="login-productiveai-logo mb-4" src={logo} />
              <h4 className="">Payment successful!</h4>
              <p className="mb-5">
                <Spinner size="sm" /> Thanks for your subscription to AI_PRODUCT_NAME.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Content;
