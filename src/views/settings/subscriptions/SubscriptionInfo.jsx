import { Button, Col, Container, Row, Spinner } from "reactstrap";
import React from "react";
import logo from "../../../assets/img/brand/logo-ai.png";
import { USER_ACTIONS, useSubscriptions } from "./store";
import { useApplication } from "../../../stores/applicationStore";

const UI_MESSAGE = {
  Free: `You are running on the free subscription.`,
  Subscribed: `You are currently on the premium subscription.`,
  Unsubscribed: `Your subscription has been canceled. To continue using AI_PRODUCT_NAME
  please upgrade your account to premium.`,
};
const SubscriptionInfo = () => {
  const { processing, manageSubscription } = useSubscriptions();
  const { currentUserData } = useApplication();
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md="4" className="mx-auto mt-5">
            <div className="">
              <img className="login-alice-logo mb-4" src={logo} />
              <h4 className="">Manage subscription</h4>
              <p className="mb-5">
                {UI_MESSAGE[currentUserData?.subscriptionInformation?.status]}
              </p>
              {currentUserData?.subscriptionInformation?.status !== "Free" && (
                <Button
                  onClick={() => manageSubscription()}
                  block
                  color="primary"
                >
                  {processing[USER_ACTIONS.GET_FULL_DETAILS].status ? (
                    <React.Fragment>
                      Redirecting <Spinner size="sm" />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>Manage subscription</React.Fragment>
                  )}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default SubscriptionInfo;
