import { Button, Col, Container, Row } from "reactstrap";
import React from "react";
import logo from "../../../assets/img/brand/logo-ai.png";
import { useApplication } from "../../../stores/applicationStore";

const UI_MESSAGE = {
  runningTrial: `You are currently on your trial period. To continue using Alice after your trial
  period please upgrade to premium.`,
  trialEnd: `Your trial period has ended. To continue using Alice please upgrade your account 
  to premium and follow instructions.`,
};
const SubscriptionInfo = () => {
  const { currentUserData, redirectToCheckout, getTrialDays } =
    useApplication();
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md="4" className="mx-auto mt-5">
            <div className="">
              <img className="login-alice-logo mb-4" src={logo} />
              <h4 className="">Upgrade your account</h4>
              <p className="mb-5">
                {currentUserData?.subscriptionInformation?.status ===
                  "Trial" && getTrialDays()
                  ? UI_MESSAGE.runningTrial
                  : UI_MESSAGE.trialEnd}
              </p>
              <Button
                onClick={() =>
                  redirectToCheckout({ userEmail: currentUserData?.email })
                }
                block
                color="primary"
              >
                <React.Fragment>Upgrade</React.Fragment>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default SubscriptionInfo;
